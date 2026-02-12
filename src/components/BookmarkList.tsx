
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ExternalLink } from "lucide-react";

interface Bookmark {
    id: string;
    title: string;
    url: string;
    created_at: string;
}

interface BookmarkListProps {
    bookmarks: Bookmark[];
    onDelete: (id: string) => void;
}

export default function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <AnimatePresence>
                {bookmarks.map((bookmark) => (
                    <motion.div
                        key={bookmark.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -5 }}
                        className="glass-morphism rounded-2xl p-6 relative group"
                    >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onDelete(bookmark.id)}
                                className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-white/10"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-white/90 truncate pr-8">
                            {bookmark.title}
                        </h3>

                        <a
                            href={bookmark.url.startsWith('http') ? bookmark.url : `https://${bookmark.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-300 hover:text-blue-400 flex items-center gap-1 transition-colors w-fit"
                        >
                            <ExternalLink size={14} />
                            <span className="truncate max-w-[200px]">{bookmark.url}</span>
                        </a>

                        <div className="absolute -z-10 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
                {bookmarks.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center py-20 text-gray-400"
                    >
                        <p>No bookmarks yet. Add one above! ✨</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
