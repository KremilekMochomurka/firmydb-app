#!/usr/bin/env python3
"""
Import scraped companies into Supabase
"""

import os
import json
from typing import List, Dict

try:
    from supabase import create_client, Client
except ImportError:
    print("⚠️  supabase-py not installed. Install with:")
    print("   pip install supabase")
    exit(1)

def load_env():
    """Load .env file"""
    env_file = '.env'
    if not os.path.exists(env_file):
        print(f"❌ {env_file} not found!")
        print("\nCreate .env file with:")
        print("SUPABASE_URL=https://your-project.supabase.co")
        print("SUPABASE_SERVICE_KEY=your-service-role-key")
        exit(1)
    
    with open(env_file) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                os.environ[key] = value

def get_supabase_client() -> Client:
    """Initialize Supabase client"""
    load_env()
    
    url = os.getenv('SUPABASE_URL')
    key = os.getenv('SUPABASE_SERVICE_KEY')
    
    if not url or not key:
        print("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env")
        exit(1)
    
    return create_client(url, key)

def import_companies(filename: str = 'companies.json'):
    """Import companies from JSON file"""
    
    if not os.path.exists(filename):
        print(f"❌ {filename} not found!")
        print("\nRun batch_scraper.py first to generate data.")
        exit(1)
    
    print(f"📂 Loading {filename}...")
    with open(filename) as f:
        companies = json.load(f)
    
    print(f"✓ Loaded {len(companies)} companies")
    
    # Connect to Supabase
    print("\n🔗 Connecting to Supabase...")
    supabase = get_supabase_client()
    print("✓ Connected!")
    
    # Import companies
    print(f"\n📥 Importing {len(companies)} companies...")
    
    success_count = 0
    error_count = 0
    
    for i, company in enumerate(companies, 1):
        try:
            # Prepare data for insert
            data = {
                'ico': company.get('ico'),
                'name': company.get('name'),
                'legal_form': company.get('legal_form'),
                'address': company.get('address'),
                'city': company.get('city'),
                'zip_code': str(company.get('zip')) if company.get('zip') else None,
                'email': company.get('email'),
                'phone': company.get('phone'),
                'website': company.get('website'),
                'founded_date': company.get('founded_date'),
                'status': company.get('status'),
                'dic': company.get('dic'),
                'nace_codes': company.get('nace_codes', []),
                'quality_score': company.get('quality_score', 0),
                'source': company.get('source', 'ares'),
            }
            
            # Insert into Supabase
            result = supabase.table('companies').insert(data).execute()
            
            success_count += 1
            print(f"  [{i}/{len(companies)}] ✓ {data['name']}")
            
        except Exception as e:
            error_count += 1
            print(f"  [{i}/{len(companies)}] ✗ Error: {e}")
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 IMPORT SUMMARY")
    print("=" * 60)
    print(f"✅ Successfully imported: {success_count}")
    print(f"❌ Errors: {error_count}")
    print(f"📈 Success rate: {success_count/len(companies)*100:.1f}%")
    
    return success_count, error_count

def main():
    """Main import function"""
    print("🚀 FirmyDB - Supabase Import")
    print("=" * 60)
    
    import_companies('companies.json')
    
    print("\n✅ Import complete!")
    print("\nNext steps:")
    print("1. Check Supabase Dashboard → Table Editor")
    print("2. Verify data quality")
    print("3. Run more batch scrapes to grow database")

if __name__ == "__main__":
    main()
