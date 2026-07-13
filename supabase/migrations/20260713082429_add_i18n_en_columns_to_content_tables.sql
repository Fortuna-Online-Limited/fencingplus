/*
# Add i18n English columns to all content tables

## Summary
Adds `_en` suffix columns to all four content tables so that administrators
can provide English translations for every text field displayed on the
public-facing website. The frontend selects both language variants and
renders the appropriate one based on the visitor's chosen locale.

## Modified Tables

### courses_Fencing_Plus
- course_name_en   (text, default ''): English course name
- age_group_en     (text, default ''): English age range label
- description_en   (text, default ''): English course description
- schedule_info_en (text, default ''): English schedule / class notes
- fee_en           (text, default ''): English fee description

### coaches_Fencing_Plus
- title_en      (text,   default ''  ): English title / specialty badge label
- bio_en        (text,   default ''  ): English coach biography
- experience_en (text[], default '{}'): English achievement array

### news_Fencing_Plus
- title_en   (text, default ''): English news headline
- summary_en (text, default ''): English news summary
- content_en (text, default ''): English full content (for future use)

### honors_Fencing_Plus
- award_title_en (text, default ''): English award title
- category_en    (text, default ''): English category label

## Notes
1. All columns default to empty string so existing rows remain valid.
2. Frontend falls back to the Chinese column when the _en column is empty.
3. Migration is fully idempotent via ADD COLUMN IF NOT EXISTS.
*/

ALTER TABLE "courses_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS course_name_en   text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS age_group_en     text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en   text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS schedule_info_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS fee_en           text NOT NULL DEFAULT '';

ALTER TABLE "coaches_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS title_en      text    NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS bio_en        text    NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS experience_en text[]  NOT NULL DEFAULT '{}';

ALTER TABLE "news_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS title_en   text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS summary_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS content_en text NOT NULL DEFAULT '';

ALTER TABLE "honors_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS award_title_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS category_en    text NOT NULL DEFAULT '';
