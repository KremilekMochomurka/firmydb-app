# ŠVARC POC – Status vs. Analýza AutoERP
**Datum:** 28.02.2026
**Zdroj:** Google Doc "Analýza AutoERP – Služby ŠVARC s.r.o." (v1.0, 19.2.2026)
**Systém:** https://pocsvarc.deverp.cz – EspoCRM v9.1.7 + Advanced Pack + AutoERP

---

## Entity – Stav implementace v POC

| # | Entita (analýza) | System name | Stav v POC | Poznámka |
|---|---|---|---|---|
| 1 | **Zákazník (Account)** | Account | ✅ Hotovo | 15 organizací, typy Customer/Supplier, telefony, adresy, 360° panely přeprav |
| 2 | **Kontaktní osoba (Contact)** | Contact | ✅ Hotovo | 8 kontaktů s vazbami na Account, telefony, role |
| 3 | **Pobočka (Branch)** | accounting.Branch | ⏭️ Mimo scope | Analýza říká "budoucí možnost" |
| 4 | **Přeprava (Transport)** | Shipment (v AutoERP) | ✅ Hotovo | 42+ přeprav, všechny stavy, vazby na zákazníka/nakládku/vykládku/řidiče/vozidlo |
| 5 | **Šablona trasy (RouteTemplate)** | RouteTemplate | ⚠️ Částečně | 3 šablony existují, ale chybí rozšíření polí dle analýzy |
| 6 | **Řidič (HumanResource)** | HumanResource | ✅ Hotovo | 6 řidičů, messageLanguage, defaultVehicle, telefony, ŘP |
| 7 | **Vozidlo (Vehicle)** | Vehicle | ✅ Hotovo | 8 vozidel se SPZ, typy, popisy |
| 8 | **Návěs (Trailer)** | Trailer | ✅ Hotovo | 6 návěsů se SPZ, typy |
| 9 | **Putovka (Waybill)** | Waybill | ✅ Hotovo | 37 putovek s časy, km, váhami |
| 10 | **Dodací list (DeliveryNote)** | DeliveryNote | ❌ Prázdné | Entita existuje, ale žádné záznamy ani data |
| 11 | **PHM záznam (FuelRecord)** | FuelRecord | ❌ Neexistuje | Nutno vytvořit entitu + demo data |
| 12 | **Mýto záznam (TollRecord)** | TollRecord | ❌ Neexistuje | Nutno vytvořit entitu + demo data |
| 13 | **Servisní záznam (ServiceRecord)** | ServiceRecord | ❌ Neexistuje | Nutno vytvořit entitu + demo data |

---

## Pole – Chybějící dle analýzy (klíčová)

### Přeprava (Shipment/Transport)
- [ ] `priceType` (enum: per_km, per_ton, flat) – typ ceny
- [ ] `pricePerUnit` (currency) – cena za jednotku
- [ ] `totalPrice` (currency) – celková cena
- [ ] `currency` (enum: CZK, EUR) – měna
- [ ] `plannedDistanceKm` (int) – plánované km
- [ ] `actualDistanceKm` (int) – skutečné km
- [ ] `loadWindowFrom/To` (datetime) – časová okna nakládky
- [ ] `unloadWindowFrom/To` (datetime) – časová okna vykládky
- [ ] `loadDispoCode` (varchar) – dispo kód
- [ ] `invoiced` (bool) – vyfakturováno
- [ ] `invoicedDate` (date) – datum fakturace
- [ ] `invoicePeriod` (varchar) – fakturační období
- [ ] `recommendedRoute` (text) – doporučená trasa
- [ ] `customerContact` (link Contact) – kontaktní osoba zákazníka
- [ ] `loadContact` (link Contact) – kontakt nakládky
- [ ] `unloadContact` (link Contact) – kontakt vykládky
- [x] `status` – existuje (New, Entered, Assigned, OnRoute, Loaded, Unloaded, Done, Canceled)
- [ ] `INVOICED` stav – chybí v enum (dle analýzy: fialová)

### Vozidlo (Vehicle)
- [ ] `vin` – VIN
- [ ] `manufacturer` – značka
- [ ] `model` – model
- [ ] `manufactureYear` – rok výroby
- [ ] `axleConfig` – nápravy (4x2, 6x4, 8x4...)
- [ ] `emissionClass` – emisní třída
- [ ] `payloadTons` – nosnost
- [ ] `volumeM3` – objem
- [ ] `fuelType` – typ paliva
- [ ] `avgConsumption` – průměrná spotřeba
- [ ] `odometerKm` – stav tachometru
- [ ] `technicalInspectionDate` – STK do
- [ ] `insuranceExpiryDate` – pojištění do
- [ ] `gpsDeviceId` – GPS ONI
- [ ] `fuelCardNumber` – palivová karta
- [ ] `assignedDriver` – přiřazený řidič
- [ ] `status` (Active/OutOfService) – stav

