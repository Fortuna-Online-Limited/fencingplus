/*
# Add _zh column aliases to news_Fencing_Plus

The admin panel and frontend code reference title_zh and content_zh
(the new column naming convention), but the original table used
title / content / summary without a language suffix.

This migration adds title_zh, content_zh, summary_zh as proper columns
alongside the existing ones so the code can reference both.
Existing data is copied into the new columns.
*/

ALTER TABLE "news_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS title_zh text NOT NULL DEFAULT '';

ALTER TABLE "news_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS content_zh text NOT NULL DEFAULT '';

ALTER TABLE "news_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS summary_zh text NOT NULL DEFAULT '';

-- Back-fill existing rows
UPDATE "news_Fencing_Plus"
SET
  title_zh  = COALESCE(NULLIF(title_zh,''),  title,   ''),
  content_zh= COALESCE(NULLIF(content_zh,''),content, ''),
  summary_zh= COALESCE(NULLIF(summary_zh,''),summary, '');
