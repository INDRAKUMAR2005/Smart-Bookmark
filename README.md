
# SmartBookmark App 🔖

A creative, modern, and realtime bookmark manager built with **Next.js 16**, **Supabase**, and **Tailwind CSS v4**.

## 🚀 Features

-   **Google Authentication**: Secure sign-up and login using Google OAuth (via Supabase).
-   **Realtime Updates**: Bookmarks appear instantly across all devices/tabs without refreshing.
-   **Private & Secure**: Row Level Security (RLS) ensures users can only access their own data.
-   **Creative Design**: Glassmorphism UI, smooth animations (Framer Motion), and a premium feel.
-   **Responsive**: Fully detailed for mobile and desktop.

## 🛠️ Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Database & Auth**: Supabase (PostgreSQL, Realtime, Auth)
-   **Styling**: Tailwind CSS v4 + Custom Glassmorphism
-   **Animations**: Framer Motion
-   **Icons**: Lucide React

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/smart-bookmark-app.git
    cd smart-bookmark-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env.local` file in the root:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  Run Database Migrations:
    You can run the included SQL script in the Supabase SQL Editor:
    `supabase/migrations/20240926_init.sql`

5.  Run the development server:
    ```bash
    npm run dev
    ```

## ⚠️ Challenges & Solutions

### 1. **Supabase Realtime Subscriptions with RLS**
-   **Problem**: Initially, realtime updates weren't triggering for row-level secured tables because the subscription client didn't have the context of the authenticated user in the same way a direct query does, or the publication wasn't set to broadcast changes.
-   **Solution**: Enabled RLS on the table and added the table to the `supabase_realtime` publication. Used the Supabase JS client which creates a WebSocket connection that respects the RLS policies when the user is signed in with a valid JWT.

### 2. **Next.js Middleware for Auth**
-   **Problem**: Need to ensure the user session remains active and the auth cookie is refreshed on server-side requests to avoid "flickering" or logged-out states during navigation.
-   **Solution**: Implemented a robust `middleware.ts` that relies on `@supabase/ssr` `createServerClient`. It reads/writes cookies on every request, refreshing the session token if needed before rendering Server Components.

### 3. **Handling Google OAuth Redirects**
-   **Problem**: OAuth redirects need to handle code exchange securely and potential errors.
-   **Solution**: Created a dedicated API route (`/auth/callback`) that exchanges the code for a session and manages redirection back to the app origin, handling both local development and production environments.

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel's Environment Variables.
4.  Deploy!

---
*Created for the Smart Bookmark App Assessment*
