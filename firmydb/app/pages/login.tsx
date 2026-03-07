import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        })
        
        if (error) throw error
        
        alert('Registrace úspěšná! Zkontrolujte email pro potvrzení.')
        setMode('login')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        router.push('/')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{mode === 'login' ? 'Přihlášení' : 'Registrace'} - FirmyDB.cz</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">FirmyDB</h1>
            <p className="text-gray-600">
              {mode === 'login' ? 'Přihlaste se ke svému účtu' : 'Vytvořte si účet zdarma'}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="vas.email@firma.cz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heslo
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                {mode === 'signup' && (
                  <p className="text-xs text-gray-500 mt-1">Minimálně 6 znaků</p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Načítání...' : mode === 'login' ? 'Přihlásit se' : 'Registrovat'}
              </button>
            </form>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login')
                  setError(null)
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                {mode === 'login' 
                  ? 'Nemáte účet? Zaregistrujte se' 
                  : 'Už máte účet? Přihlaste se'}
              </button>
            </div>

            {/* Back to home */}
            <div className="mt-4 text-center">
              <a href="https://firmydb.cz" className="text-sm text-gray-600 hover:text-gray-900">
                ← Zpět na homepage
              </a>
            </div>
          </div>

          {/* Beta notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🎉 Beta verze je zdarma! Žádná platební karta není potřeba.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
