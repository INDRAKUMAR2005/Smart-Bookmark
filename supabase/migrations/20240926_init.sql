
-- Create the auth.users reference (Optional, usually handled by Supabase Auth but needed for foreign keys here)
-- Note: 'auth.users' is a system table, so we don't drop/recreate it here. We assume it exists.

-- Safely drop existing table if needed (be careful in production!)
DROP TABLE IF EXISTS bookmarks;

create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Secure the data with Row Level Security (RLS)
alter table bookmarks enable row level security;

-- Policies for authenticated users
create policy "Users can add their own bookmarks"
on bookmarks for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their own bookmarks"
on bookmarks for select to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
on bookmarks for delete to authenticated
using (auth.uid() = user_id);

-- Enable Realtime updates
alter publication supabase_realtime add table bookmarks;
