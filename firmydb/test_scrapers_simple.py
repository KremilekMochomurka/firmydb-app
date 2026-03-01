#!/usr/bin/env python3
"""Simple test for FirmyDB scrapers"""

from scraper_justice import JusticeScraper
import json

print("🚀 Testing Justice.cz Scraper")
print("=" * 50)

scraper = JusticeScraper()

# Test s Apertia Tech IČO
test_ico = "17165008"
print(f"\n🔍 Scraping IČO: {test_ico}")

result = scraper.search_by_ico(test_ico)

if result:
    print("\n✅ SUCCESS!")
    print(f"\n📊 Company Data:")
    print(json.dumps(result, indent=2, ensure_ascii=False))
else:
    print("\n❌ FAILED")
