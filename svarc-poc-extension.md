# ŠVARC POC – Extension Log
**Datum:** 2026-02-28
**Provedl:** AI Agent (subagent)

---

## Priority 1: Explorace existujících entit ✅

### Zjištěné entity a jejich pole:

| Entita | Existuje | Pole |
|---|---|---|
| **DeliveryNote** | ✅ | name, number, type (Loading/Unloading), date, description, shipmentId |
| **Vehicle** | ✅ | name, registrationNumber, type, status, description, defaultDriverId |
| **Trailer** | ✅ | name, registrationNumber, type, status, description |
| **Shipment** | ✅ | name, number, status, material, requestedWeight, weightUnit, dateStart, dateEnd, loadingAddress*, unloadingAddress*, customerId, loadingOrganizationId, unloadingOrganizationId, driverId, vehicleId, trailerId, routeTemplateId, waybillId |
| **Waybill** | ✅ | name, number, status, route, material, requestedWeight, actualWeight, departureTime, loadingTime, unloadingTime, arrivalTime, tachometerStart/End, calculatedKm, waitingTime, signature, shipmentId, customerId, driverId, vehicleId, trailerId |
| **RouteTemplate** | ✅ | name, material, defaultWeight, weightUnit, estimatedKm, estimatedTime, isActive, loadingAddress*, unloadingAddress*, loadingOrganizationId, unloadingOrganizationId, customerId, loadingContactId, unloadingContactId |
| **FuelRecord** | ❌ | Entita neexistuje v systému |
| **TollRecord** | ❌ | Entita neexistuje v systému |
| **ServiceRecord** | ❌ | Entita neexistuje v systému |

### Chybějící pole (nelze přidat přes API bez admin přístupu k Entity Manager):
- Vehicle: Nemá dedikovaná pole pro VIN, manufacturer, year, axleConfig, emissionClass, payloadTons, fuelType, STK, insurance → **řešeno přes description**
- Trailer: Stejný problém → **řešeno přes description**
- Shipment: Nemá priceType, totalPrice, currency pole → **nelze naplnit**

---

## Priority 2: Dodací listy (DeliveryNote) ✅

Vytvořeno **12 nových dodacích listů** (6 párů nakládka/vykládka) pro Done přepravy:

| Dodací list | Typ | Přeprava | Datum |
|---|---|---|---|
| DL-2026-009-N | Loading | SH-2026-009 (Štěrk 0/32, STRABAG) | 2026-02-14 |
| DL-2026-009-V | Unloading | SH-2026-009 | 2026-02-14 |
| DL-2026-010-N | Loading | SH-2026-010 (Kamenivo 0/63, Heidelberg) | 2026-02-14 |
| DL-2026-010-V | Unloading | SH-2026-010 | 2026-02-14 |
| DL-2026-011-N | Loading | SH-2026-011 (Štěrk 16/32, Betonárka Třebíč) | 2026-02-15 |
| DL-2026-011-V | Unloading | SH-2026-011 | 2026-02-15 |
| DL-2026-014-N | Loading | SH-2026-014 (Štěrk 0/32, STRABAG) | 2026-02-17 |
| DL-2026-014-V | Unloading | SH-2026-014 | 2026-02-17 |
| DL-2026-019-N | Loading | SH-2026-019 (Štěrk 16/32, Betonárka Třebíč) | 2026-02-20 |
| DL-2026-019-V | Unloading | SH-2026-019 | 2026-02-20 |
| DL-2026-025-N | Loading | SH-2026-025 (Písek, STRABAG) | 2026-02-25 |
| DL-2026-025-V | Unloading | SH-2026-025 | 2026-02-25 |

Plus 2 existující (DL-2026-007-N, DL-2026-007-V) = **celkem 14 dodacích listů**

---

## Priority 3: Rozšíření Vehicle dat ✅

Všech 8 vozidel aktualizováno s detailními popisy obsahujícími:
- VIN číslo
- Výrobce
- Konfigurace náprav
- Emisní třída
- Nosnost
- Typ paliva + průměrná spotřeba
- STK platnost
- Pojištění platnost
- Číslo palivové karty (Eurowag)
- GPS identifikátor (ONI System)

