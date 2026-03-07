# FirmyDB.cz - Quick Start Guide ⚡

**Cíl:** Spustit firmydb.cz za 15 minut

---

## ✅ Checklist

### KROK 1: Vercel Deploy (5 minut)

```bash
# Open terminal
cd /Users/bory/.openclaw/workspace/firmydb/landing

# Login (browser otevře, klikni authorize)
vercel login

# Deploy na produkcii
vercel --prod

# ✅ Dostaneš URL: https://firmydb-xyz.vercel.app
```

**Výsledek:** Landing page live na Vercel URL  
**Poznámka:** Custom doménu firmydb.cz přidáš později (až DNS propaguje)

---

### KROK 2: Supabase Database (10 minut)

#### 2.1 Vytvoř projekt (2 min)

1. Jdi na **[database.new](https://database.new)**
2. Klikni **"New Project"**
3. Vyplň:
   - **Name:** firmydb
   - **Database Password:** [vygeneruj silný - ulož si ho!]
   - **Region:** Europe (Frankfurt nebo London)
   - **Pricing:** Free tier (OK pro start)
4. Klikni **"Create new project"**
5. Počkej 2 minuty (vytváří se)

#### 2.2 Deploy schema (3 min)

1. V Supabase dashboardu klikni **"SQL Editor"** (levý panel)
2. Klikni **"New Query"**
3. Otevři soubor: `/Users/bory/.openclaw/workspace/firmydb/schema.sql`
4. **Copy celý obsah** (Cmd+A, Cmd+C)
5. **Paste** do SQL Editoru v Supabase (Cmd+V)
6. Klikni **"Run"** (nebo Cmd+Enter)
7. ✅ Uvidíš: "Success. No rows returned"

#### 2.3 Získej API keys (2 min)

1. V Supabase klikni **"Settings"** (levý panel)
2. Klikni **"API"**
3. Zkopíruj:
   - **Project URL** (např. `https://abcdefgh.supabase.co`)
   - **anon/public key** (začíná `eyJhbGc...`)
   - **service_role key** (začíná `eyJhbGc...` - KEEP SECRET!)

#### 2.4 Import sample data (3 min)

```bash
# Open terminal
cd /Users/bory/.openclaw/workspace/firmydb

# Vytvoř .env soubor
cat > .env << 'EOF'
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...YOUR_SERVICE_KEY
EOF

# Nahraď YOUR_PROJECT a YOUR_SERVICE_KEY!!!

# Aktivuj venv
source venv/bin/activate

# Install Supabase client
pip install supabase

# Import 9 sample firem
python import_to_supabase.py
```

**✅ Výsledek:** 9 firem importováno do databáze

---

### KROK 3: Verify (2 min)

#### Zkontroluj Supabase:
1. V Supabase → **"Table Editor"**
2. Klikni na **"companies"** table
3. ✅ Mělo by tam být **9 rows** (Alza, ČEZ, Škoda...)

#### Zkontroluj Vercel:
1. Otevři Vercel URL (z kroku 1)
2. ✅ Měl bys vidět landing page s pricing

---

## 🎉 HOTOVO!

Máš:
- ✅ Landing page live (Vercel)
- ✅ Database s 9 firmami (Supabase)
- ✅ Ready pro marketing

---

## 🚀 Next Steps (Optional)

### Custom Doména (po DNS propagaci)

```bash
# V terminálu:
cd /Users/bory/.openclaw/workspace/firmydb/landing
vercel domains add firmydb.cz

# Postupuj dle instrukcí (DNS rekord)
```

Nebo přes Vercel UI:
1. Project Settings → Domains
2. Add Domain → `firmydb.cz`
3. Postupuj dle instrukcí

### Scrape Více Dat

```bash
cd /Users/bory/.openclaw/workspace/firmydb
source venv/bin/activate

# Scrape dalších 50 firem (potřebuješ seznam IČO)
python batch_scraper.py

# Import
python import_to_supabase.py
```

### Marketing Launch

1. **LinkedIn post:**
   - "Představuji FirmyDB.cz - databáze 500k českých firem s kontakty"
   - Link na landing page
   - 3 pricing tiers screenshot

2. **Google Ads:**
   - Keywords: "databáze českých firem", "B2B kontakty", "sales leads ČR"
   - Budget: 1.000 Kč/den

3. **Cold outreach:**
   - Target: 100 B2B sales teams
   - Message: "Zjistil jsem, že používáte [competitor]. Zkuste FirmyDB - 10× levnější..."

---

## ⚠️ Troubleshooting

**Vercel login nefunguje?**
```bash
# Zkus manual login přes browser:
open https://vercel.com/login

# Pak zkus znovu:
vercel login
```

**Supabase import hlásí chybu?**
```bash
# Zkontroluj .env soubor:
cat .env

# Ověř že URL a KEY jsou správně
# KEY musí být SERVICE_ROLE, ne ANON!
```

**DNS stále nepropagoval?**
```bash
# Zkontroluj status:
nslookup firmydb.cz

# Pokud NXDOMAIN, počkej další 2-24h (normální)
```

---

## 📞 Support

**Potřebuješ pomoc?**
- Přečti `DEPLOYMENT.md` (detailed guide)
- Přečti `STATUS.md` (project overview)
- Napiš mi: bory@apertia.cz

---

**Let's go! 🚀**

Start s krokem 1 → Vercel deploy
