import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are configured
const isConfigured = () => {
  return supabaseUrl && 
         supabaseAnonKey &&
         supabaseUrl !== 'https://placeholder.supabase.co' &&
         supabaseAnonKey !== 'placeholder-key' &&
         !supabaseUrl.includes('your-project') &&
         !supabaseAnonKey.includes('your-anon')
}

// Create client - use placeholder if not configured (allows app to start)
const url = supabaseUrl || 'https://placeholder.supabase.co'
const key = supabaseAnonKey || 'placeholder-key'

export const supabase = createClient(url, key)

// Export configuration check
export const isSupabaseConfigured = isConfigured

// Helper to get configuration status for debugging
export const getConfigStatus = () => {
  return {
    urlSet: !!supabaseUrl,
    keySet: !!supabaseAnonKey,
    url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'NOT SET',
    configured: isConfigured(),
  }
}
