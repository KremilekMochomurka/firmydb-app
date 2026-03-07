import React, { useEffect, useState } from 'react'
import { getUserStats } from '../lib/usage'

interface Props {
  userId: string
}

export default function UsageBar({ userId }: Props) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getUserStats(userId)
        setStats(data)
      } catch (error) {
        console.error('Failed to load usage stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [userId])

  if (loading || !stats) {
    return null
  }

  const exportsPercent = Math.min(stats.percentages.exports, 100)
  const isNearLimit = exportsPercent >= 80
  const atLimit = exportsPercent >= 100

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {stats.tier === 'beta' ? '🎉 Beta' : 
             stats.tier === 'startup' ? '🚀 Startup' : 
             '⭐ Pro'} Tier
          </h3>
          <p className="text-xs text-gray-500">Tento měsíc</p>
        </div>
        {stats.tier === 'beta' && (
          <a 
            href="https://firmydb.cz/pricing.html"
            className="text-xs text-blue-600 hover:underline"
          >
            Upgradovat →
          </a>
        )}
      </div>

      {/* Exports Usage */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">CSV Exporty</span>
          <span className={`text-xs font-semibold ${
            atLimit ? 'text-red-600' :
            isNearLimit ? 'text-yellow-600' : 
            'text-gray-600'
          }`}>
            {stats.usage.exports} / {stats.limits.exports === -1 ? '∞' : stats.limits.exports}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              atLimit ? 'bg-red-500' :
              isNearLimit ? 'bg-yellow-500' : 
              'bg-blue-600'
            }`}
            style={{ width: `${exportsPercent}%` }}
          />
        </div>
      </div>

      {/* Searches Usage (optional, compact) */}
      {stats.limits.searches !== -1 && (
        <div className="text-xs text-gray-500">
          <span>Vyhledávání: {stats.usage.searches} / {stats.limits.searches}</span>
        </div>
      )}

      {/* Warning message */}
      {isNearLimit && !atLimit && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          ⚠️ Blížíte se limitu exportů
        </div>
      )}

      {atLimit && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
          🚫 Dosažen limit exportů. 
          <a href="https://firmydb.cz/pricing.html" className="underline ml-1">
            Upgradujte
          </a>
        </div>
      )}
    </div>
  )
}
