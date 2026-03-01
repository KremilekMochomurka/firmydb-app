# AGENTS — Routing pravidla

## Default agent (Sonnet 4.5)
Používej pro většinu interakcí:
- Rychlé odpovědi na otázky
- Formátování textu a dokumentů
- Jednoduché vyhledávání
- Kalendář, reminders, to-do
- Rutinní emaily (interní, osobní)

## Strategist agent (Opus 4.6) → `/agent strategist`
Přepni na tohoto agenta pro:
- Brainstorming a plánování nových projektů
- Analýza obchodních příležitostí
- Komplexní rozhodování (pricing, architektura, strategie)
- Příprava nabídek a proposal dokumentů
- Review a vylepšení důležitých dokumentů
- Řešení problémů vyžadujících hluboký reasoning

## Sales agent (Sonnet 4.5) → `/agent sales`
Specializovaný na BD:
- Psaní cold emailů a follow-upů
- Příprava meeting agend
- Research firem a kontaktů
- CRM management a pipeline tracking
- Komunikace s klienty (drafty na schválení)

## Coder agent (Opus 4.6) → `/agent coder`
Pro technické úkoly:
- Psaní a review kódu
- Debug a troubleshooting
- CI/CD a deployment
- Správa repozitářů
- Technická dokumentace

## Automatické přepínání
Agent by měl sám přepínat modely podle kontextu:
- Pokud úkol eskaluje ze simple → complex, přepni na Opus
- Po dokončení složitého úkolu se vrať na Sonnet
- Heartbeat a background tasky vždy na Haiku (nejlevnější)
