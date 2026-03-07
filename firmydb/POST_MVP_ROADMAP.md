# FirmyDB.cz - Post-MVP Roadmap
**Current Status:** MVP Live (9 firem, basic search)  
**Goal:** 90-100k CZK/měsíc v 3 měsících

---

## 📈 FÁZE 1: VALIDATION (Týden 1-2)
**Cíl:** První zákazník + feedback

### **1.1 Quick Wins (První 3 dny)**
- [ ] **Add 100+ firem** (batch scraping)
  - Run `/Users/bory/.openclaw/workspace/firmydb/batch_scraper.py`
  - Import do Supabase
  - Focus: Praha + Brno tech firmy
  
- [ ] **Analytics setup**
  - Google Analytics 4
  - Track: searches, clicks, registrations
  - Plausible.io (privacy-friendly alternative)

- [ ] **Basic SEO**
  - Meta tags (title, description)
  - Sitemap.xml
  - robots.txt
  - Submit to Google Search Console

### **1.2 Marketing Launch (Den 4-7)**
- [ ] **LinkedIn campaign**
  - 3 posts (personal + company page)
  - Target: sales managers, B2B marketers
  - Include demo video/GIF
  
- [ ] **Cold email campaign**
  - List: 100 sales teams z tvého networku
  - Template: "Ušetři 10h týdně na lead research"
  - Offer: 1 měsíc free trial

- [ ] **Personal outreach**
  - 10 warm leads z Apertia kontaktů
  - Call/meeting + demo
  - Close 1-3 beta customers

### **1.3 Product Improvements (Den 8-14)**
- [ ] **CSV Export**
  - Button "Export to CSV"
  - Limit based on tier (100/1k/unlimited)
  - Track exports for billing

- [ ] **Company detail page**
  - Click na company → detail view
  - Full info + history
  - Contact CTA

- [ ] **Advanced filters**
  - Industry dropdown
  - Employee count range
  - Founded date range
  - Has email/phone checkboxes

**Success Metrics:**
- ✅ 1-3 paying customers
- ✅ 100+ firem v DB
- ✅ 50+ organic searches

---

## 💰 FÁZE 2: MONETIZATION (Týden 3-6)
**Cíl:** 10+ zákazníků, 20k+ CZK MRR

### **2.1 Payments (Týden 3)**
- [ ] **Stripe integration**
  ```bash
  npm install @stripe/stripe-js stripe
  ```
  - Checkout flow
  - 3 pricing tiers (1.990 / 4.990 / 9.990 Kč)
  - Invoice generation
  
- [ ] **Auth system**
  - Supabase Auth (email/password)
  - Protected routes
  - User dashboard

- [ ] **Usage tracking**
  - Track searches, exports per user
  - Enforce limits (Startup: 1k exports/měsíc)
  - Upgrade prompts

### **2.2 Data Expansion (Týden 4)**
- [ ] **Scale to 1000+ firem**
  - ARES bulk export (all Czech companies)
  - Filter: active, B2B, 10+ employees
  - Batch import (1000/day)

- [ ] **Email enrichment**
  - Hunter.io API integration
  - Find company emails
  - Verify with Zerobounce/Neverbounce
  
- [ ] **Phone validation**
  - Numverify API
  - Format standardization (+420 format)
  - Mark validated numbers

### **2.3 Growth Marketing (Týden 5-6)**
- [ ] **Content marketing**
  - Blog: "Top 100 tech firem v ČR"
  - Case study: "Jak získat 50 leadů za den"
  - LinkedIn articles (2x/týden)

- [ ] **Paid ads**
  - Google Ads: "česká databáze firem"
  - LinkedIn Ads: target sales managers
  - Budget: 5-10k CZK/měsíc
  
- [ ] **Referral program**
  - Refer a friend → 1 měsíc free
  - Track via unique links
  - Auto-credit accounts

**Success Metrics:**
- ✅ 10+ paying customers
- ✅ 20k+ CZK MRR
- ✅ 1000+ firem v DB
- ✅ 70%+ email coverage

---

