
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

interface AddBookmarkFormProps {
    onAdd: (bookmark: any) => void;
}

export default function AddBookmarkForm({ onAdd }: AddBookmarkFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setLoading(false);
            return;
        }

        // Use .select() to get the inserted row back immediately
        const { data, error } = await supabase.from("bookmarks").insert([
            { title, url, user_id: user.id },
        ]).select();

        if (!error && data) {
            // Pass the new bookmark up to the parent immediately
            onAdd(data[0]);
            setUrl("");
            setTitle("");
            setIsOpen(false);
        }
        setLoading(false);
    };

    return (
        <div className="relative mb-12 flex justify-center w-full">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 z-50"
            >
                {isOpen ? <X size={24} /> : <Plus size={24} />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 glass-morphism rounded-2xl p-6 w-full max-w-md backdrop-blur-xl border border-white/10 shadow-2xl z-40"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                New Bookmark
                            </h2>

                            <input
                                type="text"
                                placeholder="Title (e.g., My Portfolio)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-black/20 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-purple-500/50 transition-all border border-white/5"
                                required
                            />

                            <input
                                type="url"
                                placeholder="URL (https://...)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="bg-black/20 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-purple-500/50 transition-all border border-white/5"
                                required
                            />

                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? "Adding..." : "Add Bookmark"}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
