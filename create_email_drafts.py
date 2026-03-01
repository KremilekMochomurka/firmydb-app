#!/usr/bin/env python3
"""
Vytvoří 10 email konceptů v CRM pro první leady
"""
import time
from playwright.sync_api import sync_playwright

# CRM credentials
CRM_URL = "https://crm.apertia.cz"
USERNAME = "borek.vanek"
PASSWORD = "82rmdvgB0O"

# Seznam prvních 10 leadů (z předchozího summary)
LEADS = [
    {
        "name": "Ing. Michal Bican",
        "company": "FLY s.r.o.",
        "email": "michal.bican@flyunited.cz",
        "website": "www.flyunited.cz",
        "industry": "Cestovní služby",
        "detail": "850+ korporátních klientů, 30 let zkušeností"
    },
    {
        "name": "Ing. Jakub Frič",
        "company": "PET klub / VOMEX",
        "email": "",  # Najdeme v CRM
        "phone": "777 188 003",
        "industry": "Obecné"
    },
    {
        "name": "Robert Burda",
        "company": "Internetový",
        "email": "",
        "industry": "IT/Internet"
    },
    {
        "name": "Ivan Málek",
        "company": "",
        "email": "",
        "phone": "+420 519 325 708",
        "industry": "Obecné"
    },
    {
        "name": "Jan Holata",
        "company": "VOMEX",
        "email": "",
        "phone": "777 188 003",
        "industry": "Obecné"
    },
    {
        "name": "Kamil Soldi",
        "company": "C&bel s.r.o.",
        "email": "",
        "phone": "775 133 313",
        "industry": "Obecné"
    },
    {
        "name": "Miroslav Hořák",
        "company": "CRM",
        "email": "",
        "industry": "IT/CRM"
    },
    {
        "name": "Jan Kubík",
        "company": "ZONOFF",
        "email": "",
        "phone": "724401286",
        "industry": "Obecné"
    },
    {
        "name": "Bc. Jiří Bureš",
        "company": "STAR s.r.o.",
        "email": "",
        "phone": "604 224 264",
        "industry": "Obecné"
    },
    {
        "name": "Ing. Miloslav Sochór",
        "company": "ČONKÁV Auto korp. s.r.o.",
        "email": "",
        "phone": "724 158 142",
        "industry": "Automotive"
    }
]


def generate_email_subject(lead):
    """Generuje předmět emailu na základě leadu"""
    if "cestovní" in lead.get("industry", "").lower():
        return f"Otázka k CRM - {lead['company']}"
    elif lead.get("company"):
        return f"Re: {lead['company']}"
    else:
        return "Otázka k vašemu CRM systému"


def generate_email_body(lead):
    """Generuje tělo emailu personalizované pro lead"""
    name_part = lead['name'].split()[-1]  # Příjmení
    
    # Varianta A - problem-first
    if "cestovní" in lead.get("industry", "").lower():
        return f"""Pane {name_part},

když má váš tým urgentní dotaz od klienta, jak rychle najde historii rezervací a preferencí?

Ptám se, protože řešíme situace, kdy cestovní agentury potřebují:
→ Okamžitý přístup k datům klienta (i v noci/víkendy)
→ Automatické follow-upy bez manuální práce
→ AI asistenta, který odpovídá na opakující se dotazy

Pokud tohle řešíte, rád vám ukážu jak to máme nastavené u podobných agentur.

15 minut?

Bořek Vaněk
Business Development Manager
Apertia Tech s.r.o.
+420 704 166 936"""
    
    # Varianta B - hodnota + case study
    elif "automotive" in lead.get("industry", "").lower() or "auto" in lead.get("company", "").lower():
        return f"""Pane {name_part},

v automobilovém byznysu záleží na rychlosti reakce – klient neřeší jestli je pátek večer nebo pondělní ráno.

Pomáháme firmám v automotive udržet přehled o zákaznících bez manuální práce:
→ Automatické follow-upy po servisu/prodeji
→ AI asistent na dotazy mimo pracovní dobu
→ Propojení s fakturačními systémy

Jeden z našich klientů tím ušetřil 12 hodin týdně a zvýšil spokojenost zákazníků o 30%.

Stojí za to si o tom popovídat?

Bořek Vaněk
+420 704 166 936
Apertia Tech"""
    
    # Varianta C - obecná (default)
    else:
        return f"""Pane {name_part},

kolik času váš tým stráví ručním vyplňováním CRM, hledáním informací o klientech a posíláním follow-upů?

Pomáháme firmám automatizovat tyto procesy:
→ Žádné poplatky za uživatele
→ AI asistent na rutinní úkoly
→ Napojení na Pohodu, fakturační systémy, emaily

Výsledek: týmy šetří 10-15 hodin týdně, nic se neztratí, klienti dostávají rychlejší odpovědi.

Zajímá vás jak to funguje? (15 min demo)

Bořek Vaněk
Business Development Manager
Apertia Tech s.r.o.
+420 704 166 936"""


def main():
    with sync_playwright() as p:
        # Spustit Brave browser
        browser = p.chromium.launch(
            headless=False,
            executable_path="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
        )
        
        context = browser.new_context()
        page = context.new_page()
        
        # Přihlásit se do CRM
        print("Přihlašuji se do CRM...")
        page.goto(CRM_URL)
        time.sleep(2)
        
        # Najít login formulář a přihlásit se
        page.fill('input[name="username"]', USERNAME)
        page.fill('input[name="password"]', PASSWORD)
        page.click('button[type="submit"]')
        time.sleep(3)
        
        # Pro každý lead vytvořit email draft
        for i, lead in enumerate(LEADS, 1):
            print(f"Vytvářím koncept {i}/10 pro {lead['name']}...")
            
            # Otevřít nový email draft
            page.goto(f"{CRM_URL}/#Email/create")
            time.sleep(2)
            
            # Vyplnit email
            subject = generate_email_subject(lead)
            body = generate_email_body(lead)
            
            # Vyplnit příjemce (pokud máme email)
            if lead.get('email'):
                page.fill('input[name="to"]', lead['email'])
            
            # Vyplnit předmět
            page.fill('input[name="subject"]', subject)
            
            # Vyplnit tělo emailu
            page.fill('textarea[name="body"]', body)
            
            # Uložit jako koncept (neklikáme Send, jen Save)
            page.click('button[data-action="save"]')
            time.sleep(1)
            
            print(f"✓ Koncept {i}/10 vytvořen")
        
        print("\n✓ Všech 10 konceptů vytvořeno!")
        print(f"Otevírám složku drafts: {CRM_URL}/#Email/list/folder=drafts")
        page.goto(f"{CRM_URL}/#Email/list/folder=drafts")
        time.sleep(5)
        
        # Nechat browser otevřený pro kontrolu
        input("\nKoncepty vytvořeny. Stiskni Enter pro zavření browseru...")
        
        browser.close()


if __name__ == "__main__":
    main()
