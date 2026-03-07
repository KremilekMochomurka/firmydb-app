-- FirmyDB Complete Database Setup

-- 1. Disable RLS temporarily for setup
ALTER TABLE IF EXISTS companies DISABLE ROW LEVEL SECURITY;

-- 2. Add missing columns if needed
ALTER TABLE companies ADD COLUMN IF NOT EXISTS website VARCHAR(255);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS legal_form VARCHAR(100);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS founded_date DATE;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS quality_score INTEGER DEFAULT 50;

-- 3. Insert sample data (ignore duplicates)
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

-- 4. Create RLS policy for public read access
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
CREATE POLICY "Enable read access for all users" 
ON companies FOR SELECT 
USING (true);

-- 5. Verify data
SELECT COUNT(*) as total_companies FROM companies;
SELECT ico, name, city, quality_score FROM companies ORDER BY quality_score DESC LIMIT 5;
