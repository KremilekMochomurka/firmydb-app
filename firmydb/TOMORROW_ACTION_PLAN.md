# FirmyDB - Akční Plán na Pondělí 2.3.2026

## ✅ HOTOVO (Neděle 1.3. večer)
- 54 firem v databázi
- CSV Export feature
- Advanced filters (email/phone)
- Detail pages
- SEO optimization
- Landing page update

---

## 🎯 PRIORITA #1: První Zákazník (Pondělí ráno)

### A) Personal Outreach (8:00-10:00)
**Cíl:** 10 warm leads z Apertia kontaktů

**Template email:**
```
Ahoj [Jméno],

rychlá otázka: jak teď získáváš kontakty na české B2B firmy pro sales?

Udělal jsem nástroj FirmyDB.cz - databáze českých firem s IČO, emaily, telefony.
Funguje jako filtr: město, má email, má telefon → export CSV.

Beta verze má 50+ firem (Praha/Brno tech), každý den přibývají. Chceš zkusit?

Bořek
```

**Target leads:**
1. [Vyplnit z CRM]
2. [Vyplnit z CRM]
3. ...

---

### B) LinkedIn Posts (10:00-11:00)
**Cíl:** 3 posts pro reach

**Post 1: Problem/Solution**
```
🎯 Sales tip: Kde hledat české B2B firmy s kontakty?

Justice.cz ✅ (IČO, adresa)
Firmy.cz ✅ (někdy email/telefon)
ARES API ✅ (oficiální data)

Problém? Ruční práce 30 min/firma.

Řešení: FirmyDB.cz
↳ Filtruj podle města, má email, má telefon
↳ Export CSV jedním klikem
↳ 50+ českých B2B firem (beta)

Kdo dělá sales do českých firem? 👇
```

**Post 2: Behind the Scenes**
```
🛠️ Udělal jsem FirmyDB.cz za 7 hodin.

Stack:
→ Next.js + TypeScript (frontend)
→ Supabase PostgreSQL (database)
→ ARES API (Czech business registry)
→ GitHub Pages (hosting, $0/měsíc)

Features:
✅ 50+ českých B2B firem
✅ CSV export
✅ Advanced filters
✅ Company detail pages
✅ SEO optimized

Teď hledám první zákazníky. Kdo dělá B2B sales? 👇

Demo: firmydb.cz
```

**Post 3: Value Proposition**
```
💰 Kolik stojí 1 kvalitní B2B lead?

LinkedIn Sales Navigator: 79 USD/měsíc
Hunter.io: 49 USD/měsíc
ZoomInfo: 200+ USD/měsíc

FirmyDB.cz: 1.990 Kč/měsíc (~ 85 USD)
↳ České firmy
↳ Ověřená IČO
↳ Emaily + telefony
↳ Export CSV

Beta verze teď FREE. Kdo chce zkusit?
```

---

### C) Cold Email Campaign (11:00-13:00)
**Cíl:** 100 emails to Czech sales teams

**Subject:** "Kde bereš kontakty na české B2B firmy?"

**Body:**
```
Ahoj,

všiml jsem si že děláš [sales/marketing/BD] na českém trhu.

Rychlá otázka: kde získáváš kontakty na české B2B firmy?
Justice.cz? Firmy.cz? Ruční research?

Udělal jsem nástroj FirmyDB.cz který to automatizuje:
→ 50+ českých B2B firem (Praha, Brno, tech sector)
→ Filtr: město, má email, má telefon
→ Export CSV jedním klikem

Beta verze je FREE. Chceš zkusit?

firmydb.cz

Bořek Vaněk
Apertia Tech
```

**Target list (vyexportovat z LinkedIn):**
- Sales Managers v tech firmách (Praha, Brno)
- Business Development (B2B focus)
- Marketing Managers (lead gen)
- Recruiters (candidate sourcing)

---

## 🎯 PRIORITA #2: Product Improvements

