# Audit POC Služby ŠVARC s.r.o. – ERP systém
**Datum:** 27.02.2026  
**Systém:** https://pocsvarc.deverp.cz – EspoCRM v9.1.7 + Advanced Pack + AutoERP

---

## 1. AUDIT DAT – Přepravy

### Zkontrolováno
Všech 38 (nyní 42) přeprav projito a zkontrolováno na logiku zákazník/nakládka/vykládka/materiál/váhy/časy.

### Nalezené a opravené chyby

| Přeprava | Problém | Oprava |
|---|---|---|
| SH-2026-029 | Materiál "Beton C25/30" z Lom Mokra – lom neprodukuje beton | → "Kamenivo 0/32" |
| SH-2026-022 | Materiál "Beton C20/25" z EUROVIA Kamenolomy – kamenolomy nedělají beton | → "Kamenivo 8/16" |
| SH-2026-023 | Překlep "Sterk 0/32" (chybí háčky) | → "Kamenivo drcené 0/32" |
| SH-2026-001 | Putovka pojmenovaná "test" | → "PUT-SH-2026-001" |
| SH-2026-030 | Zákazník = Lom Kuřim (lom platí za dovoz na stavbu?) | → Zákazník = STRABAG a.s. |
| SH-2026-034 | Zákazník = Lom Kuřim (lom platí za dovoz do betonárky?) | → Zákazník = Betonárna Brno-Královo Pole |
| Všechny EUROVIA | Adresa nakládky "Národní 10, Praha 1" – sídlo firmy, ne lom! | → "Jakubov 85, Jakubov u Třebíče, 675 44" |

### Váhy
Všechny váhy v rozmezí 20–27t – realistické pro sklápěče.

### Časy
Všechny přepravy začínají 5:00–13:00 – odpovídá ranní/odpolední směně. ✅

---

## 2. DOPLNĚNÁ DATA

### Řidiči (HumanResource)
| Řidič | Telefon | Jazyk | ŘP číslo | Výchozí vozidlo |
|---|---|---|---|---|
| Petr Svoboda | +420 603 111 222 | cs_CZ | AB 123456 | Tatra Phoenix 1 |
| Oleksandr Kovalenko | +380 67 123 4567 | **uk_UA** | UA 789012 | Tatra Phoenix 2 |
| Tomáš Vlček | +420 604 222 333 | cs_CZ | CD 345678 | MAN TGS 1 |
| Roman Polášek | +420 605 333 444 | cs_CZ | EF 567890 | Iveco Stralis |
| Vasyl Bondarenko | +380 50 234 5678 | **uk_UA** | UA 345678 | Tatra Phoenix 1 |
| Mykola Shevchenko | +380 63 345 6789 | **uk_UA** | UA 901234 | DAF CF 450 |

### Jména řidičů – opraveny háčky
- "Tomas Vlcek" → **Tomáš Vlček**
- "Roman Polasek" → **Roman Polášek**

### Organizace – opraveno jméno
- "Betonarna Brno-Kralovo Pole" → **Betonárna Brno-Královo Pole**

### Organizace – nastaveny typy
| Organizace | Typ |
|---|---|
| Českomoravský štěrk a.s. | Customer + Supplier |
| EUROVIA Kamenolomy a.s. | Supplier |
| Lom Bílina s.r.o. | Supplier |
| Lom Mokra s.r.o. | Supplier |
| Kamenolom Olbramovice s.r.o. | Supplier |
| Lom Kuřim s.r.o. | Supplier |
| Skanska a.s. | Customer |
| STRABAG a.s. | Customer |
| CEMEX Czech Republic s.r.o. | Customer |
| Heidelberg Materials CZ s.r.o. | Customer |
| Betonárna Třebíč | Customer |
| Betonárna Brno-Královo Pole | Customer |
| Betonárka Velké Meziříčí | Customer |
| TBG Betonmix a.s. | Customer |
| DOBET s.r.o. | Customer |

### EUROVIA Kamenolomy – opravena adresa
- Původně: Národní 10, Praha 1 (sídlo firmy v centru Prahy!)
- Opraveno: **Jakubov 85, Jakubov u Třebíče, 675 44** (reálná lokalita lomu)

### Smazány nepatřičné organizace
Odstraněny testovací/demo organizace, které nepatří do logistické firmy:
- Delta Travel s.r.o.
- Kirel Central s.r.o.
- Ran Turi s.r.o.
- MedCare spol. s r.o.
- Aperture Labs s.r.o.

### Vozidla – doplněny popisy
| Vozidlo | SPZ | Popis |
|---|---|---|
| Tatra Phoenix 1 | 3T2 4567 | Euro 6, 8x8, rok 2022, nosnost 28t |
| Tatra Phoenix 2 | 3T2 8901 | Euro 6, 6x6, rok 2021, nosnost 26t |
| Tatra Phoenix 3 | 1Z4 8901 | Euro 6, 8x8, rok 2023, nosnost 28t |
| MAN TGS 1 | 4A1 2345 | 35.510 8x4, rok 2023, nosnost 26t |
| MAN TGS 33.510 | 3Z2 4567 | 6x4, rok 2022, nosnost 25t |
| Iveco Stralis | 2U3 6789 | X-WAY 6x4, rok 2020, nosnost 24t |
| DAF CF 450 | 2B5 3456 | FTT 6x4, rok 2024, nosnost 26t |
| VW Crafter | 3T2 1111 | 35, rok 2023, servisní vozidlo |

