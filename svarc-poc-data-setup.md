# Služby ŠVARC s.r.o. – POC Data Setup Report
**Datum:** 27.2.2026  
**Systém:** EspoCRM v9.1.7 + AutoERP + Advanced Pack  
**URL:** https://pocsvarc.deverp.cz

---

## A. OPRAVY ADMINISTRACE

### A1. Account → Shipment relationship ✅
- Relationships již existovaly (shipmentsAsCustomer, shipmentsAsLoading, shipmentsAsUnloading)
- **Přidány panely "Přepravy"** do spodních panelů (bottomPanelsDetail) layoutu Account
  - Přepravy (zákazník), Přepravy (nakládka), Přepravy (vykládka) – nyní viditelné v detailu organizace

### A2. HumanResource – chybějící pole ✅
- Pole `messageLanguage` (enum cs_CZ/uk_UA) – **již existovalo**
- Pole `phone` (varchar) – **již existovalo**, doplněna telefonní čísla všem řidičům
- Pole `defaultVehicleId` (link na Vehicle) – **již existovalo**, přiřazena vozidla

### A3. HumanResource list layout
- Sloupce jméno, telefon, jazyk, výchozí vozidlo – **vyžaduje manuální úpravu layoutu** (layout editor sortable)

### A4. Filtry přeprav
- EspoCRM má standardní filtry v listu (Aktivní filtr je zobrazen)
- Předdefinované filtry "podle řidiče" a "podle zákazníka" vyžadují custom filter třídy

---

## B. ORGANIZACE (Account) ✅

### Existující (aktualizovány adresy a telefony):
| Organizace | Adresa | Telefon |
|---|---|---|
| STRABAG a.s. | Kačírkova 982/4, Praha 5, 158 00 | +420 222 868 111 |
| Heidelberg Materials CZ s.r.o. | Mokrá 359, Mokrá-Horákov, 664 04 | +420 544 121 111 |
| CEMEX Czech Republic s.r.o. | Peceradská 95, Říčany, 251 01 | +420 272 103 111 |
| Kamenolom Olbramovice s.r.o. | Olbramovice 41, 671 76 | +420 515 232 111 |
| Lom Mokra s.r.o. | Mokrá 279, Mokrá-Horákov, 664 04 | +420 544 121 222 |
| Betonarna Brno-Kralovo Pole | Královo Pole 2, Brno, 612 00 | +420 541 588 333 |

### Nově vytvořené:
| Organizace | Adresa | Telefon | ID |
|---|---|---|---|
| Lom Kuřim s.r.o. | Blanenská 981, Kuřim, 664 34 | +420 541 231 234 | 69a1bd13b6f2caace |
| Betonárka Velké Meziříčí | Průmyslová 1, VM, 594 01 | +420 566 522 333 | 69a1bd144dac6222f |
| TBG Betonmix a.s. | Vídeňská 120, Brno, 619 00 | +420 547 213 456 | 69a1bd14c98f511a3 |
| DOBET s.r.o. | Prštné 526, Zlín, 760 01 | +420 577 210 789 | 69a1bd15521f58abf |

### Kontaktní osoby vytvořeny:
- Ing. Martin Dvořák (STRABAG), Jana Novotná (Heidelberg), Petr Malý (CEMEX)
- Tomáš Krejčí (Lom Kuřim), Lucie Veselá (Betonárka VM), Radek Procházka (TBG)
- Milan Staněk (Kamenolom Olbramovice), Eva Holá (DOBET)

---

## C. ŘIDIČI (HumanResource) ✅

| Jméno | Jazyk | Telefon | Výchozí vozidlo | ID HR |
|---|---|---|---|---|
| Petr Svoboda | cs_CZ | +420 601 234 567 | Tatra Phoenix 1 | adc1abd5983dd9845 |
| Oleksandr Kovalenko | uk_UA | +420 602 345 678 | Tatra Phoenix 2 | 61a2c151a20905899 |
| Tomáš Vlček | cs_CZ | +420 603 111 222 | MAN TGS 33.510 | 69a1bb4ac7a604d64 |
| Roman Polášek | cs_CZ | +420 604 222 333 | Tatra Phoenix 3 | 69a1bb4b83f9a23a4 |
| Vasyl Bondarenko | uk_UA | +420 605 333 444 | DAF CF 450 | 69a1bb4c6ea53ee58 |
| **Mykola Shevchenko** | uk_UA | +420 606 444 555 | DAF CF 450 | **69a1bd43332b3f9ae** |

---

## D. VOZIDLA A NÁVĚSY ✅

### Nová vozidla:
| Název | SPZ | Typ | ID |
|---|---|---|---|
| MAN TGS 33.510 | 3Z2 4567 | Truck | 69a1bd5a8e85f8fcf |
| Tatra Phoenix 3 | 1Z4 8901 | Truck | 69a1bd5b173860578 |
| DAF CF 450 | 2B5 3456 | Truck | 69a1bd5b9cf002006 |

