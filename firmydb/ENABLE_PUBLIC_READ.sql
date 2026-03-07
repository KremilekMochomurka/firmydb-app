-- Enable public read access to companies table
-- Copy-paste this into SQL Editor and Run

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read" ON companies;

CREATE POLICY "public_read" 
ON companies 
FOR SELECT 
USING (true);

-- Verify policy
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'companies';

-- Test query (should return 3 companies)
SELECT COUNT(*) as total FROM companies;
SELECT ico, name, city FROM companies ORDER BY name;
