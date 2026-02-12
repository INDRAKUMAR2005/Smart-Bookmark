
import BookmarkManager from "@/components/BookmarkManager";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl">
            Smart Bookmark
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mt-4 px-4">
            Your personal, realtime bookmark manager.
          </p>
        </header>

        {user ? (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={user.user_metadata.avatar_url}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-purple-400"
              />
              <span className="text-white font-medium">
                Welcome back, {user.user_metadata.full_name?.split(' ')[0]}!
              </span>
              <form action="/auth/signout" method="post">
                <button
                  className="text-xs text-gray-400 hover:text-white underline ml-2"
                  type="submit"
                >
                  Sign Out
                </button>
              </form>
            </div>

            <BookmarkManager />
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-6 animate-in zoom-in duration-500 delay-200">
            <div className="glass-morphism p-8 rounded-3xl max-w-md text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
              <p className="text-gray-300 mb-8">
                Sign in with Google to sync your bookmarks across all your devices instantly.
              </p>
              <div className="flex justify-center">
                <AuthButton />
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 text-gray-500 text-sm">
          Built with Next.js, Supabase & Tailwind
        </footer>
      </div>
    </main>
  );
}
