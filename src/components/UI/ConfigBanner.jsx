import { AlertCircle, X, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { isSupabaseConfigured, getConfigStatus } from '../../lib/supabaseClient'

const ConfigBanner = () => {
  const [dismissed, setDismissed] = useState(false)
  const configStatus = getConfigStatus()

  if (dismissed || isSupabaseConfigured()) {
    return null
  }

  // Check if .env file might exist but has placeholder values
  const hasPlaceholders = 
    !configStatus.urlSet || 
    !configStatus.keySet ||
    import.meta.env.VITE_SUPABASE_URL?.includes('placeholder') ||
    import.meta.env.VITE_SUPABASE_ANON_KEY?.includes('placeholder') ||
    import.meta.env.VITE_SUPABASE_URL?.includes('your-project') ||
    import.meta.env.VITE_SUPABASE_ANON_KEY?.includes('your-anon')

  return (
    <div className="bg-yellow-900/30 border-b border-yellow-500 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-yellow-400 font-semibold mb-1">Supabase Configuration Required</p>
              <div className="text-yellow-300 text-sm space-y-1">
                {hasPlaceholders ? (
                  <>
                    <p>Your <code className="bg-black/30 px-1 rounded">.env</code> file has placeholder values.</p>
                    <p className="text-yellow-200">
                      <strong>Action needed:</strong> Replace the placeholder values in your <code className="bg-black/30 px-1 rounded">.env</code> file with your actual Supabase credentials.
                    </p>
                    <p className="text-xs text-yellow-200/80 mt-2">
                      Get your credentials from: Supabase Dashboard → Settings → API
                    </p>
                  </>
                ) : (
                  <>
                    <p>Please create a <code className="bg-black/30 px-1 rounded">.env</code> file with your Supabase credentials.</p>
                    <p className="text-xs text-yellow-200/80 mt-2">
                      See <code className="bg-black/30 px-1 rounded">ENV_SETUP_GUIDE.md</code> for instructions.
                    </p>
                  </>
                )}
                <p className="text-xs text-yellow-200/70 mt-2">
                  ⚠️ <strong>Important:</strong> Restart your dev server after updating <code className="bg-black/30 px-1 rounded">.env</code>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-yellow-400 hover:text-yellow-300 ml-4"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfigBanner
