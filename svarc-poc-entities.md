# ŠVARC POC – Entity & Field Extension Log
**Datum:** 2026-02-28
**Provedl:** AI Agent (subagent:svarc-entities)

---

## Summary

All entities, fields, and demo data have been created successfully via the EspoCRM Admin API. The new entities are accessible in the navigation under the "Doprava" group.

---

## PART 2: Shipment Fields ✅

Created 7 new custom fields on Shipment:

| Field | Type | Label |
|---|---|---|
| `priceType` | Enum | Typ ceny (Per_Km/Per_Ton/Flat) |
| `pricePerUnit` | Currency | Cena za jednotku |
| `totalPrice` | Currency | Celková cena |
| `recommendedRoute` | Text | Doporučená trasa |
| `invoiced` | Boolean | Vyfakturováno |
| `invoicePeriod` | Varchar | Fakturační období |
| `loadDispoCode` | Varchar | Dispo kód nakládky |

**Data populated:** All 36 Done shipments updated with realistic prices (Per_Km, Per_Ton, Flat), invoicing status, dispo codes.

**Layout:** Fields added to Shipment detail layout in a "Pricing" panel (drag-drop placed).

---

## PART 3: Vehicle Fields ✅

Created 15 new custom fields on Vehicle:

| Field | Type | Label |
|---|---|---|
| `vin` | Varchar(17) | VIN |
| `manufacturer` | Varchar | Značka |
| `vModel` | Varchar | Model |
| `manufactureYear` | Int | Rok výroby |
| `vehicleType` | Enum | Typ vozidla (Truck/Tractor/Special/Car) |
| `axleConfig` | Enum | Nápravy (4x2/6x2/6x4/8x4/8x8) |
| `emissionClass` | Enum | Emisní třída (Euro5/Euro6) |
| `payloadTons` | Float | Nosnost (t) |
| `fuelType` | Enum | Palivo (Diesel/CNG/Electric) |
| `avgConsumption` | Float | Prům. spotřeba (l/100km) |
| `odometerKm` | Int | Stav tachometru (km) |
| `technicalInspectionDate` | Date | STK do |
| `insuranceExpiryDate` | Date | Pojištění do |
| `fuelCardNumber` | Varchar | Palivová karta |
| `vStatus` | Enum | Stav (Active/OutOfService) |

**Note:** Field names `vModel` and `vStatus` used to avoid conflicts with existing `model`/`status` fields.

**Data populated:** All 8 vehicles updated with realistic technical data (VIN, manufacturer, year, axle config, emissions, payload, fuel type, odometer, STK, insurance, fuel card).

**Layout:** Detail layout has fields available but some need manual arrangement in Layout Manager. Fields are in "Dostupná pole" for drag-drop.

---

## PART 4: Trailer Fields ✅

Created 9 new custom fields on Trailer:

| Field | Type | Label |
|---|---|---|
| `vin` | Varchar(17) | VIN |
| `manufacturer` | Varchar | Výrobce |
| `tModel` | Varchar | Model |
| `manufactureYear` | Int | Rok výroby |
| `payloadTons` | Float | Nosnost (t) |
| `volumeM3` | Float | Objem (m³) |
| `technicalInspectionDate` | Date | STK do |
| `insuranceExpiryDate` | Date | Pojištění do |
| `tStatus` | Enum | Stav (Active/OutOfService) |

**Data populated:** All 6 trailers updated with VIN, manufacturer, year, payload, volume, STK, insurance.

---

## PART 5: FuelRecord (CFuelRecord) ✅

**Entity:** CFuelRecord (system name with C prefix for custom entities)
- Label: PHM záznam / PHM záznamy
- Type: Base

**Fields created:**

