# Švarc PoC – Integrace dopravního modulu s organizacemi (Account)

**Datum:** 2026-02-27  
**ERP:** https://pocsvarc.deverp.cz  
**Verze:** EspoCRM v9.1.7 (AutoCRM)

## Stav: ✅ HOTOVO

## 1. Panely přeprav v detailu organizace

### Relationships (Entity Manager → Account → Vztahy)
Existují 3 relationship linky:
- `shipmentsAsCustomer` (customer → 1-N → Přeprava) – organizace jako zákazník
- `shipmentsAsLoading` (loadingOrganization → 1-N → Přeprava) – organizace jako nakládka
- `shipmentsAsUnloading` (unloadingOrganization → 1-N → Přeprava) – organizace jako vykládka

### Bottom Panels Layout
V layoutu "Spodní panely" (Account) jsou panely uspořádány do záložek:
- **Stream** – Stream, Aktivity, Historie, Úkoly (výchozí záložka)
- **Organizace** – Kontakty, Případy, Dokumenty
- **Podpora** – Události, Products
- **Doprava** ← NOVÁ ZÁLOŽKA
  - Přepravy (nakládka)
  - Přepravy (vykládka)
  - Přepravy (zákazník)

## 2. Stream na organizacích

Stream je zapnutý na Account (Entity Manager → Account → Edit → Stream = ✅).

Manuálně přidané stream posty:
- **Skanska a.s.** – 4 přepravy (SH-2026-003, 006, 008, 024)
- **Českomoravský štěrk a.s.** – přehled přeprav (SH-2026-001, 002, 007 + souhrnné info)
- **STRABAG a.s.** – přepravy SH-2026-009, 015 + přehled

> Poznámka: Automatické stream posty při vytváření přeprav by vyžadovaly Formula/Workflow hook – v PoC nejsou nastaveny.

## 3. Detail přepravy (Shipment) – vazby na organizace

V detailu přepravy (např. SH-2026-003) jsou viditelné:
- **Zákazník** → link na Account (Skanska a.s.)
- **Místo nakládky** → link na Account (Lom Bílina s.r.o.)
- **Kontakt nakládky** → link na Contact
- **Místo vykládky** → link na Account (Skanska a.s.)
- **Kontakt vykládky** → link na Contact
- **Řidič** → link na HumanResource
- **Vozidlo** → link na Vehicle
- **Návěs** → link na Trailer
- **Šablona trasy** → link na RouteTemplate
- Stream s historií stavů
- Panel Dodací listy
- Panel Putovka

Kliknutím na jakýkoli link se přejde na detail dané entity.

## 4. Ověření na konkrétních organizacích

### Skanska a.s.
- **Záložka Doprava**: 6+ přeprav jako zákazník a vykládka
- **Nakládka**: žádné (správně – Skanska není lom)
- **Stream**: Viditelný s přehledem přeprav

### Českomoravský štěrk a.s.
- **Nakládka**: 18 přeprav (5 zobrazených + 13 více) – hlavní nakládkový bod
- **Vykládka**: 2 přepravy
- **Zákazník**: 3 přepravy
- **Stream**: Viditelný s přehledem

### Betonárka Třebíč
- **Nakládka**: žádné (správně)
- **Vykládka**: 10 přeprav (5+5) – hlavní místo vykládky
- **Zákazník**: 9 přeprav (5+4)

### Heidelberg Materials CZ s.r.o.
- **Nakládka**: žádné (lomy jsou separate orgs: Lom Mokra, Lom Bílina)
- **Vykládka**: 4 přepravy
- **Zákazník**: 4 přepravy

## 5. 360° pohled – co dispečer vidí

Když dispečer otevře organizaci:

| Sekce | Obsah |
|-------|-------|
| Přehled | Název, adresa, telefon, email, IČ, DIČ |
| Detaily | Typ (Zákazník/Dodavatel), průmysl, měna |
| Sidebar | Přiřazený uživatel, aktivity, historie, úkoly |
| Tab: Stream | Komentáře, stream posty o přepravách |
| Tab: Organizace | Kontakty, případy, dokumenty |
| Tab: Podpora | Události, produkty |
| Tab: **Doprava** | **Všechny přepravy – jako zákazník, nakládka, vykládka** |

## 6. Známé limitace / TODO

- [ ] Překlep v názvu panelu "nakádka" místo "nakládka" (pochází z definice linku `loadingOrganization` label)
- [ ] Automatické stream posty při vytvoření přepravy (vyžaduje Workflow/Formula)
- [ ] Dodací listy – vazba existuje (sub-panely "Přepravy > Dodací listy" v disabled), ale nejsou aktivní v layoutu
- [ ] Heidelberg Materials nemá přepravy jako nakládka – lomy (Mokra, Bílina) jsou separate entity
