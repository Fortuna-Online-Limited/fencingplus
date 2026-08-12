/*
# Enhance honors_Fencing_Plus table for full CRUD & admin management

## Purpose
Upgrades the honors table to support the new Admin Dashboard "Honor Wall Management"
module and dynamic frontend display. Adds publish toggle, bilingual descriptions,
multi-image support, and update tracking.

## New Columns Added
1. `is_published` (boolean, NOT NULL, default true) — Published/Draft toggle, mirrors news_Fencing_Plus
2. `description` (text, NOT NULL, default '') — Chinese description/highlights
3. `description_en` (text, NOT NULL, default '') — English description/highlights
4. `image_urls` (text[], NOT NULL, default '{}') — Array of image URLs for gallery/award ceremony photos
5. `updated_at` (timestamptz, default now()) — Timestamp of last modification

## Indexes
- `honors_fp_published_date_idx` on (is_published, event_date DESC) for efficient public queries

## Security
- No RLS policy changes needed — existing policies already cover all columns:
  - public_select_honors: anon+authenticated SELECT (USING true)
  - auth_insert_honors: authenticated INSERT (WITH CHECK true)
  - auth_update_honors: authenticated UPDATE (USING true WITH CHECK true)
  - auth_delete_honors: authenticated DELETE (USING true)

## Backfill
- All existing rows get is_published=true, image_urls='{}', description='', description_en=''
*/

ALTER TABLE "honors_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS "is_published" boolean NOT NULL DEFAULT true;

ALTER TABLE "honors_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS "description" text NOT NULL DEFAULT '';

ALTER TABLE "honors_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS "description_en" text NOT NULL DEFAULT '';

ALTER TABLE "honors_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS "image_urls" text[] NOT NULL DEFAULT '{}'::text[];

ALTER TABLE "honors_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS "updated_at" timestamptz NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS honors_fp_published_date_idx
  ON "honors_Fencing_Plus" (is_published, event_date DESC);
