#!/usr/bin/env python3
"""
FirmyDB Batch Scraper
Combines ARES API + optional Firmy.cz for complete company profiles
"""

from scraper_ares import AresScraper
from scraper_firmycz import FirmyCzScraper
import json
import csv
from typing import List, Dict
import time

class BatchScraper:
    """Batch scrape and enrich company data"""
    
    def __init__(self):
        self.ares = AresScraper()
        self.firmycz = FirmyCzScraper()
    
    def scrape_companies(self, icos: List[str], delay: float = 0.5) -> List[Dict]:
        """
        Scrape multiple companies by IČO
        
        Args:
            icos: List of IČO numbers
            delay: Delay between requests (seconds) to avoid rate limiting
        
        Returns:
            List of company data dicts
        """
        results = []
        
        for i, ico in enumerate(icos):
            print(f"\n[{i+1}/{len(icos)}] Scraping IČO: {ico}")
            
            # Get ARES data (primary source)
            ares_data = self.ares.search_by_ico(ico)
            
            if not ares_data:
                print(f"  ⚠️  Not found in ARES, skipping...")
                continue
            
            print(f"  ✓ ARES: {ares_data.get('name', 'N/A')}")
            
            # Try to enrich with Firmy.cz (optional)
            firmycz_data = self.firmycz.search_by_ico(ico)
            
            if firmycz_data:
                print(f"  ✓ Firmy.cz: {firmycz_data.get('email', 'no email')}")
            
            # Merge data
            company = self._merge_data(ares_data, firmycz_data)
            company['quality_score'] = self._calculate_quality_score(company)
            
            results.append(company)
            
            # Rate limiting
            if i < len(icos) - 1:
                time.sleep(delay)
        
        return results
    
    def _merge_data(self, ares: Dict, firmycz: Dict = None) -> Dict:
        """Merge data from multiple sources"""
        merged = ares.copy()
        
        if firmycz:
            # Add contact info from firmy.cz
            merged['email'] = firmycz.get('email')
            merged['phone'] = firmycz.get('phone')
            merged['website'] = firmycz.get('website')
            merged['description'] = firmycz.get('description')
            merged['industry'] = firmycz.get('industry')
        
        return merged
    
    def _calculate_quality_score(self, company: Dict) -> int:
        """
        Calculate data quality score (0-100)
        
        Scoring:
        - Has name: +20
        - Has address: +15
        - Has email: +20
        - Has phone: +15
        - Has website: +10
        - Has founded_date: +10
        - Has NACE codes: +10
        """
        score = 0
        
        if company.get('name'):
            score += 20
        
        if company.get('address'):
            score += 15
        
        if company.get('email'):
            score += 20
        
        if company.get('phone'):
            score += 15
        
        if company.get('website'):
            score += 10
        
        if company.get('founded_date'):
            score += 10
        
        if company.get('nace_codes'):
            score += 10
        
        return score
    
    def export_csv(self, companies: List[Dict], filename: str):
        """Export companies to CSV"""
        if not companies:
            print("No data to export")
            return
        
        # Define CSV columns
        columns = [
            'ico', 'name', 'legal_form', 'address', 'city', 'zip',
            'email', 'phone', 'website', 'founded_date', 'status',
            'quality_score', 'source'
        ]
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=columns, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(companies)
        
        print(f"\n✅ Exported {len(companies)} companies to {filename}")
    
    def export_json(self, companies: List[Dict], filename: str):
        """Export companies to JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(companies, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Exported {len(companies)} companies to {filename}")

def main():
    """Demo: Scrape top Czech companies"""
    
    # Top 50 Czech companies by IČO (sample)
    top_icos = [
        '27082440',  # Alza.cz
        '25672720',  # Seznam.cz (actually MONETA)
        '60193336',  # ČEZ
        '45274649',  # Škoda Auto
        '00177041',  # Budějovický Budvar
        '48025623',  # Pilsner Urquell
        '27074358',  # Asseco CE
        '00001279',  # Česká pošta
        '70994226',  # Rohlík
        '02795281',  # Mall.cz
    ]
    
    print("🚀 FirmyDB Batch Scraper")
    print("=" * 60)
    print(f"Scraping {len(top_icos)} companies...")
    
    scraper = BatchScraper()
    results = scraper.scrape_companies(top_icos[:10])  # Limit to 10 for demo
    
    # Export results
    scraper.export_csv(results, 'companies.csv')
    scraper.export_json(results, 'companies.json')
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"Total companies scraped: {len(results)}")
    
    avg_quality = sum(c['quality_score'] for c in results) / len(results) if results else 0
    print(f"Average quality score: {avg_quality:.1f}/100")
    
    with_email = sum(1 for c in results if c.get('email'))
    print(f"Companies with email: {with_email}/{len(results)}")
    
    with_phone = sum(1 for c in results if c.get('phone'))
    print(f"Companies with phone: {with_phone}/{len(results)}")

if __name__ == "__main__":
    main()
