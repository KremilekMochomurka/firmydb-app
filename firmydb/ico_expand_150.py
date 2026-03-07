#!/usr/bin/env python3
"""
Systematic search for Czech companies in ARES
Generate IČO range and search for active companies
"""

import requests
import json
from typing import List

class AresSystematicSearch:
    """Search ARES systematically"""
    
    BASE_URL = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty"
    
    def __init__(self):
        self.found_icos = set()
    
    def search_by_name_pattern(self, pattern: str, limit: int = 20) -> List[str]:
        """Search companies by name pattern"""
        icos = []
        
        try:
            # ARES has a search endpoint that accepts company name
            response = requests.get(
                f"{self.BASE_URL}/vyhledat",
                params={
                    'obchodniJmeno': pattern,
                    'limit': limit
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    for item in data:
                        if item.get('ico'):
                            icos.append(item['ico'])
                            print(f"  ✓ {item.get('obchodniJmeno', 'N/A')} ({item['ico']})")
                
        except Exception as e:
            print(f"  ❌ Error: {str(e)}")
        
        return icos
    
    def search_major_cities(self) -> List[str]:
        """Search for active companies in major Czech cities"""
        
        cities = [
            'Praha', 'Brno', 'Ostrava', 'Plzeň', 
            'Liberec', 'Olomouc', 'České Budějovice'
        ]
        
        icos = []
        
        for city in cities:
            print(f"\n🏙️  Searching {city}...")
            
            # Try common company name patterns
            patterns = [
                f"a.s.",
                f"s.r.o.",
                f"Ltd",
                f"Group"
            ]
            
            for pattern in patterns[:1]:  # Limit to first pattern to avoid rate limiting
                print(f"  Pattern: {pattern}")
                found = self.search_by_name_pattern(pattern, limit=5)
                icos.extend(found)
        
        return list(set(icos))

def main():
    """Main search"""
    
    print("🔍 Systematic ARES Search")
    print("=" * 60)
    
    searcher = AresSystematicSearch()
    icos = searcher.search_major_cities()
    
    print("\n" + "=" * 60)
    print(f"Found {len(icos)} unique IČO numbers")
    
    # Save to file
    with open('ico_expansion.txt', 'w') as f:
        for ico in sorted(icos):
            f.write(f"{ico}\n")
    
    print(f"Saved to ico_expansion.txt")

if __name__ == "__main__":
    main()
