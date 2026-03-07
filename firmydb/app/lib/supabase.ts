import { createClient } from '@supabase/supabase-js'

// These will be set after Supabase project is created
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for TypeScript
export interface Company {
  id?: number
  ico: string
  name: string
  legal_form?: string
  address?: string
  city?: string
  zip_code?: string
  email?: string
  phone?: string
  website?: string
  founded_date?: string
  status?: string
  dic?: string
  nace_codes?: string[]
  quality_score?: number
  source?: string
  created_at?: string
}

// Database queries
export const companyQueries = {
  // Search companies
  async search(query: string, limit = 50) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .or(`name.ilike.%${query}%,ico.ilike.%${query}%,city.ilike.%${query}%`)
      .limit(limit)
    
    if (error) throw error
    return data as Company[]
  },

  // Get all companies (paginated)
  async getAll(page = 0, pageSize = 50) {
    const from = page * pageSize
    const to = from + pageSize - 1
    
    const { data, error, count } = await supabase
      .from('companies')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('name', { ascending: true })
    
    if (error) throw error
    return { data: data as Company[], total: count || 0 }
  },

  // Get by ICO
  async getByIco(ico: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('ico', ico)
      .single()
    
    if (error) throw error
    return data as Company
  },

  // Filter by city
  async filterByCity(city: string, limit = 50) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .ilike('city', city)
      .limit(limit)
    
    if (error) throw error
    return data as Company[]
  },

  // Get statistics
  async getStats() {
    const { count: total } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
    
    const { count: withEmail } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .not('email', 'is', null)
    
    const { count: withPhone } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .not('phone', 'is', null)
    
    return {
      total: total || 0,
      withEmail: withEmail || 0,
      withPhone: withPhone || 0,
      emailPercentage: total ? Math.round((withEmail || 0) / total * 100) : 0,
      phonePercentage: total ? Math.round((withPhone || 0) / total * 100) : 0
    }
  }
}
