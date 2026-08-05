/*
# Update coaches: add English name column, update bios and achievements

1. Schema changes
   - Add `coach_name_en` (text, default '') to `coaches_Fencing_Plus`.
2. Data updates
   - Set English names: 李啟源→Lee Kai Yuen, 鄭樂晴→Lewis Cheng, 劉宇軒→Hugo Lau, 王愉龍→Oscar Wong.
   - Update bio_en for Head Coach Lee Kai Yuen, Lewis Cheng, Hugo Lau, Oscar Wong.
   - Reorder experience/experience_en arrays (newest year first) for Lewis Cheng and Hugo Lau.
3. Notes
   - No RLS or policy changes.
   - All updates are data-only; no destructive operations.
*/

ALTER TABLE "coaches_Fencing_Plus"
  ADD COLUMN IF NOT EXISTS coach_name_en text NOT NULL DEFAULT '';

-- English names
UPDATE "coaches_Fencing_Plus" SET coach_name_en = 'Lee Kai Yuen' WHERE coach_name = '李啟源';
UPDATE "coaches_Fencing_Plus" SET coach_name_en = 'Lewis Cheng' WHERE coach_name = '鄭樂晴';
UPDATE "coaches_Fencing_Plus" SET coach_name_en = 'Hugo Lau' WHERE coach_name = '劉宇軒';
UPDATE "coaches_Fencing_Plus" SET coach_name_en = 'Oscar Wong' WHERE coach_name = '王愉龍';

-- Head Coach bio_en
UPDATE "coaches_Fencing_Plus"
SET bio_en = 'An experienced competitor and coach with a strong international record across Hong Kong, Taiwan, and mainland China, he nurtures the next generation of fencers through a coaching style that is both disciplined and warmly approachable.'
WHERE coach_name = '李啟源';

-- Lewis Cheng bio_en + experience (newest first)
UPDATE "coaches_Fencing_Plus"
SET bio_en = 'With patience and encouragement at the heart of his teaching, he guides students to build genuine confidence step by step.',
    experience = ARRAY[
      '2024新界區學界劍擊比賽團體賽季軍 🥉',
      '2023新界區學界劍擊比賽團體賽季軍 🥉',
      '2023年香港劍擊學院季度劍擊比賽季軍 🥉',
      '2022新界區學界劍擊比賽團體賽亞軍 🥈',
      '2022年全港中學生劍擊錦標賽季軍 🥉',
      '2021年一劍擊劍擊錦標賽季軍 🥉'
    ],
    experience_en = ARRAY[
      '2024 New Territories School Fencing Team Bronze 🥉',
      '2023 New Territories School Fencing Team Bronze 🥉',
      '2023 HKFA Quarterly Fencing Competition Bronze 🥉',
      '2022 New Territories School Fencing Team Silver 🥈',
      '2022 HK Secondary School Fencing Championships Bronze 🥉',
      '2021 Yat Keem Fencing Championships Bronze 🥉'
    ]
WHERE coach_name = '鄭樂晴';

-- Hugo Lau bio_en + experience (newest first)
UPDATE "coaches_Fencing_Plus"
SET bio_en = 'Focused on technical precision, he helps students break through training plateaus and progress to higher levels of competitive performance.',
    experience = ARRAY[
      '2024新界區學界劍擊比賽團體賽季軍 🥉',
      '2023新界區學界劍擊比賽團體賽季軍 🥉',
      '2022新界區學界劍擊比賽團體賽亞軍 🥈',
      '2022新界區學界劍擊比賽個人賽季軍 🥉'
    ],
    experience_en = ARRAY[
      '2024 New Territories School Fencing Team Bronze 🥉',
      '2023 New Territories School Fencing Team Bronze 🥉',
      '2022 New Territories School Fencing Team Silver 🥈',
      '2022 New Territories School Fencing Individual Bronze 🥉'
    ]
WHERE coach_name = '劉宇軒';

-- Oscar Wong bio_en
UPDATE "coaches_Fencing_Plus"
SET bio_en = 'Specialises in early-childhood and youth fencing development, using a game-based approach that inspires genuine enthusiasm and interest in the sport.'
WHERE coach_name = '王愉龍';
