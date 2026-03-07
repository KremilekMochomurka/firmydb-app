#!/usr/bin/env python3
"""
FirmyDB Batch Import - Scrape ARES + Import to Supabase
"""

import os
import sys
import json
import requests
from typing import List, Dict
import time

# Supabase credentials
SUPABASE_URL = "https://saxvaqaoqkkhkkrritcj.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNheHZhcWFvcWtraGtrcnJpdGNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NTA5MywiZXhwIjoyMDg3OTYxMDkzfQ.LMOICixX8DfR6-4QUGOUinoDYFP8ItisI7aqboa-MhE"

class AresSimpleScraper:
    """Simplified ARES scraper for batch processing"""
    
    BASE_URL = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty"
    
    def search_by_ico(self, ico: str) -> Dict:
        """Search company by IČO"""
        try:
            response = requests.get(f"{self.BASE_URL}/{ico}", timeout=10)
            
            if response.status_code != 200:
                return None
            
            data = response.json()
            
            # Extract basic info
            company = {
                'ico': ico,
                'name': data.get('obchodniJmeno', ''),
                'legal_form': data.get('pravniForma'),
                'city': None,
                'email': None,
                'phone': None
            }
            
            # Extract address
            sidlo = data.get('sidlo', {})
            if sidlo:
                parts = []
                if sidlo.get('nazevObce'):
                    company['city'] = sidlo['nazevObce']
                    parts.append(str(sidlo['nazevObce']))
                if sidlo.get('psc'):
                    parts.append(str(sidlo['psc']))
                
                company['address'] = ', '.join(parts) if parts else None
            
            # Extract dates
            if data.get('datumVzniku'):
                company['founded_date'] = data['datumVzniku']
            
            return company
            
        except Exception as e:
            print(f"  ❌ Error scraping {ico}: {str(e)}")
            return None

class SupabaseImporter:
    """Import companies to Supabase"""
    
    def __init__(self):
        self.url = SUPABASE_URL
        self.key = SERVICE_ROLE_KEY
        self.headers = {
            'apikey': self.key,
            'Authorization': f'Bearer {self.key}',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }
    
    def import_companies(self, companies: List[Dict]) -> Dict:
        """Batch import companies"""
        
        if not companies:
            return {'success': 0, 'failed': 0}
        
        # Ensure all companies have same keys
        normalized = []
        for c in companies:
            normalized.append({
                'ico': c.get('ico'),
                'name': c.get('name'),
                'legal_form': c.get('legal_form'),
                'city': c.get('city'),
                'email': c.get('email'),
                'phone': c.get('phone'),
                'founded_date': c.get('founded_date')
            })
        
        try:
            response = requests.post(
                f'{self.url}/rest/v1/companies',
                headers=self.headers,
                json=normalized
            )
            
            if response.status_code in [200, 201]:
                result = response.json()
                return {
                    'success': len(result) if isinstance(result, list) else 1,
                    'failed': 0
                }
            else:
                print(f"  ❌ Import failed: {response.status_code}")
                print(f"     Response: {response.text[:200]}")
                return {'success': 0, 'failed': len(companies)}
                
        except Exception as e:
            print(f"  ❌ Import exception: {str(e)}")
            return {'success': 0, 'failed': len(companies)}
    
    def check_existing(self, ico: str) -> bool:
        """Check if company already exists"""
        try:
            response = requests.get(
                f'{self.url}/rest/v1/companies',
                headers=self.headers,
                params={'ico': f'eq.{ico}', 'select': 'ico'}
            )
            
            if response.status_code == 200:
                result = response.json()
                return len(result) > 0
            
            return False
        except:
            return False

def main():
    """Main batch import process"""
    
    print("🚀 FirmyDB Batch Import to Supabase")
    print("=" * 60)
    
    # Read IČO list
    ico_file = 'ico_clean.txt'
    if not os.path.exists(ico_file):
        print(f"❌ File {ico_file} not found")
        return
    
    with open(ico_file, 'r') as f:
        icos = [line.strip() for line in f if line.strip()]
    
    print(f"📋 Loaded {len(icos)} IČO numbers")
    
    scraper = AresSimpleScraper()
    importer = SupabaseImporter()
    
    # Process in batches of 10
    batch_size = 10
    total_scraped = 0
    total_imported = 0
    total_failed = 0
    total_skipped = 0
    
    for i in range(0, len(icos), batch_size):
        batch = icos[i:i+batch_size]
        batch_num = (i // batch_size) + 1
        total_batches = (len(icos) + batch_size - 1) // batch_size
        
        print(f"\n📦 BATCH {batch_num}/{total_batches} ({len(batch)} companies)")
        print("-" * 60)
        
        companies = []
        
        for j, ico in enumerate(batch):
            print(f"  [{j+1}/{len(batch)}] IČO: {ico}", end="")
            
            # Check if exists
            if importer.check_existing(ico):
                print(" ⏭️  Already exists, skipping")
                total_skipped += 1
                continue
            
            # Scrape
            company = scraper.search_by_ico(ico)
            
            if company:
                print(f" ✅ {company.get('name', 'N/A')[:40]}")
                companies.append(company)
                total_scraped += 1
            else:
                print(" ❌ Not found")
                total_failed += 1
            
            # Rate limiting
            time.sleep(0.3)
        
        # Import batch
        if companies:
            print(f"\n  💾 Importing {len(companies)} companies to Supabase...")
            result = importer.import_companies(companies)
            total_imported += result['success']
            total_failed += result['failed']
            
            if result['success'] > 0:
                print(f"  ✅ Successfully imported {result['success']} companies")
            if result['failed'] > 0:
                print(f"  ⚠️  Failed to import {result['failed']} companies")
        
        # Delay between batches
        if i + batch_size < len(icos):
            time.sleep(1)
    
    # Final summary
    print("\n" + "=" * 60)
    print("📊 FINAL SUMMARY")
    print("=" * 60)
    print(f"Total processed:  {len(icos)}")
    print(f"Successfully scraped: {total_scraped}")
    print(f"Successfully imported: {total_imported}")
    print(f"Skipped (existing): {total_skipped}")
    print(f"Failed: {total_failed}")
    print("=" * 60)

if __name__ == "__main__":
    main()