## 🚀 FÁZE 3: SCALE (Měsíc 2-3)
**Cíl:** 50+ zákazníků, 90-100k CZK MRR

### **3.1 Product Features**
- [ ] **API Access** (Pro tier)
  - REST API endpoints
  - API keys management
  - Rate limiting (1000 req/day)
  - Docs: docs.firmydb.cz

- [ ] **Chrome Extension**
  - Right-click → get company info
  - LinkedIn integration
  - Auto-fill CRM fields

- [ ] **CRM integrations**
  - HubSpot connector
  - Pipedrive connector
  - Salesforce (enterprise tier)

- [ ] **Company insights**
  - Recent news (Google News API)
  - Social media activity
  - Job postings (scraped)
  - Financial data (ARES)

### **3.2 Data Quality**
- [ ] **Scale to 10k+ firem**
  - All B2B companies (Praha, Brno, Ostrava)
  - Industry categorization (NACE codes)
  - Deduplication logic

- [ ] **Contact persons**
  - Scrape company websites for contacts
  - LinkedIn Sales Navigator integration
  - C-level contact finder

- [ ] **Data freshness**
  - Auto-update companies (1x/měsíc)
  - Mark inactive/closed companies
  - Track changes (new email, phone)

### **3.3 Enterprise Features**
- [ ] **Team accounts**
  - Multi-user access
  - Role-based permissions
  - Shared company lists

- [ ] **Custom lists**
  - Save searches
  - Tag companies
  - Notes & history

- [ ] **Reporting**
  - Export usage stats
  - ROI calculator
  - Weekly email digest

**Success Metrics:**
- ✅ 50+ zákazníků
- ✅ 90k+ CZK MRR
- ✅ 10k+ firem v DB
- ✅ <5% churn rate

---

## 🎯 PRICING EVOLUTION

### **MVP (Teď):**
- Startup: 1.990 Kč/měsíc (1k exports)
- Growth: 4.990 Kč/měsíc (10k exports)
- Pro: 9.990 Kč/měsíc (unlimited)

### **Post-MVP (Měsíc 2):**
- **Free Tier:** 10 searches/měsíc (lead magnet)
- Startup: 2.490 Kč (+ API access)
- Growth: 5.990 Kč (+ integrations)
- Pro: 12.990 Kč (+ team accounts)
- **Enterprise:** Custom (50k+ CZK, dedicated account manager)

### **Scale (Měsíc 3+):**
- Introduce annual plans (-20%)
- Add-ons: Email enrichment (+990 Kč), Phone validation (+490 Kč)
- Volume discounts (20+ licenses)

---

## 📊 FINANCIAL PROJECTIONS

### **Měsíc 1 (Validation):**
- Customers: 3
- MRR: 3 × 1.990 = 5.970 Kč
- Costs: Domain (22 Kč) + hosting (0) = 22 Kč
- **Profit: 5.948 Kč**

### **Měsíc 2 (Monetization):**
- Customers: 15 (10 Startup, 4 Growth, 1 Pro)
- MRR: (10×2.490) + (4×5.990) + (1×12.990) = 61.850 Kč
- Costs: Domain + Supabase Pro (990) + ads (10k) = 11k Kč
- **Profit: 50.850 Kč**

### **Měsíc 3 (Scale):**
- Customers: 50 (30 Startup, 15 Growth, 5 Pro)
- MRR: (30×2.490) + (15×5.990) + (5×12.990) = 229.100 Kč
- Costs: Infrastructure (5k) + ads (20k) + enrichment APIs (10k) = 35k
- **Profit: 194.100 Kč**

### **ROI Analysis:**
- **Initial investment:** 900 Kč
- **Měsíc 3 profit:** 194.100 Kč
- **ROI:** 21.456% (3 měsíce)

---

## 🛠️ TECHNICAL ROADMAP

### **Week 1-2:**
- [ ] Batch scraper optimization (1000 firem/den)
- [ ] Database indexing (performance)
- [ ] CDN cache optimization

### **Week 3-4:**
- [ ] Stripe checkout implementation
- [ ] Supabase Auth setup
- [ ] User dashboard (React)

