import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FileText, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
    const { user, signInWithEmail, signUpWithEmail, signInWithGoogle, loading: authLoading } = useAuth()
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    // Redirect if already logged in
    if (user) {
        return <Navigate to="/" replace />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')
        setLoading(true)

        try {
            if (isSignUp) {
                const { error } = await signUpWithEmail(email, password)
                if (error) {
                    setError(error.message)
                } else {
                    setMessage('Check your email for the confirmation link!')
                    setEmail('')
                    setPassword('')
                }
            } else {
                const { error } = await signInWithEmail(email, password)
                if (error) {
                    setError(error.message)
                }
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError('')
        const { error } = await signInWithGoogle()
        if (error) {
            setError(error.message)
        }
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-text-secondary)' }} />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                        style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                    >
                        <FileText className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text)' }}>
                        Essay Assistant
                    </h1>
                    <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                        Your AI-powered writing companion
                    </p>
                </div>

                {/* Login Card */}
                <div
                    className="rounded-xl p-8 shadow-sm"
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)'
                    }}
                >
                    <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
                        {isSignUp ? 'Create an account' : 'Welcome back'}
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div
                            className="flex items-center gap-2 p-3 rounded-lg mb-4"
                            style={{ backgroundColor: 'rgba(224, 62, 62, 0.1)', color: 'var(--color-error)' }}
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {message && (
                        <div
                            className="flex items-center gap-2 p-3 rounded-lg mb-4"
                            style={{ backgroundColor: 'rgba(15, 123, 108, 0.1)', color: 'var(--color-success)' }}
                        >
                            <span className="text-sm">{message}</span>
                        </div>
                    )}

                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg transition-colors"
                                    style={{
                                        backgroundColor: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-text)',
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg transition-colors"
                                    style={{
                                        backgroundColor: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-text)',
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                opacity: loading ? 0.7 : 1,
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {isSignUp ? 'Creating account...' : 'Signing in...'}
                                </>
                            ) : (
                                isSignUp ? 'Create account' : 'Sign in'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>or</span>
                        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text)',
                        }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Toggle Sign Up / Sign In */}
                    <p className="text-center mt-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                                setError('')
                                setMessage('')
                            }}
                            className="font-medium hover:underline"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
