AI Essay Assistant - Implementation Plan
Build a React web application using Vite, Tailwind CSS, and Supabase for an AI Essay Assistant that helps students with different essay types.

User Review Required
IMPORTANT

Supabase Project Setup Required: You will need to:

Create a Supabase project at supabase.com
Run the provided SQL schema in your Supabase SQL Editor
Enable Google OAuth in Authentication > Providers
Update the .env file with your project credentials
Proposed Changes
Core Setup
[NEW] 
Project Root
Initialize Vite + React with TypeScript template
Configure Tailwind CSS v4
Install dependencies: @supabase/supabase-js, react-router-dom, lucide-react, react-markdown, remark-gfm
[NEW] 
.env.example
Template for Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
Supabase Configuration
[NEW] 
supabaseClient.js
Initialize Supabase client with environment variables
Export client for use across application
[NEW] 
schema.sql
chats table: id, user_id, title, essay_type, created_at
messages table: id, chat_id, content, role, created_at
Row Level Security policies for user data isolation
Authentication
[NEW] 
AuthContext.jsx
React context for authentication state
Session management with Supabase auth listener
Login/logout helper functions
[NEW] 
LoginPage.jsx
Clean, Notion-style login form
Email/Password authentication
Google OAuth button
Error handling and loading states
Layout & Routing
[NEW] 
App.jsx
React Router configuration
Protected route wrapper
Route: /login → LoginPage
Route: / → Dashboard (protected)
[NEW] 
DashboardLayout.jsx
Responsive layout with collapsible sidebar
Mobile hamburger menu
Main content area for chat
[NEW] 
Sidebar.jsx
"New Chat" button
Past chats list fetched from Supabase
Collapse/expand functionality
Lucide icons for visual polish
Chat Interface
[NEW] 
ChatPage.jsx
Essay type selection (Argumentative, Persuasive, Narrative)
Chat message display with markdown rendering
Input disabled until essay type selected
[NEW] 
EssayTypeSelector.jsx
Three prominent selection buttons
Visual feedback on hover/selection
Icons for each essay type
[NEW] 
ChatInput.jsx
Text input with send button
Disabled state styling
Keyboard shortcut (Enter to send)
[NEW] 
MessageBubble.jsx
User vs AI message styling
Markdown rendering using react-markdown
Copy button for AI responses
Styling
[NEW] 
index.css
Tailwind directives
Custom CSS variables for theming
Notion-inspired typography and spacing
Verification Plan
Manual Browser Testing
Development Server

bash
cd c:\Users\gbcop\OneDrive\Documents\projects\builder
npm run dev
Authentication Flow

Open http://localhost:5173/login
Verify login form renders with Email/Password fields and Google button
Test form validation (empty fields, invalid email format)
After login, verify redirect to dashboard
Dashboard Layout

Verify sidebar renders with "New Chat" button
Test sidebar collapse/expand on desktop
Resize to mobile width and verify hamburger menu appears
Verify sidebar is hidden by default on mobile
Essay Type Selection

Click "New Chat" and verify 3 essay type buttons appear
Verify chat input is disabled initially
Select an essay type and verify input becomes enabled
Verify selected type is visually highlighted
NOTE

Full end-to-end testing requires Supabase project configuration. The UI components can be verified visually before connecting to a live database.