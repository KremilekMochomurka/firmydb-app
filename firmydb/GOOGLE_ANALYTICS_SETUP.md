# Google Analytics 4 Setup Guide

## 1. Create GA4 Property

1. Go to https://analytics.google.com/
2. Click "Admin" (bottom left)
3. Click "+ Create Property"
4. Fill in:
   - Property name: "FirmyDB"
   - Reporting time zone: "Czech Republic"
   - Currency: "Czech Koruna (CZK)"
5. Click "Next"
6. Fill in business info:
   - Industry: "Technology"
   - Business size: "Small"
7. Click "Create"

## 2. Get Tracking ID

1. In Admin → Property → Data Streams
2. Click "Add stream" → "Web"
3. Fill in:
   - Website URL: https://firmydb.cz
   - Stream name: "FirmyDB Web App"
4. Click "Create stream"
5. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

## 3. Add to Project

Add to `/Users/bory/.openclaw/workspace/firmydb/app/.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

(Replace G-XXXXXXXXXX with your actual Measurement ID)

## 4. Rebuild & Deploy

```bash
cd /Users/bory/.openclaw/workspace/firmydb/app
npm run build
cd out
rm -rf .git
git init
git add .
git commit -m "Add Google Analytics tracking"
git branch -M main
git remote add origin https://github.com/KremilekMochomurka/firmydb-app.git
git push -f origin main
```

## 5. Verify Tracking

1. Open https://firmydb.cz in browser
2. Open Developer Tools (F12)
3. Go to Network tab
4. Search for "google-analytics" or "gtag"
5. Should see requests to `https://www.google-analytics.com/g/collect`

## 6. Events Being Tracked

### Automatic
- **Page views:** Every page load
- **Session start:** First visit
- **User engagement:** Time on site

### Custom Events
- **search:** When user searches companies
  - Label: Search query
  - Value: Number of results
  
- **csv_export:** When user exports CSV
  - Value: Number of companies exported
  
- **company_detail_view:** When user opens company detail
  - Label: Company name
  
- **filter_used:** When user applies filters
  - Label: Filter type and value

## 7. View Reports

### Real-Time
- Admin → Property → Reports → Realtime
- See live users, page views, events

### Traffic Sources
- Reports → Acquisition → Traffic acquisition
- See where users come from (Google, Direct, LinkedIn, etc.)

### Engagement
- Reports → Engagement → Events
- See most popular events (search, export, views)

### Conversions
- Admin → Property → Events
- Mark `csv_export` as conversion
- Track conversion rate

## 8. Set Up Goals

### Goal 1: CSV Export
- Go to Admin → Events
- Find `csv_export` event
- Toggle "Mark as conversion"

### Goal 2: Company View
- Find `company_detail_view` event
- Toggle "Mark as conversion"

## 9. Create Dashboards

### Sales Dashboard
- Users per day
- CSV exports per day
- Conversion rate (export / visitor)
- Top searched queries

### Product Dashboard
- Most viewed companies
- Filter usage
- Average session duration
- Bounce rate

## 10. Set Up Alerts

### Low Traffic Alert
- If daily users < 10 → email alert
- Check marketing campaigns

### High Bounce Rate Alert
- If bounce rate > 70% → investigate UX issues

---

## Troubleshooting

### No data in GA4?
1. Check .env.local has correct GA_ID
2. Verify site is deployed (not localhost)
3. Wait 24-48 hours for data to appear
4. Use Real-Time reports for instant feedback

### Events not tracking?
1. Open browser console
2. Look for gtag errors
3. Verify analytics.ts functions are called
4. Check Network tab for `/g/collect` requests

---

## Next Steps

1. ✅ Set up GA4 property
2. ✅ Add tracking ID to .env.local
3. ✅ Deploy
4. [ ] Verify tracking works
5. [ ] Mark conversions
6. [ ] Create dashboards
7. [ ] Set up weekly reports email

---

**Estimated setup time:** 30 minutes  
**Value:** Priceless (data-driven decisions) 📊
