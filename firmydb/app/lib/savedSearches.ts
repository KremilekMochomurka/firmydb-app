// Saved searches/lists functionality
import { supabase } from './supabase'

export interface SavedSearch {
  id: string
  user_id: string
  name: string
  description?: string
  filters: {
    search_query?: string
    selected_city?: string
    has_email?: boolean
    has_phone?: boolean
    min_quality?: number
  }
  created_at: string
  updated_at: string
}

// Create saved search
export async function createSavedSearch(
  userId: string,
  name: string,
  filters: SavedSearch['filters'],
  description?: string
): Promise<SavedSearch | null> {
  const { data, error } = await supabase
    .from('saved_searches')
    .insert({
      user_id: userId,
      name,
      description,
      filters
    })
    .select()
    .single()

  if (error) {
    console.error('Failed to create saved search:', error)
    return null
  }

  return data
}

// Get user's saved searches
export async function getSavedSearches(userId: string): Promise<SavedSearch[]> {
  const { data, error } = await supabase
    .from('saved_searches')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to get saved searches:', error)
    return []
  }

  return data || []
}

// Update saved search
export async function updateSavedSearch(
  id: string,
  updates: Partial<SavedSearch>
): Promise<SavedSearch | null> {
  const { data, error } = await supabase
    .from('saved_searches')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Failed to update saved search:', error)
    return null
  }

  return data
}

// Delete saved search
export async function deleteSavedSearch(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('saved_searches')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Failed to delete saved search:', error)
    return false
  }

  return true
}

// Use saved search (apply its filters)
export function applySavedSearchFilters(search: SavedSearch) {
  return {
    searchQuery: search.filters.search_query || '',
    selectedCity: search.filters.selected_city || 'all',
    hasEmailFilter: search.filters.has_email || false,
    hasPhoneFilter: search.filters.has_phone || false,
    minQuality: search.filters.min_quality || 0
  }
}

// Create SQL schema (to be run in Supabase)
export const savedSearchesSchema = `
CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  filters JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON saved_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_searches_created_at ON saved_searches(created_at);

-- Enable RLS
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own searches"
  ON saved_searches FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create searches"
  ON saved_searches FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own searches"
  ON saved_searches FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own searches"
  ON saved_searches FOR DELETE
  USING (auth.uid() = user_id);

-- Service role full access
CREATE POLICY "Service role full access"
  ON saved_searches FOR ALL
  USING (auth.role() = 'service_role');
`
