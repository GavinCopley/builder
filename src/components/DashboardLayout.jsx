import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Menu, PanelLeftOpen } from 'lucide-react'

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (mobile) {
                setSidebarOpen(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Mobile overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar — fully removed from flow when collapsed on desktop */}
            {(sidebarOpen || isMobile) && (
                <div
                    className={`
                        ${isMobile ? 'fixed inset-y-0 left-0 z-30' : 'relative flex-shrink-0'}
                        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
                        transition-transform duration-200 ease-in-out
                    `}
                >
                    <Sidebar
                        isCollapsed={!sidebarOpen}
                        onToggle={toggleSidebar}
                        onCloseMobile={() => isMobile && setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Collapsed sidebar strip — fixed to far left on desktop */}
            {!isMobile && !sidebarOpen && (
                <div
                    className="flex flex-col items-center py-3 px-1 flex-shrink-0"
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRight: '1px solid var(--color-border)',
                        width: '48px',
                    }}
                >
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--color-bg-hover)]"
                        style={{ color: 'var(--color-text-secondary)' }}
                        title="Open sidebar"
                    >
                        <PanelLeftOpen className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile header */}
                {isMobile && (
                    <div
                        className="flex items-center h-14 px-4 border-b"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <span
                            className="ml-3 font-semibold"
                            style={{ color: 'var(--color-text)' }}
                        >
                            Essay Assistant
                        </span>
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