| Field | Type | Label |
|---|---|---|
| `serviceType` | Varchar | Služba (default: FUEL) |
| `dateTime` | Datetime | Datum a čas |
| `vehiclePlate` | Varchar | SPZ |
| `cardNumber` | Varchar | Číslo karty |
| `itemName` | Varchar | Artikl |
| `amountWithoutVat` | Currency | Částka bez DPH |
| `amountWithVat` | Currency | Částka s DPH |
| `quantity` | Float | Množství (l) |
| `country` | Varchar | Země |
| `location` | Varchar | Lokace |

**Relationship:** Many-to-One with Vehicle (via vehicleId)

**Demo data:** 18 fuel records for February 2026:
- Various vehicles (SPZ: 2B5 3456, 2U3 6789, 4A1 2345, etc.)
- Diesel fuel at Czech stations (Shell, OMV, Benzina, MOL, Orlen, EuroOil)
- Quantities: 200-500 liters
- Amounts: 7,000-22,000 CZK per fill
- Eurowag card numbers: EW-7845-0001 through EW-7845-0007

**List layout:** Name, Částka s DPH, Množství (l), Artikl, SPZ, Datum a čas, Lokace

---

## PART 6: TollRecord (CTollRecord) ✅

**Entity:** CTollRecord
- Label: Mýto záznam / Mýto záznamy
- Type: Base

**Fields created:**

| Field | Type | Label |
|---|---|---|
| `serviceType` | Varchar | Služba (default: TOLL) |
| `dateTime` | Datetime | Datum a čas |
| `vehiclePlate` | Varchar | SPZ |
| `cardNumber` | Varchar | Číslo karty |
| `itemName` | Varchar | Artikl |
| `amountWithoutVat` | Currency | Částka bez DPH |
| `amountWithVat` | Currency | Částka s DPH |
| `quantity` | Float | Množství |
| `country` | Varchar | Země |

**Relationship:** Many-to-One with Vehicle

**Demo data:** 12 toll records for February 2026:
- Czech toll (CS - Mýtné post-pay)
- Amounts: 638-3,630 CZK per record
- Various vehicles

**List layout:** Name, Země, Částka s DPH, Artikl, SPZ, Datum a čas

---

## PART 7: ServiceRecord (CServiceRecord) ✅

**Entity:** CServiceRecord
- Label: Servisní záznam / Servisní záznamy
- Type: Base

**Fields created:**

| Field | Type | Label |
|---|---|---|
| `serviceType` | Enum | Typ servisu (STK/Insurance/Repair/Maintenance) |
| `serviceDate` | Date | Datum servisu |
| `serviceCost` | Currency | Náklady |
| `description` | Text | Popis (built-in) |
| `nextDueDate` | Date | Další termín |

**Relationships:** Many-to-One with Vehicle, Many-to-One with Account (as provider)

**Demo data:** 7 service records:

| Record | Type | Cost | Vehicle |
|---|---|---|---|
| SRV-2026-001 | STK | 2,500 CZK | MAN TGS 1 |
| SRV-2026-002 | Insurance | 48,000 CZK | DAF CF 450 |
| SRV-2026-003 | Repair (brakes) | 15,600 CZK | Tatra Phoenix 1 |
| SRV-2026-004 | Maintenance (oil) | 8,900 CZK | Iveco Stralis |
| SRV-2026-005 | STK | 2,500 CZK | Tatra Phoenix 2 |
| SRV-2026-006 | Repair (gearbox) | 32,000 CZK | MAN TGS 33.510 |
| SRV-2026-007 | Maintenance (tires) | 4,500 CZK | DAF CF 450 |

**List layout:** Name, Další termín, Popis, Náklady, Datum servisu, Typ servisu

---

## PART 8: Rebuild ✅

Administration → Rebuild executed successfully after all entity/field creation.

---

## PART 9: Data Population ✅

### Shipment Prices
- 36 Done shipments updated with prices
- Price types: Per_Km, Per_Ton, Flat (random distribution)
- Amounts: 1,019 - 12,000 CZK
- Invoicing: ~70% marked as invoiced, period 2026-02
- Dispo codes: D-1000 to D-9999

