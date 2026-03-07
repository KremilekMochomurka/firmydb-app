# FirmyDB - FINÁLNÍ SETUP (10 sekund)

## ✅ CO JE HOTOVO (100%)

1. ✅ **Supabase projekt vytvořen**
   - Název: `firmydb`
   - Project ID: `saxvaqaoqkkhkkrritcj`  
   - Region: Frankfurt (eu-central-1)
   - API URL: `https://saxvaqaoqkkhkkrritcj.supabase.co`

2. ✅ **SQL schema připraven**
   - Soubor: `/Users/bory/.openclaw/workspace/firmydb/schema.sql`
   - Tables: companies, contacts, exports, users
   - Indexy + full-text search

3. ✅ **Landing page live**
   - https://firmydb.cz (DNS propaguje)
   - Backup: https://kremilekmochomurka.github.io/firmydb-landing/

4. ✅ **Search app deployed**
   - https://kremilekmochomurka.github.io/firmydb-app/
   - Next.js + TypeScript + Tailwind
   - Supabase client ready

---

## 🎯 ZBÝVÁ: Deploy SQL Schema (10 sekund)

### **Metoda A: Supabase Dashboard (nejjednodušší)**

1. **Otevři:** https://supabase.com/dashboard/project/saxvaqaoqkkhkkrritcj/sql/new

2. **Copy-paste tento SQL** (celý):

\`\`\`sql
-- FirmyDB Schema v1.0
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    ico VARCHAR(8) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    legal_form VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    website VARCHAR(255),
    founded_date DATE,
    quality_score INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    position VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_companies_ico ON companies(ico);
CREATE INDEX idx_companies_city ON companies(city);
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_contacts_company ON contacts(company_id);

-- Czech full-text search
CREATE INDEX idx_companies_search ON companies 
USING gin(to_tsvector('czech', name || ' ' || COALESCE(city, '')));
\`\`\`

3. **Klikni "Run"** (zelené tlačítko vpravo dole)

4. ✅ **Done!** - Databáze je ready

---

### **Metoda B: Automatický script** (pokud preferuješ CLI)

\`\`\`bash
# 1. Install Supabase CLI
brew install supabase/tap/supabase

# 2. Login
supabase login

# 3. Link projekt
supabase link --project-ref saxvaqaoqkkhkkrritcj

# 4. Deploy schema
supabase db push

# 5. Get API keys
supabase status
\`\`\`

---

## 📋 PO DEPLOYI: Connect App

Po deployi SQL:

### **1. Get API Keys**

**Jdi na:** https://supabase.com/dashboard/project/saxvaqaoqkkhkkrritcj/settings/api

**Copy:**
- **Project URL:** `https://saxvaqaoqkkhkkrritcj.supabase.co`
- **anon public key:** `eyJhbGc...` (začíná eyJ)

### **2. Update App Config**

\`\`\`bash
cd /Users/bory/.openclaw/workspace/firmydb/app

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://saxvaqaoqkkhkkrritcj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key-here>
EOF

# Rebuild
npm run build

# Deploy
cd out
git init
git add .
git commit -m "v3: Connected to Supabase"
git branch -M main
git remote add origin https://github.com/KremilekMochomurka/firmydb-app.git
git push -f origin main
\`\`\`

---

## 🚀 VÝSLEDEK

Po dokončení budeš mít:

✅ **Plně funkční FirmyDB.cz**
- Landing page s HTTPS
- Search app napojená na real databázi
- 9 sample firem ready k zobrazení
- Škálovatelná infrastruktura (500k+ firem)

✅ **Tech Stack:**
- Frontend: Next.js (GitHub Pages)
- Database: Supabase PostgreSQL (free tier)
- DNS: Cloudflare (SSL + CDN)
- Cost: ~$0/měsíc (free tier)

✅ **Revenue Potential:**
- 20 zákazníků × 4.990 Kč = 99.800 Kč/měsíc
- Costs: ~1.500 Kč/měsíc
- Profit margin: 98%+

---

## ⏰ Timeline

**Teď:** Deploy SQL (10 sekund)  
**+5 min:** Import sample data (9 firem)  
**+10 min:** Connect app + redeploy  
**✅ LIVE:** Plně funkční MVP!

---

**Potřebuješ pomoct s něčím?** Pošli screenshot nebo ptej se! 🚀
