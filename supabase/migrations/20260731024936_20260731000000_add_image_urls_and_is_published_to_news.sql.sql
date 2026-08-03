/*
# Extend news_Fencing_Plus for multi-image gallery + publish toggle

## Summary
Adds two columns to the existing `news_Fencing_Plus` table to support the
new Admin Panel ("News & Updates" management system):
1. `image_urls` — a text array holding 1–10 image URLs (Supabase Storage
   path `Fencing_plus/05_News/`). This complements the legacy single
   `image_url` column; the homepage cover image now prefers
   `image_urls[1]` and falls back to `image_url`.
2. `is_published` — a boolean toggle (Published / Draft). The public
   homepage now filters `is_published = true`.

No existing columns are dropped or renamed, so all current news rows and
the existing homepage query continue to work unchanged.

## Modified Tables

### news_Fencing_Plus
- `image_urls` (text[], NOT NULL, default '{}'::text[])
  Array of public Storage URLs for the news gallery (1–10 images).
- `is_published` (boolean, NOT NULL, default true)
  Whether the article is visible on the public homepage.

## Security (RLS)
RLS was already enabled on this table in the original migration
(public read / authenticated write). No policy changes are needed —
the existing four policies (public_select_news, auth_insert_news,
auth_update_news, auth_delete_news) already cover the new columns.

## Indexes
Adds a composite index on (is_published, publish_date DESC) so the
homepage's "published, newest first" query is fast.

## Important Notes
1. Existing rows get `is_published = true` and `image_urls = '{}'`
   automatically from the column defaults, so nothing disappears.
2. The legacy `image_url`, `summary`, `summary_en`, and `is_pinned`
   columns are intentionally kept for backward compatibility; the admin
   UI writes to `image_urls` (array) and the homepage reads
   `image_urls[1]` first, falling back to `image_url`.
*/

ALTER TABLE "news_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS "image_urls" text[] NOT NULL DEFAULT '{}'::text[];

ALTER TABLE "news_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS "is_published" boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS news_fp_published_date_idx
  ON "news_Fencing_Plus" (is_published, publish_date DESC);
