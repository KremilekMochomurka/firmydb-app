# FirmyDB - Deployment Guide

## 🎯 Cíl
Kompletní nasazení FirmyDB.cz - české B2B sales intelligence platformy.

**Výsledek:** Funkční databáze 500k+ českých firem s kontakty, deployed na firmydb.cz.

---

## ✅ Hotovo (2026-03-01)

### 1. Doména
- ✅ **firmydb.cz** zakoupena a zaplacena (266.20 CZK)
- ✅ Status: **ACTIVE** v WEDOS
- ⏳ DNS propagace (24-48h)

### 2. Landing Page
- ✅ Vytvořena (`/landing/index.html`)
- ✅ Tailwind CSS + responsive design
- ✅ 3 pricing tiers (1.990 / 4.990 / 9.990 CZK)
- ✅ Contact form
- 📂 Ready pro Vercel deploy

### 3. Data Scrapers
- ✅ **ARES API scraper** (oficiální registr ČR)
- ✅ **Batch scraper** s quality scoring
- ✅ CSV/JSON export
- ✅ Testováno na živých datech (9/10 success rate)
- 📊 Průměrné skóre kvality: 60/100

### 4. Database Schema
- ✅ PostgreSQL schema (`schema.sql`)
- ✅ Tables: companies, contacts, exports, users
- ✅ Full-text search support
- ✅ RLS (Row Level Security) ready

---

## 🚀 Deployment Steps

### KROK 1: Vercel (Landing Page)

```bash
cd /Users/bory/.openclaw/workspace/firmydb/landing

# Login k Vercel
vercel login

# Deploy
vercel --prod

# Custom domain (po DNS propagaci)
vercel domains add firmydb.cz
```

**Alternativa - Vercel Web UI:**
1. Jdi na [vercel.com/new](https://vercel.com/new)
2. Import Git / Upload folder: `/Users/bory/.openclaw/workspace/firmydb/landing`
3. Deploy
4. Settings → Domains → Add `firmydb.cz`

---

### KROK 2: Supabase (Database)

#### 2.1 Vytvoř projekt
1. Jdi na [database.new](https://database.new)
2. Vytvoř projekt: **firmydb**
3. Region: **Europe (Frankfurt)** nebo **Europe (London)**
4. Database password: [vygeneruj silný]
5. Pricing: **Free tier** (500MB, 2GB transfer, 50MB storage)

#### 2.2 Deploy schema
```bash
# V Supabase Dashboard:
# SQL Editor → New Query → vložit obsah schema.sql

# Nebo přes CLI:
cd /Users/bory/.openclaw/workspace/firmydb

# Install Supabase CLI
brew install supabase/tap/supabase

# Login
supabase login

# Link projekt
supabase link --project-ref <PROJECT_ID>

# Deploy schema
supabase db push
```

#### 2.3 Setup API keys
```bash
# V Supabase Dashboard:
# Settings → API

# Poznamenej si:
# - Project URL: https://<project>.supabase.co
# - anon/public key
# - service_role key (secret!)

# Ulož do .env:
cat > .env << EOF
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_KEY=<service-key>
EOF
```

---

### KROK 3: Import dat

#### 3.1 Prvních 1000 firem (test)
```bash
cd /Users/bory/.openclaw/workspace/firmydb

# Aktivuj virtual environment
source venv/bin/activate

# Scrape prvních 1000 IČO (TODO: seznam top firem)
python batch_scraper.py

# Import do Supabase
python -c "
from supabase import create_client
import json
import os

# Load credentials
url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_SERVICE_KEY')
supabase = create_client(url, key)

# Load scraped data
with open('companies.json') as f:
    companies = json.load(f)

# Insert
for company in companies:
    supabase.table('companies').insert(company).execute()

print(f'✅ Imported {len(companies)} companies')
"
```

#### 3.2 Masivní scraping (500k firem)
```bash
# TODO: Získat seznam všech českých IČO
# Zdroje:
# - ARES bulk export
# - Justice.cz seznam
# - Czech Statistical Office

# Spustit batch scraping s rate limiting
python batch_scraper.py --input icos.txt --output companies_full.csv --delay 1.0
```

---

### KROK 4: Frontend App (volitelné - later)

#### 4.1 Next.js app s vyhledáváním
```bash
npx create-next-app@latest app --typescript --tailwind --app

cd app

# Install dependencies
npm install @supabase/supabase-js

# Setup env
echo "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> .env.local
```

#### 4.2 Deploy app na Vercel
```bash
vercel --prod

# Connect domain
vercel domains add app.firmydb.cz
```

---

## 📊 Monitoring & Analytics

### Supabase Dashboard
- **Database:** Tables, queries, performance
- **Auth:** User management (budoucí)
- **Storage:** File uploads (budoucí)
- **Logs:** API requests, errors

### Vercel Analytics
- **Traffic:** Page views, visitors
- **Performance:** Core Web Vitals
- **Geography:** Where visitors come from

---

## 💰 Pricing & Costs

### Měsíční náklady (estimate)
- **Doména:** 193 CZK/rok ≈ 16 CZK/měsíc
- **Vercel:** $0 (free tier) nebo $20/měsíc (Pro)
- **Supabase:** $0 (free tier) nebo $25/měsíc (Pro)
- **Total:** **16-1 040 CZK/měsíc** (záleží na trafficu)

### Revenue Model
- **Startup:** 1.990 CZK/měsíc × 10 uživatelů = **19.900 CZK**
- **Growth:** 4.990 CZK/měsíc × 5 uživatelů = **24.950 CZK**
- **Pro:** 9.990 CZK/měsíc × 3 uživatelé = **29.970 CZK**
- **Total MRR target:** **75-100k CZK**

**Profit margin:** 95%+ (minimální náklady)

---

## 🔐 Security Checklist

- [ ] Supabase RLS enabled
- [ ] API keys in environment variables (not committed to git)
- [ ] Rate limiting on scraper
- [ ] HTTPS enforced (Vercel automatic)
- [ ] GDPR compliance (privacy policy)
- [ ] Data retention policy

---

## 📈 Next Steps (After Launch)

1. **Marketing:**
   - LinkedIn outreach (B2B sales teams)
   - Google Ads (keywords: "databáze firem", "B2B kontakty")
   - Content marketing (blog posts)

2. **Features:**
   - Advanced filters (odvětví, region, obrat)
   - CRM integrace (Pipedrive, HubSpot)
   - API access (pro automaty)
   - Bulk export (CSV, Excel)

3. **Data Enrichment:**
   - Email verification
   - Phone number validation
   - LinkedIn profiles
   - Company financials (ARES extended)

---

## 🆘 Support

**Tech Stack:**
- Frontend: HTML/Tailwind (landing), Next.js (app)
- Backend: Supabase (PostgreSQL + REST API)
- Scrapers: Python (requests, BeautifulSoup, ARES API)
- Hosting: Vercel (frontend), Supabase (database)

**Documentation:**
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- ARES API: [ares.gov.cz/dokumentace](https://ares.gov.cz/dokumentace)

**Contact:**
- Email: info@firmydb.cz
- Phone: +420 704 166 936
- GitHub: (TODO: create repo)

---

✅ **Ready to deploy!**
