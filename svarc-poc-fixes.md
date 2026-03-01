# Švarc PoC - Dashboard Fixes (2026-02-27)

## Problém 1: Dva list reporty padaly s 500 Internal Server Error

### Reporty:
- `69a1c900bfa2f9c48` — "Aktivní přepravy" (List report, entity: Shipment)
- `69a1c909aaf0e1554` — "Poslední dokončené přepravy" (List report, entity: Shipment)

### Příčina:
Report `runList` action hází 500 na **všechny** List reporty (ne jen tyto dva). Ověřeno vytvořením testovacího List reportu pro Account i Shipment — oba padají se 500. Jedná se o **systémovou chybu v Advanced Pack modulu** (Report → runList endpoint), pravděpodobně bug nebo problém s licencí/konfigurací.

Grid/Chart reporty (type: Grid s displayType: Chart) fungují normálně.

### Původní chyby v reportech (opraveny, ale nefunkční kvůli systémové chybě):
- Report 1 používal neexistující sloupce: `account` → opraveno na `customer`, `loadingPlace` → `loadingOrganization`, `unloadingPlace` → `unloadingOrganization`
- Report 2 měl stejný problém se sloupcem `account` → opraveno na `customer`

### Řešení:
- **Odstraněny oba List report dashlety z dashboardu** (dashlet IDs: `d498868`, `d781783`) přes API úpravou user preferences
- Reporty samotné ponechány v systému (jsou opraveny co se týče sloupců, ale runList endpoint stále padá)
- **K plnému vyřešení je potřeba opravit Advanced Pack modul na serveru** (reinstall/update Advanced Pack, nebo check PHP error logu)

## Problém 2: 404 na assety

### Chybějící soubory:
- `client/modules/autocrm-themes/css/themes/dashlet-resize-handle-SQP5FT2N.svg`
- `client/modules/autocrm-themes/css/themes/dashlet-drag-handle-FA2FZCRC.svg`
- `client/modules/project-management/css/bundled.min.css`

### Co bylo provedeno:
1. ✅ **Administration → Rebuild** (API: POST /api/v1/Admin/rebuild) — úspěšné
2. ✅ **Administration → Clear Cache** (API: POST /api/v1/Admin/clearCache) — úspěšné

### Výsledek:
- Rebuild a Clear Cache **neopravily** chybějící SVG a CSS soubory
- Tyto soubory pravděpodobně chybí v instalaci modulů (autocrm-themes, project-management)
- **Dopad je čistě kosmetický** — SVG jsou ikony pro drag/resize handle dashletů, CSS je pro project-management modul
- Dashboard funguje vizuálně korektně i bez těchto souborů

### Doporučení pro server admina:
- Reinstalovat/aktualizovat modul `autocrm-themes` (chybí SVG assety)
- Reinstalovat/aktualizovat modul `project-management` (chybí bundled.min.css)
- Zkontrolovat Advanced Pack instalaci a PHP error log pro diagnostiku `runList` 500 erroru

## Stav dashboardu po opravě:
- ✅ Dashboard zobrazuje 6 Chart/Grid reportů bez chyb
- ✅ Žádné 500 errory v konzoli z dashboard requestů
- ⚠️ 3x 404 na kosmetické assety (SVG ikony dashlet handles + PM CSS) — nefunkční vliv minimální
- ✅ Připraven pro prezentaci zákazníkovi
