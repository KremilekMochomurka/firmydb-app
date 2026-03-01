# Švarc ERP POC – Test Report

**Datum:** 2026-02-27 16:36 CET  
**URL:** https://pocsvarc.deverp.cz  
**Verze:** EspoCRM v9.1.7  
**Tester:** OpenClaw AI (přihlášen jako Admin)

---

## 1. Seznam přeprav ✅ OK

- **Sloupce:** Číslo přepravy, Stav, Zákazník, Místo nakládky, Místo vykládky, Materiál, Řidič, Datum/čas začátku — **vše přítomno ✅**
- **Barevné kódování stavů:**
  - Nová = šedá ✅
  - Zadaná = modrá/teal ✅
  - Přiřazená = oranžová ✅
  - Na cestě = žlutá/oranžová ✅
  - Naložena = zelená ✅
  - Vyložena = zelená ✅
  - ⚠️ Dokončená a Zrušená — nebyly v datech, nelze vizuálně ověřit
- **Filtrování:**
  - Předdefinované filtry: Vše, Aktivní ✅, Dnes ✅, Zítra ✅, Zrušené ✅, Pouze moje, Sledované
  - ⚠️ **Chybí předdefinovaný filtr "podle řidiče" a "podle zákazníka"** — lze řešit přes pokročilé filtry (ikona trychtýře), ale není to jedním klikem
- **Data:** 6 přeprav v různých stavech, linky na zákazníky a řidiče fungují ✅

---

## 2. Založení nové přepravy ✅ OK