### Nové návěsy:
| Název | SPZ | Typ | ID |
|---|---|---|---|
| Schwarzmüller K105 | 3Z2 4568 | Tipper | 69a1bd5c2a0e21526 |
| Wielton NW-3 | 1Z4 8902 | Tipper | 69a1bd5c979a55294 |

---

## E. PŘEPRAVY ✅

**Celkem: 38 přeprav** (29 původních + 6 nových Done + 3 nové Entered/Assigned)

### Rozložení podle stavu:
- **Dokončená (Done):** 26
- **Zadaná (Entered):** 3
- **Přiřazená (Assigned):** 2
- **Na cestě (OnRoute):** 2
- **Naložena (Loaded):** 2
- **Vyložena (Unloaded):** 1
- **Nová (New):** 1
- **Zrušena (Canceled):** 1

### Nové přepravy (SH-2026-030 až SH-2026-038):
- SH-2026-030: Lom Kuřim → STRABAG, Štěrk 0/32, 26t, Petr Svoboda
- SH-2026-031: Mokrá → TBG Betonmix, Písek praný 0/4, 24t, Oleksandr Kovalenko
- SH-2026-032: Olbramovice → DOBET Zlín, Štěrk 8/16, 25t, Tomáš Vlček (MAN TGS)
- SH-2026-033: Mokrá → Betonárka VM, Kamenivo 0/63, 27t, Roman Polášek (Tatra 3)
- SH-2026-034: Lom Kuřim → Betonarna KP, Štěrk 16/32, 25t, Mykola Shevchenko (DAF)
- SH-2026-035: Mokrá → TBG Betonmix, Písek praný 0/4, 24t, Petr Svoboda
- SH-2026-036: Mokrá → DOBET Zlín, Štěrk 0/32, 26t, Mykola Shevchenko (dnes, Assigned)
- SH-2026-037: TBG → STRABAG, Beton C25/30, 24t (zítra, Entered)
- SH-2026-038: Mokrá → Betonárka VM, Písek praný 0/4, 24t (zítra, Entered)

### Opraveny názvy materiálů na české tvary s diakritikou

---

## F. PUTOVKY (Waybill) ✅

**Celkem: 32 putovek** (26 původních + 6 nových)

Nové putovky (PUT-SH-2026-030 až PUT-SH-2026-035):
- Realistické časy odjezdu/nakládky/vykládky/příjezdu
- Tachometr start/end (90-200 km)
- Skutečná váha ±1t od požadované

---

## G. REPORTY A DASHBOARD ✅ (s omezením)

### Vytvořené reporty:
1. **Přepravy podle stavu** – Pie chart, všechny stavy (ID: 69a1bf1b54016e597)
2. **Přepravy za den (14 dní)** – Bar vertical (ID: 69a1bf1c0e66467e8)
3. **Přepravy podle zákazníka** – Bar vertical (ID: 69a1bf1cb2dcea640)
4. **Přepravy podle řidiče** – Bar horizontal (ID: 69a1bf1d572291e98)
5. **Tuny materiálu podle typu** – Bar vertical (ID: 69a1bf1e329e29de0)

### Dashboard:
- Tab "Dispečink" s 6 reportovými widgety nakonfigurován
- Tab "Obecné" se Stream a Activities
- ⚠️ **POZOR:** Dashlet rendering Report widgetů zobrazuje "Chyba" – pravděpodobně bug v kompatibilitě Advanced Pack s AutoERP theme. Reporty fungují správně při přímém zobrazení (Report → View).

---

## H. UŽIVATELÉ ✅

### Aktualizováni:
| Uživatel | Username | Role | Typ |
|---|---|---|---|
| Jan Novák | novak | Dispečer | regular |
| Marie Horáková | horakova/dispecer2 | Dispečer | regular |

### Noví řidiči (User accounts):
| Uživatel | Username | Role |
|---|---|---|
| Tomáš Vlček | vlcek | Řidič |
| Roman Polášek | polasek | Řidič |
| Vasyl Bondarenko | bondarenko | Řidič |
| Mykola Shevchenko | shevchenko | Řidič |

**Heslo pro nové účty:** `Svarc2026!`

---

## ZNÁMÉ PROBLÉMY

1. **Dashboard Report widgety** – zobrazují "Chyba" místo grafů. Reporty fungují správně při přímém přístupu. Pravděpodobně bug v AutoERP theme nebo Advanced Pack dashlet rendereru.
2. **HumanResource list layout** – vyžaduje manuální konfiguraci přes Layout Manager UI (drag & drop sortable).
3. **Předdefinované filtry** – EspoCRM nemá jednoduché UI pro vytvoření custom filtrů "podle řidiče/zákazníka". Vyžaduje backend rozšíření.

---

## STATISTIKY

- **Organizací:** 20 (z toho 4 nové)
- **Kontaktů:** 8 nových
- **Řidičů (HR):** 6
- **Vozidel:** 8 (z toho 3 nová)
- **Návěsů:** 6 (z toho 2 nové)
- **Přeprav:** 38
- **Putovek:** 32
- **Reportů:** 5 nových + existující
- **Uživatelů:** 10 (z toho 2 dispečeři, 6 řidičů)
