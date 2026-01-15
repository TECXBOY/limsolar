// Quick script to check if environment variables are loaded
console.log('Checking environment variables...\n')
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL || '❌ NOT SET')
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ SET (hidden)' : '❌ NOT SET')
console.log('\nIf variables show as NOT SET:')
console.log('1. Make sure .env file exists in project root')
console.log('2. Restart dev server after creating/editing .env')
console.log('3. Variables must start with VITE_')
