import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase, companyQueries } from '../lib/supabase'

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    withEmail: 0,
    withPhone: 0,
    avgQualityScore: 0,
    topCities: [] as {city: string, count: number}[],
    loading: true
  })

  useEffect(() => {
    async function loadStats() {
      try {
        // Get all companies
        const { data: companies } = await supabase
          .from('companies')
          .select('*')

        if (!companies) {
          setStats(prev => ({ ...prev, loading: false }))
          return
        }

        // Calculate stats
        const totalCompanies = companies.length
        const withEmail = companies.filter(c => c.email).length
        const withPhone = companies.filter(c => c.phone).length
        const avgQuality = companies.reduce((sum, c) => sum + (c.quality_score || 0), 0) / totalCompanies

        // Top cities
        const cityCounts: Record<string, number> = {}
        companies.forEach(c => {
          if (c.city) {
            cityCounts[c.city] = (cityCounts[c.city] || 0) + 1
          }
        })

        const topCities = Object.entries(cityCounts)
          .map(([city, count]) => ({ city, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        setStats({
          totalCompanies,
          withEmail,
          withPhone,
          avgQualityScore: Math.round(avgQuality),
          topCities,
          loading: false
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
        setStats(prev => ({ ...prev, loading: false }))
      }
    }

    loadStats()
  }, [])

  if (stats.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Načítání statistik...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Statistiky databáze - FirmyDB.cz</title>
        <meta name="description" content="Statistiky a přehled databáze českých B2B firem" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Statistiky databáze</h1>
                <p className="mt-1 text-gray-600">Přehled dat a pokrytí</p>
              </div>
              <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Zpět na vyhledávání
              </a>
            </div>
          </div>
        </header>

        {/* Main Stats */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Celkem firem</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">S emailem</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.withEmail}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((stats.withEmail / stats.totalCompanies) * 100)}% pokrytí
                  </p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">S telefonem</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.withPhone}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((stats.withPhone / stats.totalCompanies) * 100)}% pokrytí
                  </p>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Průměrná kvalita</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.avgQualityScore}/100</p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Top Cities */}
          <div className="bg-white rounded-xl shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top 10 měst</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats.topCities.map((city, index) => (
                  <div key={city.city} className="flex items-center">
                    <div className="w-8 text-center font-bold text-gray-400">
                      {index + 1}
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{city.city}</span>
                        <span className="text-sm text-gray-600">{city.count} firem</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(city.count / stats.totalCompanies) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">📊 O datech</h3>
            <p className="text-blue-800 mb-4">
              Všechna data pocházejí z oficiálního registru ARES (Administrativní registr ekonomických subjektů).
              Databáze je pravidelně aktualizována a rozšiřována o nové firmy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% ověřená IČO</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Denní aktualizace</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Přidáváme nové firmy denně</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
