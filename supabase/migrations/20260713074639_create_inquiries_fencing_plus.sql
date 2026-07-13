/*
# Create inquiries_Fencing_Plus table

## Summary
Creates the unified contact/inquiry table for the FENCING PLUS website.
All visitor inquiries submitted via any form on the site are stored here.

## New Table: inquiries_Fencing_Plus

Unified table replacing the old disconnected `contact_submissions` and
`fencing_inquiries` tables. Stores every enquiry from both the
FacilitiesContactPage and the ContactPage forms.

### Columns
- id             : UUID primary key, auto-generated
- name           : Parent / customer full name (required)
- phone          : Contact phone number (required)
- email          : Email address (optional)
- child_name     : Child's name or age supplied by the parent (optional)
- message        : Enquiry content / free-text message (optional)
- status         : Processing status label, defaults to '待處理'
                   (pending, contacted, closed, etc.)
- created_at     : Row creation timestamp, auto-set

## Security (RLS)

Policy model: "public write, admin read/update/delete"

- INSERT  → TO anon, authenticated WITH CHECK (true)
  Any website visitor (unauthenticated, using the anon key) can submit
  a new inquiry. This is intentional — the form is public.

- SELECT  → TO authenticated USING (true)
  Only signed-in admins can read inquiries in the Supabase dashboard.

- UPDATE  → TO authenticated USING (true) WITH CHECK (true)
  Only signed-in admins can change the status or correct data.

- DELETE  → TO authenticated USING (true)
  Only signed-in admins can delete records.

## Notes
1. The old `fencing_inquiries` and `contact_submissions` tables are NOT
   dropped — their data is preserved. This migration only adds the new table.
2. An index on created_at DESC is added for efficient dashboard queries.
*/

CREATE TABLE IF NOT EXISTS "inquiries_Fencing_Plus" (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  phone      text        NOT NULL,
  email      text        NOT NULL DEFAULT '',
  child_name text        NOT NULL DEFAULT '',
  message    text        NOT NULL DEFAULT '',
  status     text        NOT NULL DEFAULT '待處理',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_fp_created_idx
  ON "inquiries_Fencing_Plus" (created_at DESC);

ALTER TABLE "inquiries_Fencing_Plus" ENABLE ROW LEVEL SECURITY;

-- Public INSERT (anon visitors can submit inquiries)
DROP POLICY IF EXISTS "anon_insert_inquiries" ON "inquiries_Fencing_Plus";
CREATE POLICY "anon_insert_inquiries" ON "inquiries_Fencing_Plus"
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Admin-only SELECT
DROP POLICY IF EXISTS "auth_select_inquiries" ON "inquiries_Fencing_Plus";
CREATE POLICY "auth_select_inquiries" ON "inquiries_Fencing_Plus"
  FOR SELECT TO authenticated
  USING (true);

-- Admin-only UPDATE
DROP POLICY IF EXISTS "auth_update_inquiries" ON "inquiries_Fencing_Plus";
CREATE POLICY "auth_update_inquiries" ON "inquiries_Fencing_Plus"
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Admin-only DELETE
DROP POLICY IF EXISTS "auth_delete_inquiries" ON "inquiries_Fencing_Plus";
CREATE POLICY "auth_delete_inquiries" ON "inquiries_Fencing_Plus"
  FOR DELETE TO authenticated
  USING (true);
