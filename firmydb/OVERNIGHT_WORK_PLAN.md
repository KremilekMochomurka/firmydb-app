# FirmyDB - Overnight Work Plan (22:46 → 08:00)
**Doba:** 9+ hodin continuous work  
**Cíl:** Maximize product value, prepare for Monday launch  
**Start:** 22:46 (1.3.2026)  
**End:** 08:00 (2.3.2026)

---

## 🎯 OVERALL GOALS

1. **Expand database** to 200+ companies
2. **Add payment infrastructure** (Stripe ready)
3. **Implement authentication** (user accounts)
4. **Polish UX** (animations, loading states)
5. **Add advanced features** (saved searches, notifications)
6. **Create marketing assets** (demo video, screenshots)
7. **Test everything** (E2E, mobile, cross-browser)

---

## ⏰ HOURLY BREAKDOWN

### 🕐 22:46-00:00 (1h 15min) - DATABASE EXPANSION
**Goal:** Scale from 54 → 150+ companies

**Tasks:**
- [ ] Create comprehensive IČO list (200+ known Czech companies)
- [ ] Improve batch scraper (better error handling)
- [ ] Run batch import (background process)
- [ ] Verify data quality (check for duplicates)
- [ ] Update stats page (real-time count)

**Success:** 150+ companies in DB

---

### 🕐 00:00-01:30 (1h 30min) - STRIPE PAYMENT INTEGRATION
**Goal:** Accept payments, enforce limits

**Tasks:**
- [ ] Create Stripe account (if not exists)
- [ ] Get API keys (test mode)
- [ ] Install Stripe SDK (`npm install @stripe/stripe-js stripe`)
- [ ] Create pricing page backend (checkout sessions)
- [ ] Add "Upgrade to Pro" button
- [ ] Create success/cancel pages
- [ ] Test payment flow (test card)

**Success:** Users can subscribe via Stripe

---

### 🕐 01:30-03:00 (1h 30min) - USER AUTHENTICATION
**Goal:** Secure access, track usage per user

**Tasks:**
- [ ] Enable Supabase Auth
- [ ] Create login/signup pages
- [ ] Add auth middleware (protected routes)
- [ ] User dashboard (usage stats)
- [ ] Logout functionality
- [ ] Password reset flow
- [ ] Email verification (optional)

**Success:** Users can register, login, access app

---

### 🕐 03:00-04:00 (1h) - USAGE TRACKING & LIMITS
**Goal:** Enforce tier limits, track exports

**Tasks:**
- [ ] Create `user_usage` table (Supabase)
- [ ] Track CSV exports per user
- [ ] Enforce limits (Startup: 1k, Growth: 10k, Pro: unlimited)
- [ ] Show usage bar in dashboard ("X/1000 exports used")
- [ ] Upgrade prompt when limit reached
- [ ] Reset usage monthly (cron job)

**Success:** Limits enforced, upgrade prompts work

---

### 🕐 04:00-05:00 (1h) - ADVANCED FEATURES
**Goal:** Saved searches, company lists, notifications

**Tasks:**
- [ ] Saved searches feature
  - Save current filters as "My Tech Companies"
  - Edit/delete saved searches
  - Quick load from sidebar
- [ ] Company lists (favorites)
  - Star companies to add to list
  - Create multiple lists ("Hot Leads", "Following Up")
  - Export lists separately
- [ ] Email notifications (optional)
  - Weekly digest of new companies
  - Alert when saved search has new results

**Success:** Users can save searches, create lists

---

### 🕐 05:00-06:00 (1h) - UX POLISH & ANIMATIONS
**Goal:** Professional feel, smooth interactions

**Tasks:**
- [ ] Loading skeletons (instead of spinners)
- [ ] Fade-in animations (company cards)
- [ ] Smooth transitions (modal open/close)
- [ ] Toast notifications (success, error messages)
- [ ] Progress bars (data loading, export)
- [ ] Empty states (no results, no saved searches)
- [ ] Error boundaries (graceful failures)
- [ ] Optimistic updates (feel instant)

**Success:** App feels polished and professional

---

### 🕐 06:00-07:00 (1h) - MARKETING ASSETS
**Goal:** Screenshots, demo video, social media content