**Poznámka:** Pole jsou v `description`, protože Vehicle entita nemá dedikovaná pole pro tyto údaje. Pro produkci by bylo potřeba přidat pole přes Entity Manager.

---

## Priority 4: Rozšíření Trailer dat ✅

Všech 6 návěsů aktualizováno s:
- VIN
- Výrobce a rok
- Nosnost a objem
- STK a pojištění platnost

---

## Priority 5: Cenová data na Shipment ⛔

**Nelze provést** – Shipment entita nemá pole priceType, totalPrice, currency. Tato pole by musela být vytvořena přes Entity Manager v admin UI. Přes API nelze přidávat nová pole na existující entity.

---

## Priority 6: Fakturantka ✅

Vytvořen uživatel:
- **Jméno:** Jana Kratochvílová
- **Username:** kratochvilova
- **ID:** 69a31bad6e67899ad
- **Heslo:** Svarc2026!
- **Email:** kratochvilova@svarc-doprava.cz
- **Telefon:** +420 777 333 444
- **Titul:** Fakturantka
- **Role:** Dispecer (přiřazena)

---

## Priority 7: FuelRecord/TollRecord/ServiceRecord ⛔

**Nelze provést** – Entity FuelRecord, TollRecord, ServiceRecord v systému neexistují. API vrací prázdnou odpověď. Tyto entity by musely být vytvořeny přes Entity Manager v admin UI nebo přes instalaci AutoERP modulu, který je obsahuje.

---

## Priority 8: RouteTemplate rozšíření ✅

Vytvořeno **5 nových šablon tras** (celkem 8):

| Šablona | Materiál | Km | Čas | Zákazník |
|---|---|---|---|---|
| Mokrá → Brno (štěrk 0/32) | Štěrk 0/32 | 25 | 35 min | Betonárna Brno-Královo Pole |
| Bílina → Třebíč (písek) | Písek praný 0/4 | 175 | 140 min | Betonárka Třebíč |
| EUROVIA → STRABAG (kamenivo 8/16) | Kamenivo 8/16 | 45 | 50 min | STRABAG a.s. |
| Mokrá → Velké Meziříčí (štěrk) | Štěrk 16/32 | 110 | 95 min | Betonárka Velké Meziříčí |
| CEMEX → DOBET (cement) | Cement | 65 | 60 min | DOBET s.r.o. |

---

## Shrnutí

| Priorita | Stav | Poznámka |
|---|---|---|
| 1. Explorace | ✅ | Zmapovány všechny entity a pole |
| 2. DeliveryNote | ✅ | 12 nových záznamů (14 celkem) |
| 3. Vehicle data | ✅ | 8 vozidel rozšířeno (v description) |
| 4. Trailer data | ✅ | 6 návěsů rozšířeno (v description) |
| 5. Pricing | ⛔ | Chybí pole na Shipment |
| 6. Fakturantka | ✅ | kratochvilova vytvořena s rolí |
| 7. Fuel/Toll/Service | ⛔ | Entity neexistují |
| 8. RouteTemplate | ✅ | 5 nových šablon (8 celkem) |

### Co je potřeba udělat v admin UI (Entity Manager):
1. Přidat pole na Vehicle: vin, manufacturer, model, manufactureYear, axleConfig, emissionClass, payloadTons, fuelType, avgConsumption, technicalInspectionDate, insuranceExpiryDate, gpsDeviceId, fuelCardNumber
2. Přidat pole na Trailer: vin, manufacturer, model, manufactureYear, payloadTons, volumeM3, technicalInspectionDate, insuranceExpiryDate
3. Přidat pole na Shipment: priceType, pricePerUnit, totalPrice, currency
4. Vytvořit entity: FuelRecord, TollRecord, ServiceRecord
5. Vytvořit roli "Fakturantka" s přístupem k fakturačním entitám