### **Week 5-6:**
- [ ] API development (REST endpoints)
- [ ] Rate limiting middleware
- [ ] API documentation (Swagger)

### **Week 7-8:**
- [ ] Chrome extension (manifest v3)
- [ ] CRM integrations (HubSpot first)
- [ ] Email enrichment pipeline

### **Month 2:**
- [ ] Company insights aggregation
- [ ] Job postings scraper
- [ ] News API integration

### **Month 3:**
- [ ] Team accounts infrastructure
- [ ] Advanced analytics
- [ ] Enterprise features

---

## 🎯 SUCCESS METRICS

### **KPIs to Track:**

**Growth:**
- New customers/týden
- Conversion rate (visitor → customer)
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)

**Product:**
- Daily active users
- Searches per user
- Exports per user
- Feature adoption rate

**Data:**
- Total companies
- Email coverage %
- Phone coverage %
- Data freshness (avg age)

**Revenue:**
- MRR (Monthly Recurring Revenue)
- Churn rate
- Expansion revenue (upgrades)
- Annual contract value

### **Target Dashboards:**
- **Weekly:** New customers, MRR growth, churn
- **Monthly:** CAC, LTV, user engagement, data quality
- **Quarterly:** Revenue targets, product roadmap progress

---

## 💡 QUICK WIN IDEAS

### **Marketing:**
1. **LinkedIn Series:** "Top 10 tech firem v [město]" (Praha, Brno, Ostrava)
2. **Reddit post:** r/czech, r/entrepreneur
3. **Product Hunt launch** (Week 4)
4. **Partner with sales agencies** (commission model)

### **Product:**
1. **Email finder** (scrape company website)
2. **Similar companies** (based on industry/size)
3. **Saved searches** (weekly email alerts)
4. **Company comparison** (side-by-side view)

### **Data:**
1. **Import existing lists** (CSV upload)
2. **Company logos** (via Clearbit/Google)
3. **Industry trends** (growing sectors)
4. **Funding data** (recent investments)

---

## 🚨 RISKS & MITIGATION

### **Risk 1: Competitive Response**
- **Mitigation:** Focus na niche (Czech B2B), quality over quantity
- **Advantage:** Local market knowledge, better data quality

### **Risk 2: Data Staleness**
- **Mitigation:** Monthly auto-refresh, user can report updates
- **Backup:** Manual verification queue

### **Risk 3: Low Conversion**
- **Mitigation:** Free trial (1 týden), freemium tier (10 searches)
- **Pivot:** Adjust pricing, add features based on feedback

### **Risk 4: High Churn**
- **Mitigation:** Onboarding email sequence, success manager (Pro+)
- **Monitor:** Weekly usage reports, inactive user outreach

---

## ✅ NEXT ACTIONS (Priority Order)

### **This Week:**
1. **Run batch scraper** → 100+ firem
2. **Setup analytics** → track everything
3. **10 personal outreach** → close 1-3 customers

### **Next Week:**
4. **Stripe integration** → accept payments
5. **CSV export** → basic monetization feature
6. **LinkedIn campaign** → 3 posts + ads

### **Week 3:**
7. **Scale to 1000 firem** → run full scraper
8. **Email enrichment** → Hunter.io setup
9. **Content marketing** → first blog post

---

## 📞 SUPPORT & RESOURCES

### **Tools Needed:**
- **Stripe:** Payment processing
- **Hunter.io:** Email finder (49 USD/měsíc)
- **Plausible:** Analytics (9 EUR/měsíc)
- **Supabase Pro:** 25 USD/měsíc (after 50k rows)

### **Time Investment:**
- **Week 1-2:** 20 hours (dev + marketing)
- **Week 3-6:** 15 hours/week (maintenance + growth)
- **Month 2+:** 10 hours/week (mostly automated)

### **Budget:**
- **Month 1:** ~2k CZK (tools + ads)
- **Month 2:** ~15k CZK (paid ads + APIs)
- **Month 3:** ~30k CZK (scale ads + infrastructure)

---

**Ready to execute? Let me know which phase to start!** 🚀
