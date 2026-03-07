import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function SuccessPage() {
  const router = useRouter()
  const { session_id } = router.query
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    if (session_id) {
      // Verify session (optional)
      // For now, just show success
      setLoading(false)
    }
  }, [session_id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Ověřuji platbu...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Platba úspěšná - FirmyDB.cz</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Platba úspěšná!
          </h1>
          <p className="text-gray-600 mb-6">
            Děkujeme za registraci! Váš účet byl úspěšně aktivován.
          </p>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Co dál?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Potvrzovací email byl odeslán na váš email</li>
              <li>✓ Přihlaste se a začněte vyhledávat firmy</li>
              <li>✓ Exportujte kontakty podle vašich potřeb</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Přejít do aplikace →
            </a>
            <a
              href="https://firmydb.cz"
              className="block w-full text-gray-600 hover:text-gray-900"
            >
              Zpět na homepage
            </a>
          </div>

          {/* Support */}
          <p className="mt-6 text-sm text-gray-500">
            Potřebujete pomoc? 
            <a href="mailto:info@firmydb.cz" className="text-blue-600 hover:underline ml-1">
              Kontaktujte nás
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
