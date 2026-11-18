# Project memory

## Product intent & audience

- Fencing club/school website ("Fencing_plus") with bilingual Traditional Chinese + English content
- Showcases facilities, equipment, fencing pistes (劍道), and contact information
- Audience: prospective students/members viewing venue quality and training environment

## Brand personality & voice

- Bilingual: Traditional Chinese (繁體中文) primary + English for all labels, titles, and category names
- Professional, production-grade presentation; avoids cookie-cutter templates

## Visual design & UX direction

- **Stack:** Vite + React, Tailwind CSS, Lucide React icons (per `.bolt/prompt` — no extra UI packages)
- **Gallery pattern:** Responsive grid with category filter tabs; lightbox/modal for image preview; top carousel/hero slider
- **Image consistency:** Uniform aspect ratios enforced in grid and lightbox to prevent distortion/layout shifts
- **Categories:** `venue` (場地實景 / Site Photos) and `pistes` (專業劍道 / Fencing Pistes) with category-filter integration
- **i18n:** Locale files (zh-TW + en) drive all titles/labels; every new image needs matching bilingual title + category assignment

## Decisions, constraints & rationale

- **Image hosting:** Supabase Storage public bucket; base path: `liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/05_Facilities_Contact/Site_and_Equipment-Photos_of_the_Actual_Site/`
- **Naming convention:** `site_XX_vX.jpeg` for venue photos, `kendo_XX_vX.jpeg` for piste photos; version suffix increments with replacements (v2→v3, v3→v4)
- **Gallery state:** After latest update — venue: 9 photos (site_01–site_09); pistes: 8 photos (kendo_01–kendo_08); total 18 images (up from 11)
- **Versioning rule:** Replaced images keep same slot but bump version in filename; new images appended at end of sequence
- **Re-adding rule:** Temporarily removed images (e.g. site_05) are restored at original position when re-requested

## Open questions & assumptions

- Assumes all Supabase image URLs are live and publicly accessible; no upload/fallback logic implemented
- Category labels and titles for new images inferred from context (training equipment area, student rest area, etc.) — may need correction if actual photo content differs
- No explicit image dimension standard documented; uniform aspect ratio is enforced via CSS, not by image source dimensions