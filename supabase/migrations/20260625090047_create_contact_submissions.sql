/*
# Create contact_submissions table

## Purpose
Stores contact form submissions from the Fencing Plus website.

## New Tables
- `contact_submissions`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — full name of the person submitting
  - `email` (text, not null) — contact email address
  - `phone` (text, nullable) — optional phone number
  - `service` (text, nullable) — type of service they're interested in
  - `message` (text, not null) — the message body
  - `created_at` (timestamptz, default now())

## Security
- RLS enabled
- Anon + authenticated users can INSERT (public contact form)
- No SELECT/UPDATE/DELETE policy for anon (admin-only via service role)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);