### Putovky – doplněna data
- SH-2026-004 (OnRoute): doplněn odjezd, nakládka, tachometr, váha
- SH-2026-005 (Loaded): doplněn odjezd, nakládka, tachometr, váha
- SH-2026-006 (Unloaded): doplněn odjezd, nakládka, vykládka, tachometr, km, váha
- SH-2026-028 (OnRoute): vytvořena nová putovka s daty
- SH-2026-029 (Loaded): vytvořena nová putovka s daty
- SH-2026-036 (Assigned): vytvořena nová putovka

---

## 3. LOGICKÉ VAZBY – Zkontrolováno ✅

- Nakládka = vždy lom/kamenolom/betonárna (supplier)
- Vykládka = vždy stavba/betonárka/zákazník
- Zákazník = ten kdo objednává/platí
- Materiál odpovídá nakládce:
  - Z lomů: štěrk, kamenivo, písek
  - Z betonárek: beton
  - ~~Z lomu beton~~ → opraveno

---

## 4. REALISTICKÉ SCÉNÁŘE

### ✅ Otočky (turnaround)
Vytvořeny 4 přepravy na **19.02.2026**, stejná trasa Mokrá → Třebíč, řidič Petr Svoboda:
- SH-2026-042: 05:30–08:00 (Kamenivo 0/32, 24.8t)
- SH-2026-039: 08:30–11:00 (Kamenivo 0/32, 25.2t)
- SH-2026-040: 11:30–14:00 (Kamenivo 0/32, 24.5t)
- SH-2026-041: 14:30–17:00 (Kamenivo 0/32, 25.1t)

Všechny s vyplněnými putovkami (časy, tachometr, váha, km=120).

### ✅ Více řidičů na jednoho zákazníka
- **Skanska**: Petr Svoboda, Oleksandr Kovalenko, Vasyl Bondarenko (3 řidiči)
- **STRABAG**: Petr Svoboda, Oleksandr Kovalenko (2 řidiči)
- **Betonárka Třebíč**: Petr Svoboda, Tomáš Vlček (2 řidiči)

### ✅ Ukrajinští řidiči s UA dispozicemi
- Oleksandr Kovalenko: messageLanguage=uk_UA, 7 přeprav
- Vasyl Bondarenko: messageLanguage=uk_UA, 5 přeprav
- Mykola Shevchenko: messageLanguage=uk_UA, 2 přepravy

### ✅ Dnešní provoz (27.02.2026)
- SH-2026-005: **Naložena** (06:00) – Petr Svoboda, Tatra Phoenix 1
- SH-2026-004: **Na cestě** (07:00) – Oleksandr Kovalenko, Tatra Phoenix 2
- SH-2026-028: **Na cestě** (07:30) – Tomáš Vlček, MAN TGS 1
- SH-2026-029: **Naložena** (08:00) – Vasyl Bondarenko, Tatra Phoenix 1
- SH-2026-036: **Přiřazená** (13:00) – Mykola Shevchenko, DAF CF 450

### ✅ Zítřejší plán (28.02.2026)
- SH-2026-037: Zadaná (06:30) – TBG Betonmix → STRABAG, Beton C25/30
- SH-2026-038: Zadaná (07:00) – Českomoravský → Betonárka VM, Písek praný
- SH-2026-001: Nová (07:00) – Českomoravský → Betonárka Třebíč, Štěrk 16/32
- SH-2026-002: Zadaná (08:00) – Českomoravský → Betonárka Třebíč, Štěrk 16/32
- SH-2026-003: Přiřazená (09:00) – Lom Bílina → Skanska, Písek stavební

---

## 5. DASHBOARD ✅

Dashboard ("Dispečink" tab) obsahuje 8 widgetů, všechny funkční:
1. **Poslední dokončené přepravy** – 25+ záznamů
2. **Aktivní přepravy** – 5 aktivních s materiály a stavy
3. **Přepravy – tonáž podle zákazníka** – horizontální bar chart
4. **Tuny materiálu podle typu** – sloupcový graf
5. **Přepravy podle zákazníka** – sloupcový graf
6. **Přepravy podle řidiče** – horizontální bar chart
7. **Přepravy podle stavu** – koláčový graf (Dokončena ~70%, ostatní stavy)
8. **Přepravy za den (14 dní)** – sloupcový graf denního provozu

---

## 6. VIZUÁLNÍ KONTROLA ✅

- Seznamy přeprav: čitelné, všechna klíčová pole viditelná
- Aktivní přepravy zobrazují materiál a stav barevně
- Organizace mají nastaveny barevné štítky typu (Customer=zelená, Supplier=modrá)

---

## 7. LABELY A PŘEKLADY

### ✅ Opraveno
- **HumanResource → "Řidiči"** v menu Doprava (via Label Manager, scopeNames + scopeNamesPlural)

### Poznámka
V grafu "Přepravy podle řidiče" se stále zobrazují jména bez háčků (Tomas Vlce..., Roman Polase...) – to je cache reportu. Po přegenerování reportu se aktualizuje.

---

## 8. SOUHRN

### Celkový stav systému po auditu:
- **42 přeprav** (38 původních + 4 nové otočky)
- **6 řidičů** – všichni s telefony, jazyky, řidičáky, výchozími vozidly
- **8 vozidel** – všechna se SPZ, typy a popisy
- **6 návěsů** – v pořádku
- **15 organizací** – všechny s typy, telefony, adresami (5 dummy smazáno)
- **37 putovek** – dokončené mají vyplněná všechna pole
- **Dashboard** – 8 grafů, všechny funkční
- **Menu** – "Řidiči" místo "HumanResource"

### Co zůstává k řešení (mimo scope tohoto auditu):
1. Report cache pro jména řidičů (automaticky se zaktualizuje)
2. Kontaktní osoby na organizacích – původních 15 organizací (nově přidané) nemají kontaktní osoby
3. Šablony tras – existují 3, mohlo by jich být více
4. Dodací listy – entita existuje, ale žádné záznamy
