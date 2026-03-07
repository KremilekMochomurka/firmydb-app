# FirmyDB.cz - TODO Checklist

**Dnes (2026-03-01):**

## Deployment (15 minut)

- [ ] **Vercel Deploy**
  - [ ] `cd landing`
  - [ ] `vercel login`
  - [ ] `vercel --prod`
  - [ ] Zkopíruj URL a otevři v browseru
  - [ ] Ověř že landing page funguje

- [ ] **Supabase Setup**
  - [ ] Jdi na database.new
  - [ ] Vytvoř projekt "firmydb"
  - [ ] SQL Editor → paste schema.sql → Run
  - [ ] Settings → API → copy URL + service_role key
  - [ ] Vytvoř .env soubor s credentials

- [ ] **Import Sample Data**
  - [ ] `source venv/bin/activate`
  - [ ] `pip install supabase`
  - [ ] `python import_to_supabase.py`
  - [ ] Verify v Supabase Table Editor (9 rows)

---

## Marketing (týden 1-2)

- [ ] **LinkedIn**
  - [ ] Post o launch
  - [ ] Target B2B sales teams (100+ connections)
  - [ ] Sdílet v relevantních groups

- [ ] **Google Ads**
  - [ ] Setup kampaň
  - [ ] Keywords: "databáze firem", "B2B kontakty"
  - [ ] Budget: 1.000 Kč/den
  - [ ] Landing page: firmydb.cz

- [ ] **Cold Outreach**
  - [ ] Seznam 100 target firem (B2B sales teams)
  - [ ] Email template
  - [ ] Personalized messages
  - [ ] Follow-up after 3 days

---

## Product (týden 2-4)

- [ ] **Custom Doména**
  - [ ] Počkat na DNS propagaci (firmydb.cz)
  - [ ] `vercel domains add firmydb.cz`
  - [ ] Verify že funguje

- [ ] **Scrape More Data**
  - [ ] Získat seznam 10k+ IČO
  - [ ] Batch scraping
  - [ ] Import do Supabase
  - [ ] Quality check

- [ ] **Next.js App (volitelné)**
  - [ ] Search UI
  - [ ] Filters (odvětví, lokace)
  - [ ] Export CSV
  - [ ] User accounts

---

## Business (měsíc 1-3)

- [ ] **First Customers**
  - [ ] Target: 5 zákazníků do 2 týdnů
  - [ ] Personal onboarding calls
  - [ ] Collect feedback
  - [ ] Iterate based on feedback

- [ ] **Stripe Integration**
  - [ ] Setup Stripe account
  - [ ] Create products (Startup/Growth/Pro)
  - [ ] Payment links
  - [ ] Webhook integration

- [ ] **Analytics**
  - [ ] Google Analytics
  - [ ] Vercel Analytics
  - [ ] Supabase monitoring
  - [ ] Revenue tracking

---

## Legal & Compliance

- [ ] **GDPR**
  - [ ] Privacy Policy
  - [ ] Terms of Service
  - [ ] Cookie consent
  - [ ] Data retention policy

- [ ] **Business**
  - [ ] Invoice template
  - [ ] Fakturační údaje
  - [ ] Bank account setup

---

## Notes

**Cíle:**
- Week 2: První zákazník
- Month 1: 10 zákazníků (20k MRR)
- Month 3: 20 zákazníků (85k MRR) ✅ Target hit!

**Metrics to Track:**
- Visitors (landing page)
- Signups (contact form)
- Conversions (paid customers)
- Churn rate
- MRR (Monthly Recurring Revenue)

**Priority:**
1. Deploy NOW (dnes)
2. Get first customer (2 týdny)
3. Scale to 10 customers (měsíc 1)
4. Hit 85k MRR (měsíc 3)

---

✅ = Hotovo  
⏳ = V procesu  
❌ = Blocked

**Last updated:** 2026-03-01
