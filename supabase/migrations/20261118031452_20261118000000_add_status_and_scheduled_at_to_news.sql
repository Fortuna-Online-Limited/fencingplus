/*
# Add status and scheduled_at columns to news_Fencing_Plus

## Summary
Adds support for three publish states: "published" (immediate), "scheduled" (auto-publish at a future time), and "draft" (hidden from frontend).

## Changes to "news_Fencing_Plus"
1. Add `status` column (text, NOT NULL, DEFAULT 'published') — values: 'published', 'scheduled', 'draft'.
2. Add `scheduled_at` column (timestamptz, nullable) — the scheduled publish time for 'scheduled' status.
3. Backfill `status` from existing `is_published`: rows where `is_published = false` → 'draft'; `is_published = true` → 'published'.
4. Add a CHECK constraint to validate `status` values.

## Notes
- `is_published` column is kept for backward compatibility; the frontend will now use `status` for filtering.
- `scheduled_at` is only meaningful when `status = 'scheduled'`.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_Fencing_Plus' AND column_name = 'status'
  ) THEN
    ALTER TABLE "news_Fencing_Plus" ADD COLUMN status text NOT NULL DEFAULT 'published';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_Fencing_Plus' AND column_name = 'scheduled_at'
  ) THEN
    ALTER TABLE "news_Fencing_Plus" ADD COLUMN scheduled_at timestamptz;
  END IF;
END $$;

-- Backfill status from is_published for existing rows
UPDATE "news_Fencing_Plus" SET status = 'draft' WHERE is_published = false;
UPDATE "news_Fencing_Plus" SET status = 'published' WHERE is_published = true AND scheduled_at IS NULL;

-- Add CHECK constraint (drop first for idempotency)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'news_fencing_plus_status_check'
  ) THEN
    ALTER TABLE "news_Fencing_Plus"
    ADD CONSTRAINT news_fencing_plus_status_check
    CHECK (status IN ('published', 'scheduled', 'draft'));
  END IF;
END $$;

-- Add an index on status for faster frontend filtering
CREATE INDEX IF NOT EXISTS idx_news_fencing_plus_status ON "news_Fencing_Plus"(status);
