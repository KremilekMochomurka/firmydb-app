#!/usr/bin/env python3
"""
FirmyDB Orchestrator
Coordinates scraping from multiple sources and enriches company data
"""

import json
import time
from typing import Dict, List, Optional
from scraper_justice import JusticeScraper
from scraper_firmycz import FirmyCzScraper

class FirmyDBOrchestrator:
    """
    Orchestrates data collection from multiple sources
    Merges and enriches company data
    """
    
    def __init__(self):
        self.justice_scraper = JusticeScraper()
        self.firmycz_scraper = FirmyCzScraper()
    
    def enrich_company(self, ico: str) -> Optional[Dict]:
        """
        Enrich company data by scraping multiple sources
        Returns merged company data
        """
        print(f"\n=== Enriching company {ico} ===")
        
        # Get data from Justice.cz (official registry)
        justice_data = self.justice_scraper.search_by_ico(ico)
        if not justice_data:
            print(f"❌ No data from justice.cz for {ico}")
            return None
        
        print(f"✓ Got data from justice.cz")
        
        # Get contact data from Firmy.cz
        firmycz_data = self.firmycz_scraper.search_by_ico(ico)
        if firmycz_data:
            print(f"✓ Got contact data from firmy.cz")
        else:
            print(f"⚠ No data from firmy.cz")
        
        # Merge data
        enriched = self._merge_data(justice_data, firmycz_data)
        
        # Calculate data quality score
        enriched['data_quality_score'] = self._calculate_quality_score(enriched)
        
        return enriched
    
    def _merge_data(self, justice: Dict, firmycz: Optional[Dict]) -> Dict:
        """Merge data from multiple sources"""
        merged = {
            # From Justice.cz
            'ico': justice.get('ico'),
            'name': justice.get('name'),
            'legal_form': justice.get('legal_form'),
            'founded_year': justice.get('founded_year'),
            'status': justice.get('status'),
            
            # Address from Justice.cz
            'address': justice.get('address', {}),
            
            # Contact info from Firmy.cz
            'email': None,
            'phone': None,
            'website': None,
            'description': None,
            'industry': None,
        }
        
        if firmycz:
            merged['email'] = firmycz.get('email')
            merged['phone'] = firmycz.get('phone')
            merged['website'] = firmycz.get('website')
            merged['description'] = firmycz.get('description')
            merged['industry'] = firmycz.get('industry')
        
        return merged
    
    def _calculate_quality_score(self, data: Dict) -> int:
        """
        Calculate data quality score (0-100)
        Based on completeness of data
        """
        score = 0
        max_score = 100
        
        # Core fields (40 points)
        if data.get('ico'): score += 10
        if data.get('name'): score += 10
        if data.get('legal_form'): score += 10
        if data.get('status') == 'active': score += 10
        
        # Contact fields (40 points)
        if data.get('email'): score += 15
        if data.get('phone'): score += 10
        if data.get('website'): score += 15
        
        # Additional fields (20 points)
        if data.get('industry'): score += 5
        if data.get('founded_year'): score += 5
        if data.get('description'): score += 5
        if data.get('address') and data['address'].get('city'): score += 5
        
        return min(score, max_score)
    
    def batch_enrich(self, ico_list: List[str]) -> List[Dict]:
        """
        Enrich multiple companies
        Returns list of enriched company data
        """
        results = []
        
        for i, ico in enumerate(ico_list, 1):
            print(f"\n[{i}/{len(ico_list)}] Processing {ico}...")
            
            try:
                enriched = self.enrich_company(ico)
                if enriched:
                    results.append(enriched)
                    print(f"✓ Quality score: {enriched['data_quality_score']}/100")
            except Exception as e:
                print(f"❌ Error processing {ico}: {e}")
            
            # Rate limiting
            time.sleep(2)
        
        return results
    
    def export_to_json(self, data: List[Dict], filename: str):
        """Export enriched data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n✓ Exported {len(data)} companies to {filename}")


if __name__ == "__main__":
    # Test with sample Czech companies
    orchestrator = FirmyDBOrchestrator()
    
    # Sample IČO list (real Czech companies in tech/software)
    test_icos = [
        "27082440",  # Example company
        "45274924",  # Example company  
        "24729035",  # Example company
    ]
    
    print("=== FirmyDB Enrichment Test ===\n")
    results = orchestrator.batch_enrich(test_icos)
    
    # Export results
    orchestrator.export_to_json(results, 'firmydb_sample_data.json')
    
    # Print summary
    print(f"\n=== Summary ===")
    print(f"Total companies processed: {len(results)}")
    print(f"With email: {sum(1 for r in results if r.get('email'))}")
    print(f"With phone: {sum(1 for r in results if r.get('phone'))}")
    print(f"With website: {sum(1 for r in results if r.get('website'))}")
    print(f"Average quality score: {sum(r['data_quality_score'] for r in results) / len(results) if results else 0:.1f}")
