
"use client";

import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Chrome } from "lucide-react";

export default function AuthButton() {
    const handleLogin = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-full shadow-lg font-medium hover:shadow-xl transition-all duration-300"
        >
            <Chrome className="w-5 h-5 text-blue-500" />
            <span>Continue with Google</span>
        </motion.button>
    );
}
