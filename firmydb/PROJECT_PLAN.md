# FirmyDB.cz - Project Plan & Architecture

## Vision
Czech B2B Sales Intelligence Platform - "ZoomInfo pro český trh"

## Target Market
- Sales teams v českých firmách
- BDR/SDR týmy
- Sales agencies
- Freelance sales professionals
- Startups bez BDR týmu

## Core Value Proposition
**"2,500+ českých B2B firem s kontakty. Export leadů za minutu, ne za hodiny."**

---

## Phase 1: Foundation (Week 1) ✅ IN PROGRESS

### 1.1 Data Infrastructure
- [x] Database schema (Supabase)
- [x] Scraping infrastructure
  - [x] Justice.cz scraper (company data)
  - [x] Firmy.cz scraper (contact info)
  - [x] Orchestrator (data enrichment)
- [ ] Data quality pipeline
  - [ ] Email verification (Hunter.io API)
  - [ ] Phone validation
  - [ ] Duplicate detection
  - [ ] Quality scoring algorithm

### 1.2 Initial Data Collection
- [ ] Scrape 2,500-5,000 Czech B2B companies
  - [ ] Praha (1,000 firem)
  - [ ] Brno (500 firem)
  - [ ] Ostrava (300 firem)
  - [ ] Other cities (1,200 firem)
- [ ] Filter: B2B relevance, active companies, data quality >60%
- [ ] Enrichment: tech stack detection, LinkedIn profiles

### 1.3 Tech Stack Setup
- [ ] Next.js 14 app (TypeScript)
- [ ] Supabase (database + auth)
- [ ] Vercel deployment
- [ ] Stripe payment integration
- [ ] Analytics (Posthog or Mixpanel)

---

## Phase 2: Core Product (Week 1-2)

### 2.1 Authentication & User Management
- [ ] Sign up / Sign in (email + password)
- [ ] OAuth (Google, LinkedIn)
- [ ] User profile management
- [ ] Subscription management

### 2.2 Search & Filter Interface
**Main search page with filters:**
- [ ] Industry (dropdown: Software, Manufacturing, Retail, etc.)
- [ ] Location (city, region)
- [ ] Company size (1-10, 11-50, 51-200, 200+)
- [ ] Has email (checkbox)
- [ ] Has phone (checkbox)
- [ ] Has website (checkbox)
- [ ] Data quality score (slider: 0-100)

**Search results:**
- [ ] Company cards with preview info
- [ ] Pagination (50 results per page)
- [ ] Select companies for export
- [ ] Quick view modal (detailed info)

### 2.3 Export Functionality
- [ ] CSV export
- [ ] Excel export (.xlsx)
- [ ] JSON export (for API users)
- [ ] Export includes:
  - Company name, IČO
  - Email, phone, website
  - Address, industry
  - Contacts (if available)
- [ ] Export limits based on subscription tier
- [ ] Export history tracking

### 2.4 Dashboard
- [ ] Overview stats (exports used, remaining)
- [ ] Recent exports list
- [ ] Saved searches
- [ ] Account settings

---

## Phase 3: Landing Page & Marketing (Week 2)

### 3.1 Landing Page Design
**Hero Section:**
- Headline: "2,500+ českých B2B firem s kontakty. Exportuj leady za minutu."
- Subheadline: "Sales intelligence platforma pro český trh. Žádné manuální Google search, žádné staré databáze."
- CTA: "Začít zdarma" (free trial 7 days)
- Hero image: Dashboard screenshot

**Features Section:**
- ✅ Ověřené kontakty (email, telefon, web)
- ✅ Filtrování podle odvětví, lokace, velikosti
- ✅ Export do CSV/Excel
- ✅ Tech stack detection
- ✅ Denní aktualizace dat

**Pricing Section:**
- **Startup**: 1.990 CZK/měsíc
  - 100 exportů/měsíc
  - Všechny filtry
  - CSV/Excel export
  - Email podpora
  
- **Growth**: 4.990 CZK/měsíc
  - 500 exportů/měsíc
  - Všechny filtry
  - CSV/Excel/JSON export
  - API přístup (100 req/day)
  - Priority podpora
  
- **Pro**: 9.990 CZK/měsíc
  - Neomezené exporty
  - Všechny filtry
  - Full API přístup (1000 req/day)
  - CRM integrace (Pipedrive, HubSpot)
  - Dedicated podpora

**Social Proof:**
- Testimonials (až budou první zákazníci)
- Logo wall (firmy které používají)

**FAQ:**
- Co je to FirmyDB?
- Jak často aktualizujete data?
- Jak ověřujete kontakty?
- Můžu dostat refund?
- Funguje to i pro B2C?

### 3.2 SEO & Content
- [ ] Blog setup (Next.js /blog)
- [ ] Initial articles:
  - "Jak najít B2B leady v Česku"
  - "ZoomInfo vs FirmyDB: Czech edition"
  - "Nejlepší nástroje pro B2B sales v ČR"
