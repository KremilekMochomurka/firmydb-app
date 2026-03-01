# ŠVARC POC - Finální úpravy kalendáře a dispečerů

**Datum:** 2026-02-27
**Systém:** EspoCRM v9.1.7 na https://pocsvarc.deverp.cz

---

## 1. ✅ Admin User odebrán ze sdíleného kalendáře

- **Admin User** přejmenován na **"Dispečink ŠVARC"** (Administration → Users)
- Odebrán ze sdíleného kalendáře v Časové ose (ikona tužky → odebráno)
- V kalendáři zůstává pouze 6 řidičů

## 2. ✅ Řidiči rozděleni pod dispečery

### Tým "Dispečer Novák" (Jan Novák, username: novak)
| Řidič | Username | User ID |
|-------|----------|---------|
| Petr Svoboda | ridic1 | 3624343bc517314c9 |
| Tomáš Vlček | vlcek | 69a1bb55e791c3194 |
| Vasyl Bondarenko | bondarenko | 69a1bb57d921d2a53 |

### Tým "Dispečer Horáková" (Marie Horáková, username: horakova)
| Řidič | Username | User ID |
|-------|----------|---------|
| Oleksandr Kovalenko | ridic2 | e1c151a12c3b7ab4e |
| Roman Polášek | polasek | 69a1bb56dbc3e62ed |
| Mykola Shevchenko | shevchenko | 69a1bd7ab1318ed5f |

### Implementováno:
- **Týmy v EspoCRM:** Vytvořeny týmy "Dispečer Novák" (id: 69a2103494ecc2186) a "Dispečer Horáková" (id: 69a210354fad96404)
- **Uživatelé přiřazeni do týmů:** Dispečer + jeho 3 řidiči v každém týmu
- **Meetings:** Každá jízda (Meeting) má jako `assignedUser` řidiče a jako attendee příslušného dispečera - toto bylo již správně nastaveno
- **HumanResource:** 6 HR záznamů existuje s vazbou na User accounts
- **Duplicitní účet** dispecer2 (Marie Horáková) **deaktivován** - aktivní zůstává účet `horakova`

## 3. ✅ Kalendář vyčištěn

- **Odstraněny staré testovací záznamy:** MTG-001 až MTG-005 (ze září 2025)
- **Záznamy mají smysluplné názvy:** Formát 🚛 trasa | materiál (např. "🚛 Mokrá → Třebíč | Štěrk 0/32")
- **Časy jízd:** Většina začíná od 5:00-6:00, což odpovídá reálnému provozu nákladní dopravy
- **587 celkových záznamů** (po vyčištění 582)

## 4. ✅ Sdílené kalendáře nastaveny pro dispečery

- **Jan Novák (novak):** Sdílený kalendář nastaven s řidiči Petr Svoboda, Tomáš Vlček, Vasyl Bondarenko
- **Marie Horáková (horakova):** Sdílený kalendář nastaven s řidiči Oleksandr Kovalenko, Roman Polášek, Mykola Shevchenko
- **Admin (Dispečink ŠVARC):** Sdílený kalendář zobrazuje všech 6 řidičů

## 5. Screenshots

### Časová osa se všemi řidiči
![Timeline](/Users/bory/.openclaw/media/browser/b1d4955c-7c56-479d-b1e6-a6504154a8d9.jpg)

### Detail organizace (Heidelberg Materials CZ s.r.o.)
![Organizace](/Users/bory/.openclaw/media/browser/847017ac-1375-4527-83bb-93ea78840caa.jpg)

### Dashboard s grafy a přepravami
![Dashboard](/Users/bory/.openclaw/media/browser/5650f405-5984-4ac9-b260-c2999d3f5d76.jpg)

---

## Poznámky

- Heslo pro všechny uživatele: `Svarc2026!` (ověřit - API auth nefungoval pro novak, ale přihlášení přes browser by mělo fungovat)
- EspoCRM auth používá localStorage pro token, ne cookies
- Admin API endpoint `PUT /api/v1/Preferences/{userId}` funguje pro nastavení preferencí ostatních uživatelů