**Tasks:**
- [ ] Take high-quality screenshots
  - Homepage (hero)
  - Search results (filtered)
  - Company detail modal
  - Stats page
  - Email templates
  - Pricing page
- [ ] Record demo video (60-90 sec)
  - Screen recording (QuickTime)
  - Voice-over (optional)
  - Edit (iMovie / online tool)
  - Upload (YouTube unlisted)
- [ ] Create social media graphics
  - LinkedIn post images (1200x627)
  - Twitter cards (1200x675)
  - Facebook shares (1200x630)
- [ ] Update README.md (GitHub repos)
  - Add screenshots
  - Add demo GIF
  - Clear setup instructions

**Success:** All marketing assets ready for Monday launch

---

### 🕐 07:00-08:00 (1h) - TESTING & FINAL POLISH
**Goal:** Zero bugs, perfect experience

**Tasks:**
- [ ] E2E testing
  - Search flow
  - Filter combinations
  - CSV export (various sizes)
  - Detail modal (all companies)
  - Email templates (copy/open)
  - Keyboard shortcuts
- [ ] Cross-browser testing
  - Chrome (latest)
  - Safari (latest)
  - Firefox (latest)
  - Edge (latest)
- [ ] Mobile testing
  - iPhone (Safari)
  - Android (Chrome)
  - iPad (Safari)
- [ ] Performance testing
  - Lighthouse score (aim for 90+)
  - Load time (<2s)
  - Bundle size optimization
- [ ] Accessibility testing
  - Screen reader compatible
  - Keyboard navigation
  - Color contrast (WCAG AA)
- [ ] Bug fixes
  - Fix any issues found
  - Polish rough edges
  - Update documentation

**Success:** 100% bug-free, production-ready

---

## 📊 SUCCESS METRICS

### By 08:00 Monday Morning:
- ✅ Database: 150-200+ companies (vs 54 now)
- ✅ Stripe: Payment integration live
- ✅ Auth: User accounts working
- ✅ Limits: Usage tracking enforced
- ✅ Features: Saved searches + lists
- ✅ UX: Polished animations
- ✅ Marketing: Demo video + screenshots
- ✅ Testing: Zero critical bugs
- ✅ Documentation: Updated
- ✅ Deployments: v12-v20+ (aim for 8+ new versions)

### Quality Gates:
- [ ] All features work on mobile
- [ ] Lighthouse score 90+
- [ ] No console errors
- [ ] All links work
- [ ] Forms validate properly
- [ ] Payments process correctly
- [ ] Auth is secure
- [ ] Data integrity maintained

---

## 🚨 CONTINGENCY PLANS

### If Stripe Issues:
- Skip payment, focus on auth + features
- Manual invoicing for first customers
- Add payment later (Week 2)

### If Auth Issues:
- Keep app public for beta
- Add auth in Week 2
- Focus on features + polish

### If Database Import Fails:
- Manual entry of top 50 companies
- Fix scraper for Monday
- Use existing 54 companies

### If Behind Schedule:
- Skip animations (nice-to-have)
- Skip demo video (can record Monday)
- Focus on core: payments + auth + data

---

## 💡 BONUS FEATURES (If Time)

### If Ahead of Schedule:
1. **Chrome Extension** - Right-click to get company info
2. **API Documentation** - Swagger/OpenAPI spec
3. **Webhooks** - Notify on new companies
4. **Company Comparison** - Side-by-side view
5. **Export to Google Sheets** - Direct integration
6. **Email Finder** - Scrape company websites
7. **Phone Validation** - Format + verify
8. **Company Logo** - Via Clearbit or scraping
9. **Similar Companies** - Based on industry/size
10. **Recent News** - Google News API

---

## 🎯 PRIORITIES (Must Have vs Nice to Have)

### 🔴 MUST HAVE (Critical Path)
1. Database expansion (150+ companies)
2. Stripe payment integration
3. User authentication
4. Usage tracking + limits
5. Testing (no bugs)

### 🟡 SHOULD HAVE (High Value)
1. Saved searches
2. Company lists
3. UX polish
4. Marketing assets
5. Demo video

### 🟢 NICE TO HAVE (If Time)
1. Animations
2. Email notifications
3. Advanced features
4. Bonus features
5. Extra documentation

