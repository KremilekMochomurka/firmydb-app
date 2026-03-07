-- FirmyDB - COMPLETE SETUP (copy-paste do SQL Editor)
-- Tenhle SQL všechno vyřeší najednou

-- 1. Disable RLS (dočasně)
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;

-- 2. Add missing columns
ALTER TABLE companies ADD COLUMN IF NOT EXISTS website VARCHAR(255);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS quality_score INTEGER DEFAULT 50;

-- 3. Insert sample data
INSERT INTO companies (ico, name, city, email, phone, website, quality_score) VALUES
('27082440', 'Alza.cz a.s.', 'Praha', NULL, NULL, NULL, 55),
('25672720', 'MONETA Money Bank, a.s.', 'Praha', NULL, NULL, NULL, 55),
('60193336', 'O2 Czech Republic a.s.', 'Praha', NULL, NULL, NULL, 55),
('45274649', 'ČEZ, a. s.', 'Praha', NULL, NULL, NULL, 55),
('00177041', 'Škoda Auto a.s.', 'Mladá Boleslav', 'sbd-hk@sbd-hk.cz', '+420 326 811 111', 'https://www.skoda-auto.cz', 95),
('27074358', 'Asseco Central Europe, a.s.', 'Praha', NULL, NULL, NULL, 55),
('00001279', 'Státní tiskárna cenin, s. p.', 'Praha', NULL, NULL, NULL, 55),
('70994226', 'České dráhy, a.s.', 'Praha', NULL, '+420 840 112 113', 'https://www.cd.cz', 70),
('02795281', 'Operátor ICT, a.s.', 'Praha', NULL, NULL, NULL, 55)
ON CONFLICT (ico) DO NOTHING;

-- 4. Enable RLS + create public read policy
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
CREATE POLICY "Enable read access for all users" 
ON companies FOR SELECT 
USING (true);

-- 5. Verify
SELECT COUNT(*) as total, 
       COUNT(email) as with_email,
       COUNT(phone) as with_phone,
       ROUND(AVG(quality_score)) as avg_quality
FROM companies;

-- ✅ HOTOVO! App bude fungovat na https://kremilekmochomurka.github.io/firmydb-app/
