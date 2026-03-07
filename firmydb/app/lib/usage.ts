// Usage tracking utilities for FirmyDB
import { supabase } from './supabase'
import { pricingTiers, getTierById, hasReachedLimit } from './stripe'

export type ActionType = 'csv_export' | 'search' | 'saved_search' | 'company_view'

// Get user's current tier
export async function getUserTier(userId: string) {
  const { data, error } = await supabase
    .from('user_tiers')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    // If no tier exists, user is on beta (free) tier
    return {
      tier_id: 'beta',
      limits: getTierById('beta')?.limits || { exports: 10000, searches: 10000, savedSearches: 5 }
    }
  }

  const tier = getTierById(data.tier_id)
  return {
    ...data,
    limits: tier?.limits || data.limits
  }
}

// Get current month usage for a specific action
export async function getMonthlyUsage(userId: string, actionType: ActionType): Promise<number> {
  // Call Supabase function
  const { data, error } = await supabase
    .rpc('get_user_monthly_usage', {
      p_user_id: userId,
      p_action_type: actionType
    })

  if (error) {
    console.error('Failed to get usage:', error)
    return 0
  }

  return data || 0
}

// Log a user action
export async function logUsage(
  userId: string,
  actionType: ActionType,
  count: number = 1,
  metadata?: any
) {
  const { error } = await supabase
    .rpc('log_user_usage', {
      p_user_id: userId,
      p_action_type: actionType,
      p_action_count: count,
      p_metadata: metadata || {}
    })

  if (error) {
    console.error('Failed to log usage:', error)
  }
}

// Check if user can perform action (hasn't reached limit)
export async function canPerformAction(
  userId: string,
  actionType: ActionType
): Promise<{ allowed: boolean; usage: number; limit: number; message?: string }> {
  try {
    const tier = await getUserTier(userId)
    const usage = await getMonthlyUsage(userId, actionType)
    
    const limitKey = actionType === 'csv_export' ? 'exports' : 
                      actionType === 'saved_search' ? 'savedSearches' : 
                      'searches'
    
    const limit = tier.limits[limitKey]
    
    // Check if limit reached
    const reached = hasReachedLimit(usage, limit)
    
    return {
      allowed: !reached,
      usage,
      limit,
      message: reached ? `Dosáhli jste limitu (${limit} ${actionType}/měsíc). Upgradujte na vyšší tier.` : undefined
    }
  } catch (error) {
    console.error('Error checking action limit:', error)
    // On error, allow action (fail open for better UX)
    return {
      allowed: true,
      usage: 0,
      limit: -1
    }
  }
}

// Get all usage stats for dashboard
export async function getUserStats(userId: string) {
  const tier = await getUserTier(userId)
  
  const [exportsUsage, searchesUsage, savedSearchesCount] = await Promise.all([
    getMonthlyUsage(userId, 'csv_export'),
    getMonthlyUsage(userId, 'search'),
    getMonthlyUsage(userId, 'saved_search')
  ])

  return {
    tier: tier.tier_id,
    limits: tier.limits,
    usage: {
      exports: exportsUsage,
      searches: searchesUsage,
      savedSearches: savedSearchesCount
    },
    percentages: {
      exports: tier.limits.exports === -1 ? 0 : (exportsUsage / tier.limits.exports) * 100,
      searches: tier.limits.searches === -1 ? 0 : (searchesUsage / tier.limits.searches) * 100,
      savedSearches: tier.limits.savedSearches === -1 ? 0 : (savedSearchesCount / tier.limits.savedSearches) * 100
    }
  }
}

// Initialize user tier (called on first login/signup)
export async function initializeUserTier(userId: string, tierId: string = 'beta') {
  const { error } = await supabase
    .from('user_tiers')
    .insert({
      user_id: userId,
      tier_id: tierId
    })

  if (error && error.code !== '23505') { // Ignore duplicate key error
    console.error('Failed to initialize user tier:', error)
  }
}
