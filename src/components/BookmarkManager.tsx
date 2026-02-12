
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AddBookmarkForm from "./AddBookmarkForm";
import BookmarkList from "./BookmarkList";

interface Bookmark {
    id: string;
    title: string;
    url: string;
    created_at: string;
}

export default function BookmarkManager() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const supabase = createClient();

    useEffect(() => {
        // Initial fetch
        const fetchBookmarks = async () => {
            const { data } = await supabase
                .from("bookmarks")
                .select("*")
                .order("created_at", { ascending: false });
            if (data) setBookmarks(data);
        };

        fetchBookmarks();

        // Realtime subscription
        const subscription = supabase
            .channel("realtime-bookmarks")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "bookmarks" },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        const newBookmark = payload.new as Bookmark;
                        setBookmarks((prev) => {
                            // Deduplicate: Don't add if it already exists (e.g., from optimistic update)
                            if (prev.some((b) => b.id === newBookmark.id)) {
                                return prev;
                            }
                            return [newBookmark, ...prev];
                        });
                    } else if (payload.eventType === "DELETE") {
                        setBookmarks((prev) =>
                            prev.filter((bookmark) => bookmark.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const handleAdd = (newBookmark: Bookmark) => {
        // Immediate local update (Optimistic-ish)
        // We actually got the real data from the INSERT response, so it's accurate
        setBookmarks((prev) => {
            if (prev.some((b) => b.id === newBookmark.id)) {
                return prev;
            }
            return [newBookmark, ...prev];
        });
    };

    const handleDelete = async (id: string) => {
        // Optimistic delete
        setBookmarks((prev) => prev.filter((b) => b.id !== id));

        const { error } = await supabase.from("bookmarks").delete().match({ id });

        // If error, revert? (Optional, skipping for simplicity)
        if (error) {
            console.error("Failed to delete", error);
            // Ideally we would refetch here or revert state
        }
    };

    return (
        <>
            <AddBookmarkForm onAdd={handleAdd} />
            <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
        </>
    );
}
