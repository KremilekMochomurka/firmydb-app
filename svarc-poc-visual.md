# Služby ŠVARC s.r.o. - PoC Visual Improvements

## 1. Logo
- **SVG logo** vytvořeno: `/Users/bory/.openclaw/workspace/svarc-logo.svg`
  - Text "Služby ŠVARC" + "s.r.o." + tagline "PŘEPRAVA · LOGISTIKA · STAVEBNICTVÍ"
  - Ikona sklápěče/nákladního auta
  - Barvy: tmavě modrá (#1a3a5c) + oranžová (#e87722)
- **PNG verze**: `svarc-logo.png` (plné rozlišení) + `svarc-logo-small.png` (200px)
- **Nahráno do EspoCRM** jako Company Logo (attachment ID: `69a20602c0ca98d09`)
  - Generováno programově přes Canvas API (kvůli omezením file upload)
  - Nastaveno přes Settings API: `companyLogoId`

## 2. Kalendářové záznamy
- **Vytvořeno ~126 nových meetings** (18 per den × 7 dní)
  - Pokrytí: 23.2. - 27.2.2026 (tento týden) + 2.3. - 6.3.2026 (příští týden)
  - 6 řidičů × 2-3 jízdy denně
  - **Celkem v systému: 587 meetings** (včetně původních)
- **Formát názvů**: `🚛 Mokrá → Třebíč | Štěrk 0/32`
- **Realistické trasy**:
  - Mokrá ↔ Třebíč (štěrk, prázdný zpět)
  - Mokrá ↔ Brno (písek)
  - Mokrá → Praha (kamenivo)
  - Mokrá ↔ Zlín (štěrkopísek)
  - Mokrá ↔ Jihlava (štěrk 0/63)
  - Mokrá ↔ Olomouc (drť 0/32)
  - Mokrá ↔ Vyškov (makadam)
  - Bílina → Praha (uhlí)
  - Jakubov → Mokrá (zemina)
- **Řidiči**: Petr Svoboda, Oleksandr Kovalenko, Roman Polášek, Vasyl Bondarenko, Mykola Shevchenko, Tomáš Vlček

## 3. Vizuální vylepšení

### Aktuální stav
- **Téma**: AutoERP (tmavé sidebar s modrozeleným gradientem)
- **Dashboard**: Funguje skvěle s report widgety:
  - Přepravy podle tonáže zákazníka (horizontální bar chart)
  - Tuny materiálu podle typu (vertikální bar chart)  
  - Přepravy podle zákazníka (oranžový bar chart)
  - Přepravy podle řidiče (fialový horizontální bar chart)
  - Přepravy podle stavu (pie chart s barvami)
  - Přepravy za den - 14 dní (modrý timeline chart)
  - Poslední dokončené přepravy + Aktivní přepravy (seznamy)
- **Barevné stavy přeprav**: Viditelné v dashboard widgetech
  - Dokončena = zelená
  - Na cestě = fialová  
  - Naložena = oranžová
  - Přiřazena = červená
  - Nová = modrá

### Custom CSS (injektováno přes JS, nelze uložit bez SSH přístupu)
```css
/* Firemní barvy v headeru */
.navbar { background: linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%) !important; }

/* Výraznější stavy přeprav */
.badge.bg-info { background-color: #2196F3 !important; }
.badge.bg-warning { background-color: #e87722 !important; }
.badge.bg-success { background-color: #4CAF50 !important; }
.badge.bg-danger { background-color: #f44336 !important; }

/* Lepší hover efekt v tabulkách */
tr:hover td { background-color: #f0f7ff !important; }
```

### Doporučení pro trvalé CSS změny
Pro trvalé custom CSS je potřeba SSH přístup na server:
1. Vytvořit soubor `client/custom/css/custom.css`
2. Přidat do `client/custom/modules/custom/res/templates/login.tpl` pro login stránku
3. Nebo použít metadata: `custom/Espo/Custom/Resources/metadata/app/client.json`:
   ```json
   {"cssList": ["client/custom/css/custom.css"]}
   ```

## Shrnutí
| Úkol | Status |
|------|--------|
| Logo SVG/PNG | ✅ Vytvořeno |
| Logo v EspoCRM | ✅ Nahráno a nastaveno |
| Kalendářové záznamy | ✅ 126+ nových (celkem 587) |
| Dashboard vizualizace | ✅ Funguje s grafy a barvami |
| Custom CSS | ⚠️ Injektováno (vyžaduje SSH pro trvalost) |
