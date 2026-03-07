import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase, companyQueries, Company } from '../lib/supabase'
import CompanyDetail from '../components/CompanyDetail'
import EmailTemplates from '../components/EmailTemplates'
import UsageBar from '../components/UsageBar'
import * as ga from '../lib/analytics'
import { useUser, signOut } from '../lib/auth'
import { canPerformAction, logUsage } from '../lib/usage'

// Fallback sample data if Supabase fails
const sampleCompanies = [
  {
    ico: '27082440',
    name: 'Alza.cz a.s.',
    address: 'Jankovcova, 1522, Praha, 17000',
    city: 'Praha',
    founded_date: '2003-08-26',
    email: null,
    phone: null,
    website: null,
    quality_score: 55
  },
  {
    ico: '25672720',
    name: 'MONETA Money Bank, a.s.',
    address: 'Vyskočilova, 1442, Praha, 14000',
    city: 'Praha',
    founded_date: '1998-06-09',
    email: null,
    phone: null,
    website: null,
    quality_score: 55
  },
  {
    ico: '60193336',
    name: 'O2 Czech Republic a.s.',
    address: 'Za Brumlovkou, 266, Praha, 14000',
    city: 'Praha',
    founded_date: '1994-01-01',
    email: null,
    phone: null,
    website: null,
    quality_score: 55
  },
  {
    ico: '45274649',
    name: 'ČEZ, a. s.',
    address: 'Duhová, 1444, Praha, 14000',
    city: 'Praha',
    founded_date: '1992-05-06',
    email: null,
    phone: null,
    website: null,
    quality_score: 55
  },
  {
    ico: '00177041',
    name: 'Škoda Auto a.s.',
    address: 'tř. Václava Klementa 869, Mladá Boleslav, 29301',
    city: 'Mladá Boleslav',
    founded_date: '1991-04-16',
    email: 'sbd-hk@sbd-hk.cz',
    phone: '+420 326 811 111',
    website: 'https://www.skoda-auto.cz',
    quality_score: 95
  },
  {
    ico: '27074358',
    name: 'Asseco Central Europe, a.s.',
    address: 'Budějovická, 778, Praha, 14000',
    city: 'Praha',
    founded_date: '2003-08-06',
    email: null,
    phone: null,
    website: null,
    quality_score: 55
  },
  {
    ico: '00001279',
    name: 'Státní tiskárna cenin, s. p.',
    address: 'Růžová 943/6, Praha, 11000',
    city: 'Praha',
    founded_date: '1993-01-01',
    email: null,
    phone: null,
    website: null,
    quality_score: 55
  },
  {
    ico: '70994226',
    name: 'České dráhy, a.s.',
    address: 'Nábřeží Ludvíka Svobody 1222, Praha, 11000',
    city: 'Praha',
    founded_date: '2003-01-01',
    email: null,
    phone: '+420 840 112 113',
    website: 'https://www.cd.cz',
    quality_score: 70
  },
  {
    ico: '02795281',
    name: 'Operátor ICT, a.s.',
    address: 'Sládkova 1902/7, Praha, 11000',
    city: 'Praha',
    founded_date: '2011-12-15',
    email: null,
    phone: null,
    website: null,
    quality_score: 55
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'quality' | 'name'>('quality')
  const [error, setError] = useState<string | null>(null)
  const [hasEmailFilter, setHasEmailFilter] = useState(false)
  const [hasPhoneFilter, setHasPhoneFilter] = useState(false)
  const [minQuality, setMinQuality] = useState<number>(0)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showEmailTemplates, setShowEmailTemplates] = useState(false)
  
  const { user } = useUser()

  // Load companies from Supabase on mount
  useEffect(() => {
    async function loadCompanies() {
      try {
        setLoading(true)
        setError(null)
        const result = await companyQueries.getAll(0, 100)
        if (result.data && result.data.length > 0) {
          setCompanies(result.data)
        } else {
          // Fallback to sample data if DB is empty
          setCompanies(sampleCompanies)
        }
      } catch (err) {
        console.error('Failed to load companies:', err)
        setError('Nepodařilo se načíst data z databáze')
        setCompanies(sampleCompanies) // Fallback
      } finally {
        setLoading(false)
      }
    }
    loadCompanies()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // "/" to focus search
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
        searchInput?.focus()
      }

      // ESC to close modal
      if (e.key === 'Escape' && selectedCompany) {
        setSelectedCompany(null)
      }

      // Ctrl/Cmd + E to export
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        exportToCSV()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedCompany])

  // Export to CSV
  const exportToCSV = async () => {
    if (filteredCompanies.length === 0) {
      alert('Není co exportovat')
      return
    }

    // Check usage limit if user is logged in
    if (user) {
      const check = await canPerformAction(user.id, 'csv_export')
      
      if (!check.allowed) {
        if (confirm(`${check.message}\n\nChcete upgradovat na vyšší tier?`)) {
          window.location.href = 'https://firmydb.cz/pricing.html'
        }
        return
      }
    }

    // Track export (Analytics)
    ga.trackExport(filteredCompanies.length)

    // Log usage (if logged in)
    if (user) {
      await logUsage(user.id, 'csv_export', 1, {
        company_count: filteredCompanies.length,
        filters: {
          search: searchQuery,
          city: selectedCity,
          hasEmail: hasEmailFilter,
          hasPhone: hasPhoneFilter
        }
      })
    }

    const headers = ['IČO', 'Název', 'Město', 'Email', 'Telefon', 'Web']
    const rows = filteredCompanies.map(c => [
      c.ico,
      c.name,
      c.city || '',
      c.email || '',
      c.phone || '',
      c.website || ''
    ])

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `firmydb_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Get unique cities for filter
  const cities = ['all', ...Array.from(new Set(companies.map(c => c.city).filter(Boolean)))]

  useEffect(() => {
    // Filter and sort companies
    let filtered = companies

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(query) ||
        company.ico.includes(query) ||
        company.city?.toLowerCase().includes(query)
      )
    }

    // Filter by city
    if (selectedCity !== 'all') {
      filtered = filtered.filter(c => c.city === selectedCity)
    }

    // Filter by email
    if (hasEmailFilter) {
      filtered = filtered.filter(c => c.email)
    }

    // Filter by phone
    if (hasPhoneFilter) {
      filtered = filtered.filter(c => c.phone)
    }

    // Filter by quality
    filtered = filtered.filter(c => (c.quality_score || 0) >= minQuality)

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'quality') {
        return (b.quality_score || 0) - (a.quality_score || 0)
      } else {
        return a.name.localeCompare(b.name, 'cs')
      }
    })

    setFilteredCompanies(filtered)

    // Track search if there's a query
    if (searchQuery.trim() !== '') {
      ga.trackSearch(searchQuery, filtered.length)
    }
  }, [searchQuery, companies, selectedCity, sortBy, hasEmailFilter, hasPhoneFilter, minQuality])

  const stats = {
    total: companies.length,
    withEmail: companies.filter(c => c.email).length,
    withPhone: companies.filter(c => c.phone).length,
    avgQuality: Math.round(companies.reduce((sum, c) => sum + (c.quality_score || 0), 0) / companies.length)
  }

  return (
    <>
      <Head>
        <title>FirmyDB.cz - Databáze českých firem | B2B Sales Intelligence</title>
        <meta name="description" content="Profesionální databáze 50+ českých B2B firem s kontakty. IČO, email, telefon, adresa. Ideální pro sales, marketing a business development." />
        <meta name="keywords" content="české firmy, databáze firem, B2B, sales intelligence, business development, kontakty, IČO, lead generation" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="FirmyDB.cz - Databáze českých firem" />
        <meta property="og:description" content="Profesionální databáze 50+ českých B2B firem s kontakty." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://firmydb.cz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Czech" />
        <link rel="canonical" href="https://firmydb.cz" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-blue-600">FirmyDB.cz</h1>
                <p className="text-sm text-gray-500">České B2B Sales Intelligence</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="/stats.html" className="text-sm text-gray-600 hover:text-blue-600">
                  📊 Statistiky
                </a>
                <a href="https://firmydb.cz" className="text-sm text-gray-600 hover:text-blue-600">
                  🏠 Domů
                </a>
                {user ? (
                  <>
                    <span className="text-sm text-gray-600">
                      {user.email}
                    </span>
                    <button
                      onClick={async () => {
                        await signOut()
                        window.location.reload()
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Odhlásit se
                    </button>
                  </>
                ) : (
                  <a href="/login.html" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Přihlásit se
                  </a>
                )}
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-gray-900 font-medium">Vyhledávání</a>
                <a href="https://firmydb.cz#pricing" className="text-gray-600 hover:text-gray-900">Ceník</a>
                <a href="https://firmydb.cz#contact" className="text-gray-600 hover:text-gray-900">Kontakt</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Stats Banner */}
        <div className="bg-blue-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-8 text-sm">
              <div>
                <span className="font-semibold">{stats.total.toLocaleString()}</span> firem
              </div>
              <div>
                <span className="font-semibold">{stats.withEmail}</span> s emailem
              </div>
              <div>
                <span className="font-semibold">{stats.withPhone}</span> s telefonem
              </div>
              <div>
                <span className="font-semibold">{stats.avgQuality}%</span> průměrná kvalita
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Vyhledávání firem
            </h2>
            <p className="text-gray-600 mb-6">
              Demo verze s {companies.length} firmami. Plná databáze obsahuje 500 000+ firem.
            </p>
            
            {/* Search Bar & Filters */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Vyhledat podle názvu, IČO nebo města..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Filters */}
              <div className="flex gap-4 flex-wrap items-center">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'Všechna města' : city}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'quality' | 'name')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="quality">Seřadit: Kvalita</option>
                  <option value="name">Seřadit: Název</option>
                </select>

                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasEmailFilter}
                    onChange={(e) => setHasEmailFilter(e.target.checked)}
                    className="rounded"
                  />
                  <span>S emailem</span>
                </label>

                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPhoneFilter}
                    onChange={(e) => setHasPhoneFilter(e.target.checked)}
                    className="rounded"
                  />
                  <span>S telefonem</span>
                </label>

                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCity('all')
                    setSortBy('quality')
                    setHasEmailFilter(false)
                    setHasPhoneFilter(false)
                    setMinQuality(0)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Vymazat filtry
                </button>

                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  📥 Export CSV
                </button>

                <button
                  onClick={() => setShowEmailTemplates(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  📧 Email Templates
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  <strong>Beta verze:</strong> Databáze obsahuje {filteredCompanies.length} ověřených českých B2B firem z registru ARES. 
                  Denně přibývají nové firmy a kontakty. 
                  <a href="/stats.html" className="underline ml-1">Zobrazit statistiky →</a>
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">
                Výsledky ({filteredCompanies.length})
              </h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {loading ? (
                <div className="px-6 py-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-500">Načítání...</p>
                </div>
              ) : filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, index) => (
                  <div 
                    key={company.ico} 
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer stagger-item animate-fade-in hover-lift"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => {
                      ga.trackCompanyView(company.name)
                      setSelectedCompany(company)
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {company.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          IČO: {company.ico}
                        </p>
                        {company.address && (
                          <p className="text-sm text-gray-600 mb-1">
                            📍 {company.address}
                          </p>
                        )}
                        <div className="flex gap-4 mt-2 text-sm">
                          {company.email && (
                            <span className="text-blue-600">
                              ✉️ {company.email}
                            </span>
                          )}
                          {company.phone && (
                            <span className="text-green-600">
                              📞 {company.phone}
                            </span>
                          )}
                          {company.website && (
                            <a 
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              🌐 Web
                            </a>
                          )}
                        </div>
                        {company.founded_date && (
                          <p className="text-sm text-gray-500 mt-2">
                            Založeno: {new Date(company.founded_date).toLocaleDateString('cs-CZ')}
                          </p>
                        )}
                      </div>
                      <div className="ml-4 flex flex-col items-end gap-2">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          (company.quality_score || 0) >= 70 
                            ? 'bg-green-100 text-green-800'
                            : (company.quality_score || 0) >= 50
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          Kvalita: {company.quality_score}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500">
                    {searchQuery ? `Žádné výsledky pro "${searchQuery}"` : 'Žádné firmy'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Chcete přístup k plné databázi?
              </h3>
              <p className="text-gray-700 mb-4">
                Získejte přístup k 500 000+ českých firem s ověřenými kontakty
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="mailto:info@firmydb.cz"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg"
                >
                  Kontaktujte nás
                </a>
                <a
                  href="https://firmydb.cz#pricing"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition border border-blue-600"
                >
                  Zobrazit ceník
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="font-semibold text-gray-900 mb-2">FirmyDB.cz</p>
              <p>© 2026 FirmyDB.cz - České B2B Sales Intelligence</p>
              <p className="mt-2 text-sm">
                <a href="mailto:info@firmydb.cz" className="text-blue-600 hover:underline">
                  info@firmydb.cz
                </a>
                {' • '}
                <a href="tel:+420704166936" className="text-blue-600 hover:underline">
                  +420 704 166 936
                </a>
              </p>
              <p className="mt-4 text-xs text-gray-500">
                Demo verze - Data z veřejného registru ARES
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <CompanyDetail 
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}

      {/* Email Templates Modal */}
      {showEmailTemplates && (
        <EmailTemplates
          onClose={() => setShowEmailTemplates(false)}
        />
      )}

      {/* Usage Bar (floating, bottom-right) */}
      {user && (
        <div className="fixed bottom-6 right-6 z-40 w-72">
          <UsageBar userId={user.id} />
        </div>
      )}
    </>
  )
}
