#!/usr/bin/env python3
"""
Firmy.cz Scraper - Czech Business Directory
Scrapes contact info (email, phone, website) from firmy.cz
"""

import requests
from bs4 import BeautifulSoup
import json
import time
from typing import Dict, Optional
import re

class FirmyCzScraper:
    """Scrape company contact data from firmy.cz"""
    
    BASE_URL = "https://www.firmy.cz"
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def search_by_ico(self, ico: str) -> Optional[Dict]:
        """
        Search company by IČO
        Returns contact info
        """
        search_url = f"{self.BASE_URL}/detail/{ico}"
        
        try:
            response = self.session.get(search_url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract contact data
            data = {
                'ico': ico,
                'email': self._extract_email(soup),
                'phone': self._extract_phone(soup),
                'website': self._extract_website(soup),
                'description': self._extract_description(soup),
                'industry': self._extract_industry(soup),
            }
            
            return data
            
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                print(f"Company {ico} not found on firmy.cz")
            else:
                print(f"HTTP error for {ico}: {e}")
            return None
        except Exception as e:
            print(f"Error scraping {ico} from firmy.cz: {e}")
            return None
    
    def _extract_email(self, soup) -> Optional[str]:
        """Extract email address"""
        try:
            # Look for email in contact section
            email_elem = soup.find('a', href=re.compile(r'^mailto:'))
            if email_elem:
                email = email_elem['href'].replace('mailto:', '')
                return email.strip()
            
            # Fallback: search for email pattern in text
            text = soup.get_text()
            email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
            match = re.search(email_pattern, text)
            if match:
                return match.group(0)
        except:
            pass
        return None
    
    def _extract_phone(self, soup) -> Optional[str]:
        """Extract phone number"""
        try:
            # Look for phone in contact section
            phone_elem = soup.find('a', href=re.compile(r'^tel:'))
            if phone_elem:
                phone = phone_elem['href'].replace('tel:', '')
                return self._normalize_phone(phone)
            
            # Fallback: search for Czech phone pattern
            text = soup.get_text()
            phone_patterns = [
                r'\+420\s?\d{3}\s?\d{3}\s?\d{3}',  # +420 XXX XXX XXX
                r'\d{3}\s?\d{3}\s?\d{3}',          # XXX XXX XXX
                r'\+420\d{9}',                     # +420XXXXXXXXX
            ]
            
            for pattern in phone_patterns:
                match = re.search(pattern, text)
                if match:
                    return self._normalize_phone(match.group(0))
        except:
            pass
        return None
    
    def _normalize_phone(self, phone: str) -> str:
        """Normalize phone number to +420XXXXXXXXX format"""
        # Remove spaces and non-digits
        digits = re.sub(r'\D', '', phone)
        
        # Add +420 prefix if missing
        if digits.startswith('420'):
            return f"+{digits}"
        elif len(digits) == 9:
            return f"+420{digits}"
        else:
            return phone  # Return as-is if can't normalize
    
    def _extract_website(self, soup) -> Optional[str]:
        """Extract website URL"""
        try:
            # Look for website link
            website_elem = soup.find('a', {'class': re.compile(r'web|website', re.IGNORECASE)})
            if website_elem and website_elem.get('href'):
                url = website_elem['href']
                # Clean up URL
                if url.startswith('http'):
                    return url
                else:
                    return f"https://{url}"
        except:
            pass
        return None
    
    def _extract_description(self, soup) -> Optional[str]:
        """Extract company description"""
        try:
            # Look for description section
            desc_elem = soup.find('div', {'class': re.compile(r'description|popis', re.IGNORECASE)})
            if desc_elem:
                return desc_elem.get_text().strip()
        except:
            pass
        return None
    
    def _extract_industry(self, soup) -> Optional[str]:
        """Extract industry/category"""
        try:
            # Look for category/obor section
            category_elem = soup.find('span', string=re.compile(r'Kategorie|Obor', re.IGNORECASE))
            if category_elem:
                value = category_elem.find_next_sibling()
                if value:
                    return value.get_text().strip()
        except:
            pass
        return None
    
    def batch_search(self, ico_list: list) -> list:
        """
        Search multiple companies by IČO
        Returns list of contact data
        """
        results = []
        
        for ico in ico_list:
            print(f"Scraping firmy.cz for ICO: {ico}")
            data = self.search_by_ico(ico)
            
            if data:
                results.append(data)
            
            # Rate limiting
            time.sleep(1.5)
        
        return results


if __name__ == "__main__":
    # Test
    scraper = FirmyCzScraper()
    
    test_icos = [
        "27082440",
        "45274924",
    ]
    
    results = scraper.batch_search(test_icos)
    
    print(json.dumps(results, indent=2, ensure_ascii=False))