### Vehicle Technical Data
All 8 vehicles populated:
| Vehicle | VIN | Type | Axle | Emission | Payload | Odometer |
|---|---|---|---|---|---|---|
| DAF CF 450 | XLRTEH4300G123456 | Truck | 6x4 | Euro6 | 26t | 185,000 |
| Iveco Stralis | WMAN08ZZ1CY234567 | Truck | 6x2 | Euro6 | 24t | 220,000 |
| MAN TGS 1 | WMAN06ZZ3DY345678 | Truck | 6x4 | Euro6 | 26t | 142,000 |
| MAN TGS 33.510 | WMAN08ZZ5EY456789 | Truck | 8x4 | Euro6 | 28t | 98,000 |
| Tatra Phoenix 1 | TNAE3C1P0FK567890 | Truck | 8x8 | Euro6 | 30t | 310,000 |
| Tatra Phoenix 2 | TNAE3C1P2GL678901 | Truck | 6x4 | Euro6 | 26t | 265,000 |
| Tatra Phoenix 3 | TNAE3C1P4HM789012 | Truck | 6x4 | Euro6 | 26t | 195,000 |
| VW Crafter | WV1ZZZ2HZKH890123 | Car | 4x2 | Euro6 | 1.5t | 45,000 |

### Trailer Technical Data
All 6 trailers populated with VIN, manufacturer, payload, volume, STK, insurance dates.

### Additional Account
- Created: **Autoservis Lipník s.r.o.** (Supplier), ID: 69a31e738a8f6f95d

---

## PART 10: Navigation Tabs ✅

CFuelRecord, CTollRecord, CServiceRecord added to the "Doprava" navigation group alongside Shipment, Waybill, Vehicle, Trailer, etc.

---

## PART 11: Verification ✅

| Check | Status |
|---|---|
| CFuelRecord list | ✅ 18 records visible with layout |
| CTollRecord list | ✅ 12 records visible with layout |
| CServiceRecord list | ✅ 7 records visible with layout |
| Shipment prices | ✅ Data populated (not yet on detail layout fully) |
| Vehicle technical fields | ✅ Data populated via API |

---

## PART 12: Layouts

### List Layouts ✅
- CFuelRecord: Name, Částka s DPH, Množství, Artikl, SPZ, Datum a čas, Lokace
- CTollRecord: Name, Země, Částka s DPH, Artikl, SPZ, Datum a čas
- CServiceRecord: Name, Další termín, Popis, Náklady, Datum servisu, Typ servisu

### Detail Layouts ⚠️ Partial
- Shipment: "Pricing" panel added with drag-drop (may need manual refinement)
- Vehicle: Technical fields available but need manual arrangement in Layout Manager
- New entities: Default detail layouts (single-column) - usable but could be organized better

---

## Known Issues / TODO

1. **Vehicle/Trailer detail layouts** need manual field arrangement in Entity Manager → Layout Manager
2. **Enum label translations** (Czech) for some fields on custom entities couldn't be updated via API (500 errors) - the English option values show. Labels can be fixed in Entity Manager → Fields → Edit each enum
3. **Relationship panels** (FuelRecord/TollRecord/ServiceRecord panels on Vehicle detail) - created via API but may need to be added to Vehicle's "Spodní panely" (Bottom Panels) layout manually
4. Field names `vModel`/`vStatus` (Vehicle) and `tModel`/`tStatus` (Trailer) have prefixed names to avoid conflicts - their display labels are correctly set to "Model" and "Stav"

---

## API Notes

- Entity creation: `POST /api/v1/EntityManager/action/createEntity` → returns name with "C" prefix (e.g., CFuelRecord)
- Field creation: `POST /api/v1/Admin/fieldManager/{EntityType}` → works perfectly for all field types
- Relationship creation: `POST /api/v1/EntityManager/action/createLink` → returns empty but creates the link
- Layout update: No reliable API endpoint found for saving layouts programmatically; browser UI required
- Rebuild: `POST /api/v1/Admin/rebuild` → works
