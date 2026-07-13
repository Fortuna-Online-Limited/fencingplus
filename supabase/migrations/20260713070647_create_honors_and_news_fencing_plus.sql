/*
# Create honors_Fencing_Plus and news_Fencing_Plus tables

## Summary
Creates two content-management tables for the FENCING PLUS website:
one for the Honor Wall (student achievements) and one for Latest News / announcements.

## New Tables

### 1. honors_Fencing_Plus
Stores student award records displayed on the Honor Wall section.
- id           : UUID primary key
- student_name : Name of the awarded student
- award_title  : Full award name (e.g. 全港少年劍擊錦標賽 冠軍)
- category     : Age/gender group (e.g. U8男子花劍)
- event_date   : Date the award was received
- image_url    : URL of the student's award photo (Supabase Storage)
- created_at   : Row creation timestamp

### 2. news_Fencing_Plus
Stores news articles and announcements displayed in the Latest News section.
- id           : UUID primary key
- title        : Article headline
- summary      : Short excerpt / lead paragraph shown on the card
- content      : Full article body
- publish_date : Publication date shown to visitors
- image_url    : Cover image URL
- is_pinned    : Boolean flag to pin important items to the top
- created_at   : Row creation timestamp

## Security (RLS)

Both tables follow a "public read / authenticated write" model:
- Anyone (including unauthenticated visitors using the anon key) can SELECT rows.
- Only authenticated users (admins) can INSERT, UPDATE, or DELETE rows.

This means the public website can display content without any login, while
content management requires a signed-in admin account.
*/

-- ── honors_Fencing_Plus ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "honors_Fencing_Plus" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  award_title  text NOT NULL,
  category     text NOT NULL DEFAULT '',
  event_date   date NOT NULL,
  image_url    text NOT NULL DEFAULT '',
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS honors_fp_event_date_idx
  ON "honors_Fencing_Plus" (event_date DESC);

ALTER TABLE "honors_Fencing_Plus" ENABLE ROW LEVEL SECURITY;

-- Public read
DROP POLICY IF EXISTS "public_select_honors" ON "honors_Fencing_Plus";
CREATE POLICY "public_select_honors" ON "honors_Fencing_Plus"
  FOR SELECT TO anon, authenticated
  USING (true);

-- Authenticated write
DROP POLICY IF EXISTS "auth_insert_honors" ON "honors_Fencing_Plus";
CREATE POLICY "auth_insert_honors" ON "honors_Fencing_Plus"
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_honors" ON "honors_Fencing_Plus";
CREATE POLICY "auth_update_honors" ON "honors_Fencing_Plus"
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_honors" ON "honors_Fencing_Plus";
CREATE POLICY "auth_delete_honors" ON "honors_Fencing_Plus"
  FOR DELETE TO authenticated
  USING (true);


-- ── news_Fencing_Plus ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "news_Fencing_Plus" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  summary      text NOT NULL DEFAULT '',
  content      text NOT NULL DEFAULT '',
  publish_date date NOT NULL,
  image_url    text NOT NULL DEFAULT '',
  is_pinned    boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS news_fp_sort_idx
  ON "news_Fencing_Plus" (is_pinned DESC, publish_date DESC);

ALTER TABLE "news_Fencing_Plus" ENABLE ROW LEVEL SECURITY;

-- Public read
DROP POLICY IF EXISTS "public_select_news" ON "news_Fencing_Plus";
CREATE POLICY "public_select_news" ON "news_Fencing_Plus"
  FOR SELECT TO anon, authenticated
  USING (true);

-- Authenticated write
DROP POLICY IF EXISTS "auth_insert_news" ON "news_Fencing_Plus";
CREATE POLICY "auth_insert_news" ON "news_Fencing_Plus"
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_news" ON "news_Fencing_Plus";
CREATE POLICY "auth_update_news" ON "news_Fencing_Plus"
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_news" ON "news_Fencing_Plus";
CREATE POLICY "auth_delete_news" ON "news_Fencing_Plus"
  FOR DELETE TO authenticated
  USING (true);
