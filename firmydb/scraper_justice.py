#!/usr/bin/env python3
"""
Justice.cz Scraper - Czech Company Registry
Scrapes basic company info from official government registry
"""

import requests
from bs4 import BeautifulSoup
import json
import time
from typing import Dict, Optional
import re

class JusticeScraper:
    """Scrape company data from justice.cz"""
    
    BASE_URL = "https://or.justice.cz/ias/ui/rejstrik-$firm"
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def search_by_ico(self, ico: str) -> Optional[Dict]:
        """
        Search company by IČO (company ID)
        Returns company basic info
        """
        search_url = f"{self.BASE_URL}?ico={ico}"
        
        try:
            response = self.session.get(search_url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract company data
            data = {
                'ico': ico,
                'name': self._extract_name(soup),
                'legal_form': self._extract_legal_form(soup),
                'address': self._extract_address(soup),
                'founded_year': self._extract_founded_year(soup),
                'status': self._extract_status(soup),
            }
            
            return data
            
        except Exception as e:
            print(f"Error scraping ICO {ico}: {e}")
            return None
    
    def _extract_name(self, soup) -> Optional[str]:
        """Extract company name"""
        try:
            name_elem = soup.find('span', {'class': 'commonContentSubText'})
            if name_elem:
                return name_elem.text.strip()
        except:
            pass
        return None
    
    def _extract_legal_form(self, soup) -> Optional[str]:
        """Extract legal form (s.r.o., a.s., etc.)"""
        try:
            # Legal form is usually part of name or separate field
            name = self._extract_name(soup)
            if name:
                # Extract s.r.o., a.s., etc. from name
                match = re.search(r'\b(s\.r\.o\.|a\.s\.|v\.o\.s\.|k\.s\.)\b', name, re.IGNORECASE)
                if match:
                    return match.group(1).lower()
        except:
            pass
        return None
    
    def _extract_address(self, soup) -> Optional[Dict]:
        """Extract company address"""
        try:
            # Address is in specific section
            address_section = soup.find('div', string=re.compile('Sídlo'))
            if address_section:
                address_text = address_section.find_next('div').text.strip()
                
                # Parse address
                parts = address_text.split(',')
                return {
                    'full': address_text,
                    'street': parts[0].strip() if len(parts) > 0 else None,
                    'city': parts[1].strip() if len(parts) > 1 else None,
                    'postal_code': parts[2].strip() if len(parts) > 2 else None,
                }
        except:
            pass
        return None
    
    def _extract_founded_year(self, soup) -> Optional[int]:
        """Extract founding year"""
        try:
            # Look for founding date
            date_section = soup.find('div', string=re.compile('Datum vzniku'))
            if date_section:
                date_text = date_section.find_next('div').text.strip()
                # Extract year from date (format: DD.MM.YYYY)
                match = re.search(r'\d{4}', date_text)
                if match:
                    return int(match.group(0))
        except:
            pass
        return None
    
    def _extract_status(self, soup) -> str:
        """Extract company status (active, liquidation, bankrupt)"""
        try:
            # Check for status indicators
            text = soup.get_text().lower()
            if 'likvidace' in text:
                return 'liquidation'
            elif 'konkurs' in text or 'insolvence' in text:
                return 'bankrupt'
            else:
                return 'active'
        except:
            pass
        return 'unknown'
    
    def batch_search(self, ico_list: list) -> list:
        """
        Search multiple companies by IČO
        Returns list of company data
        """
        results = []
        
        for ico in ico_list:
            print(f"Scraping ICO: {ico}")
            data = self.search_by_ico(ico)
            
            if data:
                results.append(data)
            
            # Rate limiting - be nice to justice.cz
            time.sleep(2)
        
        return results


if __name__ == "__main__":
    # Test with some real Czech companies
    scraper = JusticeScraper()
    
    # Test ICO (example companies)
    test_icos = [
        "27082440",  # Example ICO
        "45274924",  # Example ICO
    ]
    
    results = scraper.batch_search(test_icos)
    
    print(json.dumps(results, indent=2, ensure_ascii=False))