- [ ] Meta tags, OpenGraph
- [ ] Sitemap, robots.txt

---

## Phase 4: Advanced Features (Week 3+)

### 4.1 API
- [ ] REST API documentation
- [ ] API keys management
- [ ] Rate limiting
- [ ] Webhooks (new data notifications)

### 4.2 CRM Integrations
- [ ] Pipedrive integration
- [ ] HubSpot integration
- [ ] 1-click export to CRM

### 4.3 Intent Data
- [ ] Job postings scraping (LinkedIn, Jobs.cz)
- [ ] Funding announcements (Startupjobs, Hospodářské noviny)
- [ ] Company news monitoring
- [ ] Signal alerts: "Company X is hiring sales" → hot lead

### 4.4 Tech Stack Detection
- [ ] DNS records analysis
- [ ] Builtwith.com integration
- [ ] Common tech stacks: Shopify, WordPress, custom CMS

---

## Phase 5: Growth & Optimization (Ongoing)

### 5.1 Data Quality Improvements
- [ ] Weekly data refresh
- [ ] Automated email verification
- [ ] Company status monitoring (active/inactive)
- [ ] User feedback loop (report bad data)

### 5.2 User Acquisition
- [ ] Google Ads (keywords: "b2b databáze česko", "business leads")
- [ ] LinkedIn Ads (targeting: sales managers, BDRs)
- [ ] Content marketing (SEO blog)
- [ ] Partnership with sales agencies

### 5.3 Analytics & Metrics
**Key Metrics to Track:**
- MRR (Monthly Recurring Revenue)
- Churn rate
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- Exports per user
- Search queries (what are users looking for?)
- Top industries searched
- Conversion rate (visitor → trial → paid)

---

## Tech Architecture

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** components
- **React Query** for data fetching
- **Zustand** for state management

### Backend
- **Supabase**
  - PostgreSQL database
  - Row Level Security (RLS)
  - Auth (email, OAuth)
  - Storage (for exports)
- **Next.js API routes**
  - Export generation
  - Stripe webhooks
  - Admin functions

### Payments
- **Stripe**
  - Subscriptions
  - Checkout
  - Customer portal
  - Webhooks (subscription events)

### Data Pipeline
- **Python scripts** (scraping)
- **Cron jobs** (daily data refresh)
- **Email verification API** (Hunter.io or ZeroBounce)
- **Data quality scoring** (custom algorithm)

### Hosting
- **Vercel** (frontend + API)
- **Supabase** (database)
- **Cloudflare** (DNS + CDN)

### Monitoring
- **Sentry** (error tracking)
- **Posthog** (product analytics)
- **Stripe Dashboard** (payments)
- **Vercel Analytics** (performance)

---

## Success Criteria

### Launch (End of Week 2)
- ✅ 2,500+ companies in database
- ✅ Quality score avg >70%
- ✅ Working search + filters
- ✅ Export functionality
- ✅ Payment flow (Stripe)
- ✅ Landing page live

### Month 1
- 10 paying customers
- 50,000 CZK MRR
- 1,000 website visitors
- <5% churn

### Month 3
- 50 paying customers
- 200,000 CZK MRR
- 10,000 website visitors
- <3% churn
- API launch

### Month 6
- 100+ customers
- 400,000+ CZK MRR
- Break-even (CAC < LTV)
- Series of blog posts (SEO traffic)
- First CRM integration live

---

## Risk Mitigation

**Risk: Data quality low**
→ Manual QA sample (100 companies), refine scrapers, add verification

**Risk: No one pays**
→ Free trial (7 days), money-back guarantee, direct outreach to early users

**Risk: Competitors (ZoomInfo expands to CZ)**
→ Focus on Czech-specific features, better pricing, local support

**Risk: Legal (GDPR, scraping)**
→ Only public data, proper consent flow, lawyer review

**Risk: Tech issues (Supabase outage)**
→ Monitoring, backups, status page

---

## Next Actions (Right Now)

1. **Data Collection** - Spustit scraping run (2,500 firem)
2. **Database Setup** - Nahrát schema do Supabase
3. **Landing Page** - Build hero section + pricing
4. **Auth Flow** - Sign up + login working
5. **Search MVP** - Basic search with filters
6. **Export MVP** - CSV download
7. **Stripe Setup** - Payment link for subscriptions

Estimated time: **7-10 days** for full MVP
Budget: $40 covers domain + initial API credits

---

## Notes

- **Keep it simple first** - MVP = search + export + payment
- **Data quality > quantity** - 2,500 kvalitních leadů > 10,000 špatných
- **Czech-first** - všechno česky, lokální support
- **Fast iteration** - launch, learn, improve

---

**Status:** Foundation in progress ✅
**Next milestone:** 2,500 companies in DB + landing page live
**Target launch:** 7-10 days
