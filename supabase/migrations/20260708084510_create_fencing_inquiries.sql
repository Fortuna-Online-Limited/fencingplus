/*
# Create fencing_inquiries table

## Purpose
Stores contact form submissions from the Fencing Plus children's fencing
training website. Captures parent enquiries about classes.

## New Tables
- `fencing_inquiries`
  - `id` (uuid, primary key, auto-generated)
  - `parent_name` (text, not null) — full name of the parent/guardian
  - `phone` (text, not null) — contact phone number
  - `student_age` (text, not null) — age or age range of the student
  - `course_interest` (text, nullable) — which course they are enquiring about
  - `message` (text, nullable) — optional message or questions
  - `created_at` (timestamptz, default now())

## Security
- RLS enabled on `fencing_inquiries`
- Anon + authenticated users can INSERT (public enquiry form, no login required)
- No SELECT policy for anon (admin-only read via service role key)
*/

CREATE TABLE IF NOT EXISTS fencing_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  phone text NOT NULL,
  student_age text NOT NULL,
  course_interest text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE fencing_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_fencing_inquiries" ON fencing_inquiries;
CREATE POLICY "anon_insert_fencing_inquiries" ON fencing_inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);