### Návěs (Trailer)
- [ ] `vin` – VIN
- [ ] `manufacturer` – výrobce
- [ ] `model` – model
- [ ] `manufactureYear` – rok výroby
- [ ] `payloadTons` – nosnost
- [ ] `volumeM3` – objem
- [ ] `technicalInspectionDate` – STK do
- [ ] `insuranceExpiryDate` – pojištění do
- [ ] `assignedVehicle` – přiřazené vozidlo
- [ ] `status` – stav

### Putovka (Waybill) – rozšíření
- [ ] `loadArriveTime` – příjezd na nakládku
- [ ] `loadStartTime` – začátek nakládky
- [ ] `loadEndTime` – konec nakládky
- [ ] `unloadArriveTime` – příjezd na vykládku
- [ ] `unloadStartTime` – začátek vykládky
- [ ] `unloadEndTime` – konec vykládky
- [ ] `loadWaitingMinutes` – čekání nakládka
- [ ] `unloadWaitingMinutes` – čekání vykládka
- [ ] `customerSignature` – podpis zákazníka
- [ ] `driverSignature` – podpis řidiče

---

## Dashboard & Reporty

| Report | Stav | ID |
|---|---|---|
| Přepravy podle stavu (pie) | ✅ | 69a1bf1b54016e597 |
| Přepravy za 14 dní (bar) | ✅ | 69a1bf1c0e66467e8 |
| Přepravy podle zákazníka (bar) | ✅ | 69a1bf1cb2dcea640 |
| Přepravy podle řidiče (bar) | ✅ | 69a1bf1d572291e98 |
| Tuny materiálu podle typu (bar) | ✅ | 69a1bf1e329e29de0 |
| Tonáž podle zákazníka (bar) | ✅ | 69a1bc3830ebfe782 |
| Vytíženost vozidel | ✅ | 69a1bc37a5e1f92d1 |
| **Ziskovost na vozidlo** | ❌ | Potřebuje FuelRecord + TollRecord |
| **Výnosy podle zákazníka (s cenami)** | ❌ | Potřebuje pole totalPrice na Shipment |

---

## Uživatelé

| Uživatel | Role | Stav |
|---|---|---|
| Radek Švarc (CEO) | Admin | ✅ radek.svarc |
| Marek Štika (Hl. dispečer) | Admin | ✅ marek.stika |
| Jan Novák (Dispečer) | Regular | ✅ novak |
| Marie Horáková (Dispečer) | Regular | ✅ horakova |
| 6 řidičů | Regular | ✅ ridic1, ridic2, vlcek, polasek, bondarenko, shevchenko |
| **Fakturantka** | – | ❌ Chybí |

---

## Workflow & Automatizace (POC nemá backend)

Tyto věci jsou v analýze, ale POC je demonstruje pouze daty, ne automatizací:
- [ ] Auto-vytvoření Putovky při založení Přepravy
- [ ] Auto-odeslání WhatsApp dispozice při stavu Přiřazená
- [ ] Auto-přepínání stavů
- [ ] Auto-výpočet km, čekacích časů, ceny
- [ ] Soupis přeprav pro fakturaci
- [ ] Import PHM/Mýto z Eurowag CSV
- [ ] Párování nákladů podle SPZ

---

## Integrace

| Integrace | Stav |
|---|---|
| WhatsApp dispozice | ❌ Mimo scope POC (analýza říká: ne pro POC) |
| Eurowag import | ❌ Nutno demo data |
| Profex Finance export | ❌ Mimo scope |
| GPS ONI System | ❌ Fáze 3+ |
| MatterMost | ❌ Mimo scope (zmíněn uživatelem, ale ne v analýze) |

---

## Co teď rozšiřuji (nad rámec MVP POC):

### Priorita 1 – Nové entity s demo daty
1. **Dodací listy** – vyplnit existující entitu demo záznamy
2. **PHM záznamy** – vytvořit entitu (pokud neexistuje) + demo data Eurowag
3. **Mýto záznamy** – vytvořit entitu + demo data
4. **Servisní záznamy** – vytvořit entitu + demo data (STK, pojištění, opravy)

### Priorita 2 – Rozšíření existujících entit
5. Vozidla – doplnit pole (VIN, výrobce, model, rok, nápravy, emise, nosnost, STK, pojištění)
6. Návěsy – doplnit pole (VIN, výrobce, nosnost, STK, pojištění)
7. Přepravy – doplnit cenová pole (priceType, totalPrice, currency)
8. Šablony tras – rozšířit dle analýzy

### Priorita 3 – Uživatelé a role
9. Vytvořit uživatelku Fakturantka
10. Rozšířit role a oprávnění

### Priorita 4 – Reporty
11. Report ziskovosti (po vytvoření FuelRecord/TollRecord)
12. Report výnosů podle zákazníka (po doplnění cen)

---

## Poznámky

- Analýza používá `transport.Transport`, POC má `Shipment` – mapování 1:1
- Analýza zmiňuje WhatsApp integraci jako MVP, ale Bořek řekl "WhatsApp se integrovat nebude"
- MatterMost zmíněn v konverzaci, ale není v analýze → ignoruji
- Pole označená * v analýze jsou nová pole k vytvoření
- POC je na EspoCRM + AutoERP, ne čistý EspoCRM – některé entity už mohou existovat v AutoERP modulu
