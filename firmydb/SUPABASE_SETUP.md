# Supabase Database Setup Guide

## Přehled
FirmyDB potřebuje PostgreSQL databázi pro ukládání informací o firmách.
Supabase poskytuje managed PostgreSQL + REST API + realtime subscriptions.

---

## Krok 1: Vytvoření Supabase Projektu

### Online (Doporučeno):
1. Jdi na: **https://database.new**
2. Sign in with GitHub (account: KremilekMochomurka)
3. Create New Project:
   - **Name:** firmydb
   - **Database Password:** [vygeneruj silný - ulož do 1Password!]
   - **Region:** Europe (Frankfurt) - eu-central-1
   - **Plan:** Free ($0/month)
     - 500MB database
     - 2GB bandwidth
     - 50MB storage
     - Stačí pro 10k-50k firem
4. Wait 2-3 minutes (database provisioning)

---

## Krok 2: Deploy Schema

### A) Přes Supabase SQL Editor (Jednodušší):

1. V Supabase dashboard → **SQL Editor** (levý panel)
2. **New Query**
3. Copy & paste celý obsah `/Users/bory/.openclaw/workspace/firmydb/schema.sql`
4. **Run** (Cmd+Enter)
5. ✅ Success: "Success. No rows returned"

### B) Přes CLI (Pokročilé):

```bash
# Install Supabase CLI (one-time)
brew install supabase/tap/supabase

# Login
supabase login

# Link projekt
supabase link --project-ref <PROJECT_REF>

# Deploy schema
supabase db push
```

---

## Krok 3: Získání API Credentials

1. V Supabase dashboard → **Settings** → **API**
2. Copy tyto hodnoty:

```bash
# Project URL
https://xxxxx.supabase.co

# anon/public key (pro client-side)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx

# service_role key (pro server-side - KEEP SECRET!)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx
```

3. Vytvoř `.env` file:

```bash
cd /Users/bory/.openclaw/workspace/firmydb
cat > .env << 'EOF'
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
EOF

# Protect secret
chmod 600 .env
```

---

## Krok 4: Import Sample Data

### Pomocí Python Script:

```bash
cd /Users/bory/.openclaw/workspace/firmydb

# Install Supabase Python client
source venv/bin/activate
pip install supabase

# Import data
python import_to_supabase.py
```

### Nebo ručně (SQL):

```sql
INSERT INTO companies (ico, name, legal_form, address, city, zip_code, founded_date, quality_score, source)
VALUES 
('27082440', 'Alza.cz a.s.', '121', 'Jankovcova, 1522, Praha, 17000', 'Praha', '17000', '2003-08-26', 55, 'ares'),
('25672720', 'MONETA Money Bank, a.s.', '121', 'Vyskočilova, 1442, Praha, 14000', 'Praha', '14000', '1998-06-09', 55, 'ares'),
-- ... atd
```

---

## Krok 5: Verify Data

```bash
# Test query
curl "https://xxxxx.supabase.co/rest/v1/companies?select=*" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Nebo v Supabase dashboard → **Table Editor** → **companies**

---

## Krok 6: Setup Row Level Security (RLS)

### Pro public read-only access:

```sql
-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads
CREATE POLICY "Public companies are viewable by everyone"
ON companies FOR SELECT
TO anon
USING (true);

-- Only authenticated users can insert (pro admin)
CREATE POLICY "Authenticated users can insert"
ON companies FOR INSERT
TO authenticated
USING (true);
```

---

## Krok 7: Connect App

### V Next.js app:

```bash
cd /Users/bory/.openclaw/workspace/firmydb/app
npm install @supabase/supabase-js
```

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

## Monitoring & Maintenance

### Check Usage:
1. Supabase dashboard → **Settings** → **Usage**
2. Monitor:
   - Database size (limit: 500MB)
   - API requests
   - Bandwidth

### Backups:
- Free tier: Daily automatic backups (7 days retention)
- Manual backup: Dashboard → Database → Backups

### Upgrade Path:
- **Pro:** $25/month
  - 8GB database
  - 250GB bandwidth
  - Daily backups (14 days)
  - Support

---

## Troubleshooting

### "Connection refused"
- Check Project URL is correct
- Verify API key is valid
- Check firewall/VPN

### "Insufficient privileges"
- Use service_role key for admin operations
- Check RLS policies

### "Table does not exist"
- Re-run schema.sql
- Check table name spelling

---

## Resources

- Docs: https://supabase.com/docs
- CLI: https://supabase.com/docs/guides/cli
- Python: https://supabase.com/docs/reference/python
- Support: https://supabase.com/support

---

## Quick Reference

```bash
# Start fresh (DANGER - deletes all data!)
supabase db reset

# Run migration
supabase migration new add_companies_table

# Check status
supabase status

# View logs
supabase logs
```

---

## Security Checklist

- [ ] .env file in .gitignore
- [ ] service_role key NEVER committed to git
- [ ] RLS enabled on all tables
- [ ] API keys stored in environment variables
- [ ] HTTPS only (Supabase enforces this)
- [ ] Regular backups verified

---

✅ Po dokončení těchto kroků máš:
- Funkční PostgreSQL databázi
- REST API ready
- Data imported
- App connected
- Production ready!
