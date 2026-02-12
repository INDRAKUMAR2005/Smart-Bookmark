
import Link from 'next/link'

export default function AuthCodeError() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center px-4 text-white">
            <div className="glass-morphism p-8 rounded-3xl max-w-md text-center border border-white/10">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400">
                    Auth Error
                </h1>
                <p className="text-gray-300 mb-8 leading-relaxed">
                    We couldn't verify your credentials. This usually happens if the login link expired or the configuration is incorrect.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 border border-white/20"
                >
                    Try Again
                </Link>
            </div>
        </div>
    )
}
