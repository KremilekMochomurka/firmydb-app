# Služby ŠVARC s.r.o. – Šablony a branding POC

## Datum: 2026-02-27

---

## 1. BRANDING SYSTÉMU ✅

### Nastavení účetnictví (Administration → Nastavení účetnictví)
- **Název společnosti:** Služby ŠVARC s.r.o.
- **IČO:** 12345678 *(placeholder – doplnit skutečné)*
- **DIČ:** CZ12345678 *(placeholder)*
- **Adresa:** Racková 42, 763 61 Racková, Česká republika
- **Telefon:** +420 777 123 456 *(placeholder)*
- **Email:** info@sluzbysvarc.cz *(placeholder)*
- **Web:** www.sluzbysvarc.cz *(placeholder)*
- **Jednatel:** Ing. Jan Švarc *(placeholder)*
- **Banka:** ČSOB
- **Číslo účtu:** 123456789/0300 *(placeholder)*
- **IBAN:** CZ6503000000000123456789 *(placeholder)*
- **SWIFT:** CEKOCZPP
- **Zapsáno v:** Obchodní rejstřík vedený Krajským soudem v Brně, oddíl C, vložka XXXXX

### Systémové nastavení
- **applicationName:** Služby ŠVARC s.r.o.
- **outboundEmailFromName:** Služby ŠVARC s.r.o.
- **Theme:** AutoERP (tmavý sidebar, moderní vzhled)

---

## 2. PDF ŠABLONA PUTOVKY (Waybill) ✅

**ID:** `69a2017c42e4c0ad4`  
**Název:** Putovka - Služby ŠVARC  
**Entita:** Waybill  

### Obsah šablony:
- **Hlavička:** Logo textové "Služby ŠVARC s.r.o." + kontaktní údaje (IČO, DIČ, tel, email)
- **Titulní box:** Tmavě modrý (#16213e) s nápisem "PUTOVKA" a číslem
- **Sekce:**
  - Základní údaje (číslo, datum, stav, přeprava)
  - Trasa a zákazník
  - Řidič a vozidlo (řidič, vozidlo, návěs)
  - Materiál a váha (tabulka: materiál, požadovaná/skutečná váha, jednotka)
  - Časy (4 boxy: odjezd, nakládka, vykládka, příjezd)
  - Kilometry (tachometr start/konec, celkem km, čekací doba)
  - Poznámky
  - Podpisy (řidič + příjemce)
- **Design:** Tmavě modrá/šedá, profesionální layout, A4

---

## 3. PDF ŠABLONA DODACÍHO LISTU (DeliveryNote) ✅

**ID:** `69a201935c34c120b`  
**Název:** Dodací list - Služby ŠVARC  
**Entita:** DeliveryNote  

### Obsah šablony:
- **Hlavička:** Stejný brand jako putovka
- **Titulní box:** "DODACÍ LIST" s číslem
- **Sekce:**
  - Základní údaje (číslo DL, datum, typ Loading/Unloading, přeprava)
  - Poznámky
  - Podpisy (3x: odesílatel, přepravce, příjemce)
- **Design:** Konzistentní s putovkou

---

## 4. PDF ŠABLONA PŘEPRAVNÍHO LISTU (Shipment) ✅

**ID:** `69a201ad09193e0b5`  
**Název:** Přepravní list - Služby ŠVARC  
**Entita:** Shipment  

### Obsah šablony:
- **Hlavička:** Brand Služby ŠVARC
- **Titulní box:** "PŘEPRAVNÍ LIST" s číslem
- **Sekce:**
  - Základní údaje (číslo, stav, datum zahájení/ukončení, zákazník, šablona trasy)
  - Nakládka (organizace, kontakt, telefon, adresa s modrým pruhem)
  - Vykládka (stejný formát)
  - Materiál a posádka (tabulka: materiál, váha, řidič, vozidlo, návěs)
  - Poznámky

---

## 5. PDF ŠABLONA FAKTURY (Invoice) ✅

**ID:** `69a2022e17879007f`  
**Název:** Faktura - Služby ŠVARC  
**Entita:** Invoice  

### Obsah šablony:
- **Hlavička:** Brand + "FAKTURA" box s číslem
- **Storno banner:** Červený pás při stavu Canceled
- **Sekce:**
  - Dodavatel / Odběratel (2 sloupce)
  - Metadata (datum vystavení, splatnost, DUZP, VS, KS, způsob platby)
  - Tabulka položek (#, položka, množství, cena/ks, DPH %, celkem)
  - Součty (celkem bez DPH, DPH, celkem k úhradě – tmavě modrý řádek)
  - Bankovní spojení (banka, číslo účtu, IBAN, SWIFT)
  - Poznámky
- **Design:** Profesionální, konzistentní barvy

---

## 6. EMAIL ŠABLONY ✅

### Potvrzení přepravy
**ID:** `69a201cc70fe8a580`  
- Branded header (tmavě modrý)
- Tabulka s údaji o přepravě (číslo, materiál, datum, váha)
- Kontaktní údaje v patičce

### Notifikace o dokončení přepravy
**ID:** `69a201cce1a3403ba`  
- Branded header
- Informace o dokončení s tabulkou
- Zelený badge "Dokončeno"
- Poděkování za důvěru

---

## 7. ŠABLONA DISPOZICE (Mattermost) ℹ️

V systému nebyla nalezena žádná Mattermost integrace ani dispozice entity. Doporučený formát pro budoucí implementaci (Markdown pro Mattermost webhook):

```
### 🚛 DISPOZICE č. {{number}}
**Datum:** {{dateStart}}

📍 **NAKLÁDKA:**
- Organizace: {{loadingOrganizationName}}
- Adresa: {{loadingAddressStreet}}, {{loadingAddressCity}}
- Kontakt: {{loadingContactName}} | {{loadingContactPhone}}

📍 **VYKLÁDKA:**
- Organizace: {{unloadingOrganizationName}}
- Adresa: {{unloadingAddressStreet}}, {{unloadingAddressCity}}
- Kontakt: {{unloadingContactName}} | {{unloadingContactPhone}}

📦 **Materiál:** {{material}} | **Váha:** {{requestedWeight}} {{weightUnit}}
🚗 **Vozidlo:** {{vehicleName}} | **Návěs:** {{trailerName}}
👤 **Řidič:** {{driverName}}

---
_Služby ŠVARC s.r.o._
```

Tuto šablonu lze implementovat přes Workflow → Webhook action na Mattermost endpoint.

---

## 8. DESIGN SYSTÉM

### Barevná paleta
| Použití | Barva | Hex |
|---------|-------|-----|
| Primární (nadpisy, boxy) | Tmavě modrá | `#16213e` |
| Pozadí sekcí | Světle šedá | `#e8edf3` |
| Text | Tmavá | `#1a1a2e` |
| Sekundární text | Šedá | `#555555` |
| Zebra řádky | Off-white | `#f8f9fb` |

### Font
- **PDF šablony:** freesans (podporuje CZ diakritiku)
- **Formát:** A4, Portrait, marginace 10mm

---

## CO JE TŘEBA DOPLNIT

1. **Skutečné údaje firmy** – IČO, DIČ, telefon, email, adresa, bankovní spojení
2. **Logo** – nahrát SVG/PNG logo do systému a vložit do šablon
3. **Mattermost integrace** – nastavit webhook URL a vytvořit Workflow pro automatické odesílání dispozic
4. **Testování PDF** – vygenerovat zkušební PDF z reálných dat a upravit layout dle potřeby
5. **Šablona nabídky (Quote)** – existuje default, lze vytvořit brandovanou verzi
