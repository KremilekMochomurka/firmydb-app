#!/usr/bin/env python3
"""
ARES API Scraper - Official Czech Business Register
ARES = Administrative Register of Economic Subjects
"""

import requests
from typing import Dict, Optional
import json

class AresScraper:
    """Scrape company data from ARES public API"""
    
    BASE_URL = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty"
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'FirmyDB/1.0',
            'Accept': 'application/json'
        })
    
    def search_by_ico(self, ico: str) -> Optional[Dict]:
        """
        Search company by IČO using ARES API
        Returns comprehensive company data
        """
        try:
            # ARES API endpoint
            url = f"{self.BASE_URL}/{ico}"
            
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            # Extract relevant fields
            result = self._parse_ares_response(data)
            result['ico'] = ico
            result['source'] = 'ares'
            
            return result
            
        except Exception as e:
            print(f"Error scraping ICO {ico}: {e}")
            return None
    
    def _parse_ares_response(self, data: Dict) -> Dict:
        """Parse ARES API response"""
        result = {}
        
        try:
            # Obchodní jméno (business name)
            if 'obchodniJmeno' in data:
                result['name'] = data['obchodniJmeno']
            
            # IČO
            if 'ico' in data:
                result['ico'] = data['ico']
            
            # DIČ
            if 'dic' in data:
                result['dic'] = data['dic']
            
            # Právní forma
            if 'pravniForma' in data:
                result['legal_form'] = data['pravniForma']
            
            # Adresa
            if 'sidlo' in data:
                sidlo = data['sidlo']
                address_parts = []
                
                if 'nazevUlice' in sidlo:
                    address_parts.append(sidlo['nazevUlice'])
                if 'cisloDomovni' in sidlo:
                    address_parts.append(str(sidlo['cisloDomovni']))
                if 'nazevObce' in sidlo:
                    address_parts.append(sidlo['nazevObce'])
                if 'psc' in sidlo:
                    address_parts.append(str(sidlo['psc']))
                
                result['address'] = ', '.join(filter(None, address_parts))
                result['city'] = sidlo.get('nazevObce')
                result['zip'] = sidlo.get('psc')
            
            # Datum vzniku
            if 'datumVzniku' in data:
                result['founded_date'] = data['datumVzniku']
            
            # Stav
            if 'stavZdro je' in data:
                result['status'] = data['stavZdroje']
            
            # Ekonomické údaje
            if 'financniUrad' in data:
                result['tax_office'] = data['financniUrad']
            
            # Klasifikace ekonomických činností (NACE)
            if 'czNace' in data:
                result['nace_codes'] = data['czNace']
            
        except Exception as e:
            print(f"Error parsing ARES response: {e}")
        
        return result
    
    def search_batch(self, icos: list) -> list:
        """Search multiple companies by ICO"""
        results = []
        
        for ico in icos:
            result = self.search_by_ico(ico)
            if result:
                results.append(result)
        
        return results

if __name__ == "__main__":
    # Test
    scraper = AresScraper()
    
    test_ico = "27074358"  # Microsoft s.r.o.
    print(f"Testing ARES scraper with IČO: {test_ico}")
    
    result = scraper.search_by_ico(test_ico)
    
    if result:
        print("\n✅ Success!")
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print("\n❌ Failed")
