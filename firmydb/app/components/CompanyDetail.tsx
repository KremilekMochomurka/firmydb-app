import React from 'react'
import { Company } from '../lib/supabase'

interface Props {
  company: Company
  onClose: () => void
}

export default function CompanyDetail({ company, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h2>
          <div className="flex gap-2 items-center text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">IČO: {company.ico}</span>
            {company.legal_form && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">{company.legal_form}</span>
            )}
          </div>
        </div>

        {/* Quality score */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Kvalita dat:</span>
            <span className="text-lg font-bold text-blue-600">{company.quality_score || 0}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${company.quality_score || 0}%` }}
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">📍 Adresa</h3>
            <p className="text-gray-900">{company.address || company.city || 'Není k dispozici'}</p>
          </div>

          {company.email && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">📧 Email</h3>
              <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">
                {company.email}
              </a>
            </div>
          )}

          {company.phone && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">📞 Telefon</h3>
              <a href={`tel:${company.phone}`} className="text-blue-600 hover:underline">
                {company.phone}
              </a>
            </div>
          )}

          {company.website && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">🌐 Web</h3>
              <a
                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.website}
              </a>
            </div>
          )}

          {company.founded_date && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">📅 Založeno</h3>
              <p className="text-gray-900">{new Date(company.founded_date).toLocaleDateString('cs-CZ')}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => window.open(`https://or.justice.cz/ias/ui/rejstrik-$firma?ico=${company.ico}`, '_blank')}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Zobrazit v OR
          </button>
          <button
            onClick={() => {
              const csv = `"IČO","Název","Město","Email","Telefon"\n"${company.ico}","${company.name}","${company.city || ''}","${company.email || ''}","${company.phone || ''}"`
              const blob = new Blob([csv], { type: 'text/csv' })
              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              link.download = `${company.ico}_${company.name}.csv`
              link.click()
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  )
}
