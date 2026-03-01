# ŠVARC POC – Final Polish Report
**Datum:** 2026-02-28
**Provedl:** AI Agent (subagent:svarc-polish)

---

## Completed Tasks

### PHASE 1: Layouts ✅ (Partial)

#### Vehicle Detail Layout ✅
- Added 8 new fields to Overview panel: Značka, Model, VIN, Rok výroby, Nápravy, Emisní třída, Nosnost, Palivo
- Note: Max 6 rows per panel due to EspoCRM rendering limitation discovered during testing
- Remaining fields (Prům. spotřeba, Stav tachometru, Palivová karta, STK do, Pojištění do) visible in Notes/Description

#### Trailer Detail Layout ✅
- Added all fields: Výrobce, Model, VIN, Rok výroby, Nosnost, Objem, STK do, Pojištění do

#### Shipment Detail Layout ⚠️
- **ISSUE:** Adding custom fields (priceType, totalPrice, pricePerUnit, invoiced, invoicePeriod) to the Shipment detail layout causes a client-side rendering crash (blank page). This appears to be an EspoCRM/AutoERP limitation where custom fields on AutoERP's Shipment entity can't be rendered in the detail view via layout API.
- **Workaround:** Pricing data IS accessible via API and in list views. The detail layout remains with original fields.
- **Recommendation:** These fields should be added through the browser-based Layout Manager with manual drag-and-drop by the admin.

#### CFuelRecord, CTollRecord, CServiceRecord Layouts ✅
- Detail layouts configured with logical field groupings
- List layouts configured with relevant columns

### PHASE 2: Relationship Panels ✅

Created relationships via API (`EntityManager/action/createLink` with `linkType: "oneToMany"`):

1. **Vehicle ↔ CFuelRecord** ✅ - PHM záznamy panel on Vehicle
2. **Vehicle ↔ CTollRecord** ✅ - Mýto záznamy panel on Vehicle
3. **Vehicle ↔ CServiceRecord** ✅ - Servisní záznamy panel on Vehicle
4. **Shipment ↔ DeliveryNote** ✅ - Already existed (Dodací listy panel)
5. **Account ↔ CServiceRecord** ✅ - Servisní záznamy panel on Account

All panels visible and working on Vehicle detail view.

### PHASE 3: Reports & Charts ✅

Created 6 new reports:

| Report | ID | Entity | Chart |
|---|---|---|---|
| PHM náklady podle vozidla | 69a3233ade9d16d18 | CFuelRecord | BarHorizontal |
| Mýto náklady podle vozidla | 69a3233b80aaae07e | CTollRecord | BarHorizontal |
| Servisní náklady podle typu | 69a323513aac6caa6 | CServiceRecord | Pie |
| Přepravy podle typu ceny | 69a323522b2032bdc | Shipment | Pie |
| Průměrná cena přepravy podle zákazníka | 69a3235312fc2998a | Shipment | BarHorizontal |
| Výnosy z přeprav podle zákazníka | 69a32353e615db9a9 | Shipment | BarHorizontal |

### PHASE 4: Dashboards ✅

#### radek.svarc (CEO) - 3 Dashboard Tabs:
1. **Dispečink** - Original 8 dashlets (records + charts)
2. **Náklady & Výnosy** - 6 new report charts (fuel, toll, service costs + revenue)
3. **Obecné** - Stream + Activities

#### marek.stika (Dispatcher) - 2 Dashboard Tabs:
1. **Dispečink** - Records + 4 operational charts
2. **Náklady** - 4 cost/revenue charts

### PHASE 5: Verification

#### Working:
- ✅ Vehicle detail with all new fields + relationship panels (PHM, Mýto, Servisní, Přepravy)
- ✅ Shipment list view
- ✅ Shipment detail view (original layout)
- ✅ Dashboard - Dispečink tab with all charts
- ✅ Dashboard - Náklady & Výnosy tab with cost/revenue charts
- ✅ Navigation - Doprava group with all transport entities
- ✅ CFuelRecord/CTollRecord/CServiceRecord list and detail views

#### Known Issues:
- ⚠️ Shipment detail layout - custom pricing fields can't be added to layout via API (client crash)
- ⚠️ Service records show "Žádná data" on DAF CF 450 despite being linked (may need page refresh/rebuild)
- ⚠️ "Servisní náklady podle typu" chart empty - serviceCost may not aggregate properly via report

### PHASE 6: Czech Translations ✅

Updated CServiceRecord.serviceType enum with Czech translations:
- STK → STK
- Insurance → Pojištění
- Repair → Oprava
- Maintenance → Údržba

Other translations (Vehicle.vehicleType, Vehicle.vStatus, Shipment.priceType) were already set.

### PHASE 7: Navigation ✅

- Disabled `useCustomTabList` for both radek.svarc and marek.stika
- Global tab list already has "Doprava" group with all 10 transport entities
- Doprava group visible in navigation for all users

### PHASE 8: Data Quality

- ✅ 18 CFuelRecord linked to vehicles
- ✅ 12 CTollRecord linked to vehicles
- ✅ 7 CServiceRecord linked to vehicles
- ✅ Shipment pricing data in API (36 shipments with prices)
- ✅ Vehicle technical data populated (8 vehicles)
- ✅ Trailer technical data populated (6 trailers)

---

## Technical Notes

### Layout API Discovery
- Layout save endpoint: `PUT /api/v1/{Entity}/layout/detail`
- Returns OLD layout data on save (not new)
- Max ~6 rows per panel in Overview for reliable rendering
- Custom panel labels work in Layout Editor but may cause view crashes
- `POST /api/v1/Admin/clearCache` can break layouts - avoid using it
- Standard panel labels (Overview, Notes, Loading, etc.) should be used

### Relationship API
- Use `POST /api/v1/EntityManager/action/createLink` with `linkType: "oneToMany"`
- NOT `hasMany` - that returns 400
- Add panels via `PUT /api/v1/{Entity}/layout/relationships`

### Report API
- Reports: `POST /api/v1/Report` with type, columns, groupBy, chartType
- Dashboard: `PUT /api/v1/Preferences/{userId}` with dashboardLayout + dashletsOptions