### A) Google Analytics (13:00-14:00)
**Setup:**
1. Create GA4 property
2. Get tracking ID
3. Add to `/pages/_app.tsx`:
```typescript
import Script from 'next/script'

// In return:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

**Track:**
- Page views
- Search queries
- CSV exports
- Detail page opens
- Filter usage

---

### B) Bug Fixes & Polish (14:00-15:00)
- [ ] Test all filters (email, phone, city, sort)
- [ ] Test CSV export (all scenarios)
- [ ] Test detail modal (close on backdrop, X button)
- [ ] Mobile responsive check
- [ ] Cross-browser testing (Chrome, Safari, Firefox)

---

### C) Add More Companies (15:00-17:00)
**Goal:** Scale from 54 → 200 companies

**Sources:**
- Run batch scraper on larger IČO list
- Focus on Prague + Brno tech sector
- Prioritize companies with >10 employees
- Add Ostrava, Plzeň, České Budějovice

**Script:**
```bash
cd /Users/bory/.openclaw/workspace/firmydb
python3 batch_import.py --limit 200 --cities Praha,Brno
```

---

## 🎯 PRIORITA #3: Revenue Setup

### A) Stripe Integration (Evening)
**Goal:** Enable payments

**Steps:**
1. Create Stripe account
2. Get API keys (test mode first)
3. Install Stripe SDK:
```bash
npm install @stripe/stripe-js stripe
```

4. Create pricing tiers:
- Startup: 1.990 Kč/měsíc (1k exports)
- Growth: 4.990 Kč/měsíc (10k exports)
- Pro: 9.990 Kč/měsíc (unlimited)

5. Add checkout button to landing page
6. Test payment flow

---

### B) User Authentication (If time)
**Goal:** Secure access

**Steps:**
1. Enable Supabase Auth
2. Add login/signup UI
3. Protect routes (require auth)
4. Track usage per user
5. Enforce export limits

---

## 📊 METRICS TO TRACK

### Daily (Check at 20:00)
- [ ] Website visitors (GA4)
- [ ] Sign-ups / Trial starts
- [ ] Searches performed
- [ ] CSV exports
- [ ] Email replies (outreach campaigns)

### Weekly
- [ ] Conversion rate (visitor → customer)
- [ ] MRR growth
- [ ] Database size (companies)
- [ ] Email coverage %
- [ ] User retention

---

## 🚨 BLOCKERS & RISKS

### Potential Issues
1. **Low email response rate** → A/B test subject lines
2. **No conversions** → Add free trial (1 week)
3. **Competitors launch** → Differentiate (Czech focus, pricing)
4. **ARES API rate limiting** → Cache data, batch imports
5. **Supabase free tier limits** → Monitor usage, upgrade if needed

### Mitigation
- Have 3 email templates ready (A/B test)
- Free trial = 1 week, 100 exports
- Unique value: Czech market focus + low price
- Implement caching layer
- Budget 25 USD/month for Supabase Pro if needed

---

## 💡 QUICK WINS (If Extra Time)

### Marketing
- [ ] Post on Reddit r/czech, r/entrepreneur
- [ ] Czech Facebook groups (B2B sales, startups)
- [ ] Twitter thread about building in public
- [ ] Product Hunt launch (Week 2)

### Product
- [ ] Add "Recently added" badge on new companies
- [ ] Company logos (via Clearbit or scraping)
- [ ] "Similar companies" feature
- [ ] Email templates (for outreach)

### Technical
- [ ] Add loading states everywhere
- [ ] Error boundaries (graceful failures)
- [ ] Rate limiting (prevent abuse)
- [ ] CORS headers (if adding API)

---

## 🎯 SUCCESS DEFINITION (Monday EOD)

### Must Have
- ✅ 3 LinkedIn posts published
- ✅ 100 cold emails sent
- ✅ 10 personal outreach messages
- ✅ Google Analytics live
- ✅ All bugs fixed

### Nice to Have
- ✅ 200+ companies in DB
- ✅ Stripe integration ready
- ✅ First conversation with potential customer

### Dream Outcome
- ✅ First paying customer! 🎉

---

**Let's make it happen! 💪🚀**
