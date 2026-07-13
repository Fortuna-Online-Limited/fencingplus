/*
# Create courses_Fencing_Plus and coaches_Fencing_Plus tables

## Summary
Migrates the previously hard-coded course and coaching-team data to the database
so that the FENCING PLUS website content can be managed without code changes.

---

## New Table 1: courses_Fencing_Plus

Stores every course offering displayed on the Courses page.

### Columns
- id            : UUID primary key, auto-generated
- course_name   : Course title shown on the card (e.g. 幼兒劍擊啟蒙班)
- age_group     : Target age range (e.g. 3.5–6歲)
- description   : Multi-sentence course description / selling points
- schedule_info : Class schedule / frequency notes
- fee           : Fee description (intentionally flexible text)
- image_url     : Hero / cover image URL for the course card
- sort_order    : Integer for display ordering — lower = higher priority
- created_at    : Auto-set timestamp

---

## New Table 2: coaches_Fencing_Plus

Stores every coach profile displayed on the Team page.

### Columns
- id            : UUID primary key, auto-generated
- coach_name    : Coach's full name
- title         : Job title / specialty label shown on the badge
- experience    : text[] — array of achievement / credential strings
- bio           : Free-text biography or teaching philosophy
- avatar_url    : URL of the coach's profile photo
- sort_order    : Integer for display ordering
- created_at    : Auto-set timestamp

---

## Security (RLS)

Both tables use the same policy model: "public read, admin write"

- SELECT  → TO anon, authenticated USING (true)
  All site visitors can read course and coach data (no login required).

- INSERT  → TO authenticated WITH CHECK (true)
- UPDATE  → TO authenticated USING (true) WITH CHECK (true)
- DELETE  → TO authenticated USING (true)
  Only signed-in admins can modify records via the Supabase dashboard.

## Notes
1. sort_order defaults to 0 so new rows appear at the front if not explicitly set.
2. experience defaults to '{}' (empty array) so the column is never NULL.
*/

-- ──────────────────────────────────────────────
-- courses_Fencing_Plus
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "courses_Fencing_Plus" (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name   text    NOT NULL,
  age_group     text    NOT NULL DEFAULT '',
  description   text    NOT NULL DEFAULT '',
  schedule_info text    NOT NULL DEFAULT '',
  fee           text    NOT NULL DEFAULT '',
  image_url     text    NOT NULL DEFAULT '',
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS courses_fp_sort_idx ON "courses_Fencing_Plus" (sort_order ASC);

ALTER TABLE "courses_Fencing_Plus" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_courses" ON "courses_Fencing_Plus";
CREATE POLICY "public_select_courses" ON "courses_Fencing_Plus"
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_courses" ON "courses_Fencing_Plus";
CREATE POLICY "auth_insert_courses" ON "courses_Fencing_Plus"
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_courses" ON "courses_Fencing_Plus";
CREATE POLICY "auth_update_courses" ON "courses_Fencing_Plus"
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_courses" ON "courses_Fencing_Plus";
CREATE POLICY "auth_delete_courses" ON "courses_Fencing_Plus"
  FOR DELETE TO authenticated USING (true);

-- ──────────────────────────────────────────────
-- coaches_Fencing_Plus
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "coaches_Fencing_Plus" (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_name  text    NOT NULL,
  title       text    NOT NULL DEFAULT '',
  experience  text[]  NOT NULL DEFAULT '{}',
  bio         text    NOT NULL DEFAULT '',
  avatar_url  text    NOT NULL DEFAULT '',
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS coaches_fp_sort_idx ON "coaches_Fencing_Plus" (sort_order ASC);

ALTER TABLE "coaches_Fencing_Plus" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_coaches" ON "coaches_Fencing_Plus";
CREATE POLICY "public_select_coaches" ON "coaches_Fencing_Plus"
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_coaches" ON "coaches_Fencing_Plus";
CREATE POLICY "auth_insert_coaches" ON "coaches_Fencing_Plus"
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_coaches" ON "coaches_Fencing_Plus";
CREATE POLICY "auth_update_coaches" ON "coaches_Fencing_Plus"
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_coaches" ON "coaches_Fencing_Plus";
CREATE POLICY "auth_delete_coaches" ON "coaches_Fencing_Plus"
  FOR DELETE TO authenticated USING (true);
