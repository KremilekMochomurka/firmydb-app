#!/usr/bin/env python3
"""
Test script pro FirmyDB scrapery
"""

from scraper_justice import JusticeScraper
from scraper_firmycz import FirmyCzScraper
import json

def test_justice_scraper():
    """Test justice.cz scraperu"""
    print("\n" + "="*50)
    print("TEST: Justice.cz Scraper")
    print("="*50)
    
    scraper = JusticeScraper()
    
    # Test IČO: Apertia Tech s.r.o.
    test_ico = "17165008"
    
    print(f"\nScraping IČO: {test_ico}")
    result = scraper.scrape_company(test_ico)
    
    if result:
        print("\n✅ Scraping úspěšný!")
        print(f"\nNázev: {result.get('name')}")
        print(f"IČO: {result.get('ico')}")
        print(f"DIČ: {result.get('dic')}")
        print(f"Adresa: {result.get('address')}")
        print(f"Právní forma: {result.get('legal_form')}")
        print(f"Stav: {result.get('status')}")
        print(f"Datum vzniku: {result.get('founded_date')}")
        
        print("\n📊 Kompletní data:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print("\n❌ Scraping selhal!")
    
    return result

def test_firmycz_scraper():
    """Test firmy.cz scraperu"""
    print("\n" + "="*50)
    print("TEST: Firmy.cz Scraper")
    print("="*50)
    
    scraper = FirmyCzScraper()
    
    # Test IČO: Apertia Tech s.r.o.
    test_ico = "17165008"
    
    print(f"\nScraping IČO: {test_ico}")
    result = scraper.scrape_company(test_ico)
    
    if result:
        print("\n✅ Scraping úspěšný!")
        print(f"\nEmail: {result.get('email')}")
        print(f"Telefon: {result.get('phone')}")
        print(f"Web: {result.get('website')}")
        print(f"Kategorie: {result.get('category')}")
        
        print("\n📊 Kompletní data:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print("\n❌ Scraping selhal!")
    
    return result

def test_batch_scraping():
    """Test dávkového scrapingu"""
    print("\n" + "="*50)
    print("TEST: Batch Scraping (10 firem)")
    print("="*50)
    
    # Sample IČO českých firem
    test_icos = [
        "17165008",  # Apertia Tech
        "25672720",  # Seznam.cz
        "27082440",  # Alza.cz
        "26475061",  # Mall Group
        "24729035",  # Rohlík.cz
    ]
    
    justice_scraper = JusticeScraper()
    firmy_scraper = FirmyCzScraper()
    
    results = []
    
    for ico in test_icos[:5]:  # Test prvních 5
        print(f"\n🔍 Scraping IČO: {ico}")
        
        # Justice.cz data
        justice_data = justice_scraper.scrape_company(ico)
        
        # Firmy.cz data
        firmy_data = firmy_scraper.scrape_company(ico)
        
        # Merge results
        combined = {
            "ico": ico,
            "justice_data": justice_data,
            "firmy_data": firmy_data,
            "has_justice": justice_data is not None,
            "has_firmy": firmy_data is not None,
        }
        
        results.append(combined)
        
        if justice_data:
            print(f"  ✓ Justice.cz: {justice_data.get('name')}")
        else:
            print(f"  ✗ Justice.cz: CHYBA")
            
        if firmy_data:
            print(f"  ✓ Firmy.cz: {firmy_data.get('email', 'N/A')}")
        else:
            print(f"  ✗ Firmy.cz: CHYBA")
    
    # Summary
    print("\n" + "="*50)
    print("SUMMARY")
    print("="*50)
    print(f"Celkem testováno: {len(results)}")
    print(f"Justice.cz úspěšných: {sum(1 for r in results if r['has_justice'])}")
    print(f"Firmy.cz úspěšných: {sum(1 for r in results if r['has_firmy'])}")
    
    return results

if __name__ == "__main__":
    print("🚀 FirmyDB Scraper Tests")
    print("=" * 50)
    
    # Run tests
    test_justice_scraper()
    test_firmycz_scraper()
    test_batch_scraping()
    
    print("\n✅ Všechny testy dokončeny!")