---

## 📈 VERSION PLAN

### v12: Database Expansion
- 150+ companies
- Improved scraper
- Updated stats

### v13: Stripe Integration
- Checkout flow
- Success/cancel pages
- Payment buttons

### v14: User Authentication
- Login/signup
- Protected routes
- User dashboard

### v15: Usage Tracking
- Track exports
- Enforce limits
- Upgrade prompts

### v16: Saved Searches
- Save filters
- Quick load
- Edit/delete

### v17: Company Lists
- Favorites
- Multiple lists
- Export lists

### v18: UX Polish
- Animations
- Loading states
- Toast notifications

### v19: Marketing Assets
- Screenshots
- Demo video
- README updates

### v20: Final Polish
- Bug fixes
- Testing complete
- Documentation

**Target: v11 → v20 (9 new versions by morning)**

---

## 🔧 TOOLS & RESOURCES

### Development
- VS Code (editor)
- Chrome DevTools (debugging)
- Supabase Dashboard (database)
- GitHub (version control)
- npm (package manager)

### Testing
- Lighthouse (performance)
- BrowserStack (cross-browser, if needed)
- Real devices (iPhone, Android)
- Manual testing (QA)

### Marketing
- QuickTime (screen recording)
- iMovie (video editing)
- Canva (graphics, if needed)
- iPhone camera (screenshots)

### Documentation
- Markdown (docs)
- Mermaid (diagrams, if needed)
- GitHub README (public docs)

---

## 🎬 FINAL CHECKLIST (Before 08:00)

### Product
- [ ] All features work
- [ ] No critical bugs
- [ ] Mobile responsive
- [ ] Fast load times
- [ ] Secure (no vulnerabilities)

### Marketing
- [ ] Landing page updated
- [ ] Screenshots added
- [ ] Demo video ready
- [ ] Social posts drafted
- [ ] Email templates tested

### Documentation
- [ ] README updated
- [ ] API docs (if applicable)
- [ ] User guide (if time)
- [ ] FAQ updated
- [ ] Changelog maintained

### Launch Prep
- [ ] GA4 tracking verified
- [ ] Stripe test mode works
- [ ] Auth flow tested
- [ ] Email deliverability checked
- [ ] Backup plan ready

---

## ⚡ ENERGY MANAGEMENT

### Breaks
- **00:00:** 5 min break (stretch, water)
- **02:00:** 10 min break (coffee, snack)
- **04:00:** 5 min break (stretch)
- **06:00:** 10 min break (coffee, fresh air)

### Focus Sessions
- **Pomodoro:** 45 min focus, 5 min break
- **Deep Work:** 2h blocks for complex features
- **Quick Wins:** 30 min blocks for polish/fixes

### Stay Alert
- ☕ Coffee: every 2 hours
- 💧 Water: constantly
- 🚶 Movement: every hour
- 🎵 Music: upbeat, focus playlist (optional)

---

## 🎯 MOTIVATION

**Why This Matters:**
- First customers coming Monday
- Product needs to WOW them
- More features = higher conversion
- Better UX = lower churn
- Marketing assets = easier sales

**Reward:**
- Kick-ass product by morning
- Revenue-generating business ready
- Customer acquisition starts Monday
- Prove concept works
- Build something valuable

---

## 📞 COMMUNICATION

### Hourly Updates to Bořek (WhatsApp)
- **23:30:** v12 status (database expansion)
- **01:00:** v13 status (Stripe progress)
- **02:30:** v14 status (Auth working)
- **04:00:** v15-v16 status (features)
- **06:00:** v17-v18 status (polish)
- **07:30:** Final update (all done!)

### Format:
```
✅ vXX HOTOVO
- Feature 1
- Feature 2
→ Next: vXX+1 (feature name)
```

---

## 🚀 LET'S GO!

**Current time:** 22:46  
**Target:** v20 by 08:00  
**Time available:** 9h 14min  
**Versions to ship:** 9 (v12-v20)  
**Avg time per version:** ~60 min  

**Status:** READY TO WORK! 💪

**First task:** Database expansion (create IČO list, run scraper)

---

**MAKÁM AŽ DO RÁNA! 🌙→☀️**
