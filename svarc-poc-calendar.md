# Švarc PoC – Kalendář přeprav pro řidiče

## Co bylo vytvořeno

Vytvořeno **13 Meeting záznamů** v EspoCRM kalendáři, mapujících přepravy na kalendářové záznamy řidičů.

### Dnešní přepravy (Pá 27.2.2026) – 5 záznamů:
| Přeprava | Řidič | Trasa | Čas | Materiál |
|----------|-------|-------|-----|----------|
| SH-2026-005 | Petr Svoboda | Mokrá-Horákov → Třebíč | 07:00–09:30 | Štěrk 0/32, 25.5t |
| SH-2026-004 | Oleksandr Kovalenko | Jakubov u Třebíče → Mokrá-Horákov | 08:00–10:30 | Kamenivo 0/63, 26t |
| SH-2026-028 | Tomáš Vlček | Mokrá-Horákov → Praha | 08:30–13:30 | Štěrk 16/32, 25t |
| SH-2026-029 | Vasyl Bondarenko | Mokrá-Horákov → Brno | 09:00–11:30 | Kamenivo 0/32, 24t |
| SH-2026-036 | Mykola Shevchenko | Mokrá-Horákov → Zlín | 14:00–17:00 | Štěrk 0/32, 26t |

### Zítřejší přepravy (So 28.2.2026) – 1 záznam:
| Přeprava | Řidič | Trasa | Čas | Materiál |
|----------|-------|-------|-----|----------|
| SH-2026-003 | Petr Svoboda | Bílina → Praha 8 | 10:00–15:00 | Písek stavební, 24t |

### Minulé přepravy (tento týden) – 7 záznamů:
| Přeprava | Řidič | Den | Trasa |
|----------|-------|-----|-------|
| SH-2026-023 | Vasyl Bondarenko | Út 24.2. | Mokrá-Horákov → Brno |
| SH-2026-024 | Petr Svoboda | Út 24.2. | Mokrá-Horákov → Praha 8 |
| SH-2026-025 | Oleksandr Kovalenko | St 25.2. | Jakubov u Třebíče → Brno |
| SH-2026-026 | Tomáš Vlček | St 25.2. | Olbramovice → Třebíč |
| SH-2026-007 | Petr Svoboda | St 25.2. | Jakubov u Třebíče → Mokrá-Horákov |
| SH-2026-027 | Roman Polášek | Čt 26.2. | Mokrá-Horákov → Beroun |
| SH-2026-006 | Oleksandr Kovalenko | Čt 26.2. | Bílina → Praha 8 |

## Konfigurace sdíleného kalendáře

Nastavena **Časová osa (Timeline)** v režimu **Sdílené** se všemi řidiči:
- Admin User
- Petr Svoboda
- Oleksandr Kovalenko
- Tomáš Vlček
- Roman Polášek
- Vasyl Bondarenko
- Mykola Shevchenko

## Jak to používat

1. Jít na **Kalendáře** v levém menu
2. Kliknout na **Časová osa** (vpravo nahoře)
3. Kliknout na **Sdílené** – zobrazí se Gantt-like pohled všech řidičů
4. Každý zelený blok = jedna přeprava s názvem "Přeprava SH-2026-XXX: [odkud] → [kam]"
5. Kliknutím na blok se zobrazí detail: materiál, váha, SPZ, kontakt

## Technické poznámky

- Záznamy vytvořeny jako **Meeting** entity přes EspoCRM API
- Každý Meeting má `assignedUserId` nastaven na příslušného řidiče
- Minulé Meetings mají status `Held`, dnešní/budoucí `Planned`
- Časy v UTC (EspoCRM interně), zobrazení v lokálním čase (CET/CEST)
- Popis meetingu obsahuje: materiál, váha, vozidlo, kontakt na nakládce