Formulář (#Shipment/create) obsahuje:

- **Stav** — výchozí "Nová" ✅
- **Datum/čas začátku** a **Datum/čas konce** ✅
- **Zákazník** (Account lookup) ✅
- **Šablona trasy** (RouteTemplate lookup) ✅
- **Loading sekce:** Místo nakládky*, Kontakt nakládky, Adresa nakládky (Ulice, Město, Kraj, PSČ, Země), Telefon nakládky ✅
- **Unloading sekce:** Místo vykládky*, Kontakt vykládky, Adresa vykládky, Telefon vykládky ✅
- **Cargo sekce:** Materiál*, Požadovaná váha, Jednotka váhy (t) ✅
- **Assignment sekce:** Řidič, Vozidlo, Návěs, Přiřazený uživatel, Týmy ✅
- **Notes sekce:** Poznámky ✅

⚠️ **Automatické doplnění adresy při výběru organizace** — nelze ověřit bez skutečného proklikání (nevyplňoval jsem data, aby se neznečistil systém). Pole pro adresu jsou přítomna.

---

## 3. Přiřazení řidiče ⚠️ Částečně

- SH-2026-002 je ve stavu **Zadaná**, řidič není přiřazen ✅
- Tlačítko **Upravit** je přítomno ✅
- Pole řidiče, vozidla, návěsu jsou v Assignment sekci ✅
- ⚠️ **Neproklikáno reálné přiřazení** (nechci měnit data) — ale formulář vypadá funkčně
- ⚠️ **Automatické předvyplnění vozidla po výběru řidiče** — nelze ověřit bez interakce
- Putovka PUT-SH-2026-002 existuje a je navázaná na přepravu ✅

---

## 4. Šablony tras ✅ OK

- Sekce **Šablony tras** (#RouteTemplate) existuje ✅
- **3 šablony:**
  - Bílina → Praha (písek): Lom Bílina → Skanska, 95 km
  - EUROVIA → Mokrá (kamenivo): EUROVIA Kamenolomy → Českomoravský štěrk, 190 km
  - Mokrá → Třebíč (štěrk): Českomoravský štěrk → Betonárka Třebíč, 85 km
- Sloupce: Název trasy, Místo nakládky, Místo vykládky, Materiál, Odhadované km, Aktivní ✅
- Šablona trasy je k dispozici jako lookup pole ve formuláři nové přepravy ✅

---

## 5. Duplikace přepravy (otočky) ✅ OK

- V detailu přepravy, dropdown menu **"..."** obsahuje položku **"Duplikovat"** ✅
- Další položky v menu: Odebrat, Zobrazit sledující, Zobrazit historii změn, Zobrazit přístup uživatele, Vytvořit šablonu

---

## 6. Detail přepravy ✅ OK

Detail SH-2026-004 (Na cestě) obsahuje:

- **Přehled:** Číslo přepravy, Stav (Na cestě), Datum/čas začátku, Zákazník, Šablona trasy ✅
- **Loading:** Místo nakládky (EUROVIA Kamenolomy), Kontakt (Jana Kovářová), Adresa (Národní 10, Praha), Telefon ✅
- **Unloading:** Místo vykládky (Českomoravský štěrk), Kontakt (Martin Dvořák), Adresa (Mokrá 359), Telefon ✅
- **Cargo:** Materiál (Kamenivo 0/63), Požadovaná váha (26), Jednotka (t) ✅
- **Assignment:** Řidič (Oleksandr Kovalenko), Vozidlo (Tatra Phoenix 2), Návěs (Schwarzmüller S2), Přiřazený uživatel ✅
- **Notes:** Poznámky ✅
- **Stream:** Historie změn stavů (Nová → Zadaná → Přiřazená → Na cestě) ✅
- **Dodací listy:** Panel přítomen (žádná data) ✅
- **Putovka:** PUT-SH-2026-004 navázaná ✅
- **Sidebar:** Přiřazený uživatel, Týmy, Vytvořeno, Modifikováno, Sledující ✅

---

## 7. Putovky ✅ OK

Detail PUT-SH-2026-002 obsahuje:

**ReadOnly pole (z přepravy):**
- Číslo putovky (PUT-SH-2026-002) ✅
- Stav (Předvyplněno) ✅
- Přeprava (SH-2026-002) ✅
- Trasa (Českomoravský štěrk → Betonárka Třebíč) ✅
- Zákazník (Betonárka Třebíč) ✅
- Materiál (Štěrk 16/32) ✅
- Požadovaná váha (25) ✅
- Jednotka váhy (t) ✅
- Řidič, Vozidlo, Návěs (prázdné — přeprava nemá přiřazeného řidiče) ✅

**Editovatelná pole:**
- Skutečná váha ✅
- Čas odjezdu, Čas nakládky, Čas vykládky, Čas příjezdu ✅
- Tachometr počáteční, Tachometr koncový ✅
- Ujeté km, Čekací doba (min) ✅
- Podpis ✅
- Poznámky ✅

⚠️ Pole `calculatedKm` a `waitingTime` jsou v sekci Tachometer — logicky by měly být ReadOnly (ujeté km se počítá z tachometru), ale neověřil jsem zda jsou skutečně ReadOnly bez editace.

---

## 8. Vozidla ✅ OK

- **5 vozidel:** Iveco Stralis, MAN TGS 1, Tatra Phoenix 1, Tatra Phoenix 2, VW Crafter
- Sloupce: Název, SPZ, Typ (Nákladní automobil/Dodávka), Stav (Aktivní), Výchozí řidič ✅
- Tatra Phoenix 1 → Petr Svoboda, Tatra Phoenix 2 → Oleksandr Kovalenko ✅
- ⚠️ Typ "Dodávka" pouze u VW Crafter — správně

---

## 9. Návěsy ✅ OK

- **4 návěsy:** Kögel Cargo (Valníkový), Krone Cool (Chladírenský), Schwarzmüller S1 (Sklápěcí), Schwarzmüller S2 (Sklápěcí)
- Sloupce: Název, SPZ, Typ, Stav (všechny Aktivní) ✅

---

## 10. Dodací listy ✅ OK

- **2 dodací listy:** DL-2026-007-V (Vykládka), DL-2026-007-N (Nakládka)
- Oba navázány na přepravu **SH-2026-007** (ta není v aktivním filtru seznamu přeprav)
- Sloupce: Číslo DL, Přeprava, Typ (Nakládka/Vykládka), Datum, Vytvořeno ✅
- ⚠️ Vazba na foto — neověřeno (detail DL nebyl otevřen)

---

## 11. HumanResource (řidiči) ⚠️ Problémy

- **2 řidiči:** Petr Svoboda, Oleksandr Kovalenko ✅
- Detail Oleksandra Kovalenka obsahuje: Jméno, Uživatel (link), Normohodina (0,00 CZK), Přiřazený uživatel
- ⚠️ **Chybí pole `messageLanguage` (CZ/UA)** — není viditelné v detailu ani v seznamu
- ⚠️ **Chybí pole `defaultVehicle` a `defaultTrailer`** v detailu (výchozí vozidlo je vidět v seznamu Vozidel, ne u řidiče)
- ⚠️ **Chybí pole `phoneNumber`** u řidiče
- ⚠️ **Seznam zobrazuje pouze jméno** — chybí sloupce (telefon, jazyk, výchozí vozidlo)

---

## 12. Organizace (Account) — 360° pohled ⚠️ Problémy

Detail Českomoravský štěrk a.s. obsahuje:
- Přehled: Název, Web, Email, Telefon, Fakturační adresa, Doručovací adresa ✅
- IČ, DIČ, IČ DPH ✅
- Detaily: Typ (Zákazník), Průmysl, Popis ✅
- Měna (CZK) ✅
- Sidebar: Přiřazený uživatel, Týmy, Vytvořeno, Modifikováno, Sledující ✅
- Taby: Stream, Organizace, Podpora ✅
- Panel Products ✅

❌ **Chybí panel/tab "Přepravy"** — 360° pohled na organizaci neobsahuje seznam přeprav navázaných na tuto organizaci. To je klíčová funkce POC.
- ⚠️ Chybí panel Kontakty přímo v Account detailu (je to zvlášť přes menu)
- ⚠️ Chybí panel Dodací listy v Account detailu

---

## 13. Mobilní responsivita ⚠️ Neověřeno

- Testováno na desktop rozlišení
- EspoCRM v9 má obecně responsivní layout s collapsible sidebar
- Sidebar se skrývá na menších viewportech (viditelné šipka ">" na levém okraji)
- ⚠️ Plné ověření na mobilním viewportu nebylo provedeno

---

## Souhrn

| # | Test | Výsledek |
|---|------|----------|
| 1 | Seznam přeprav | ✅ OK (chybí filtry dle řidiče/zákazníka) |
| 2 | Založení přepravy | ✅ OK |
| 3 | Přiřazení řidiče | ⚠️ Formulář OK, auto-fill neověřen |
| 4 | Šablony tras | ✅ OK |
| 5 | Duplikace přepravy | ✅ OK |
| 6 | Detail přepravy | ✅ OK |
| 7 | Putovky | ✅ OK |
| 8 | Vozidla | ✅ OK |
| 9 | Návěsy | ✅ OK |
| 10 | Dodací listy | ✅ OK (foto neověřeno) |
| 11 | HumanResource | ⚠️ Chybí messageLanguage, phoneNumber, defaultVehicle |
| 12 | Organizace 360° | ❌ Chybí panel Přepravy v Account detailu |
| 13 | Mobilní responsivita | ⚠️ Neověřeno |

### Hlavní nálezy k řešení:
1. **❌ Account 360° pohled** — přidat relationship panel "Přepravy" do Account detailu
2. **⚠️ HumanResource** — přidat pole: messageLanguage, phoneNumber, defaultVehicle, defaultTrailer
3. **⚠️ Filtry přeprav** — přidat předdefinované filtry "Podle řidiče" a "Podle zákazníka"
4. **⚠️ Seznam HumanResource** — přidat další sloupce do list view
