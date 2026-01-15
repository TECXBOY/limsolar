# Quick Fix for .env Errors

## Your Current Situation

Your `.env` file exists but has **placeholder values**. You need to replace them with your **actual Supabase credentials**.

## Quick Fix Steps

### 1. Get Your Supabase Credentials

1. Go to https://supabase.com
2. Log in and select your project
3. Go to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 2. Update .env File

Open `.env` file in your project root and replace the placeholder values:

**Current (WRONG):**
```env
VITE_SUPABASE_URL=https://placeholder.supabase.co
VITE_SUPABASE_ANON_KEY=placeholder-key
```

**Should be (with YOUR values):**
```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.your-actual-key-here
```

### 3. Restart Dev Server

**CRITICAL:** After editing `.env`, restart the server:

1. Stop server: Press `Ctrl+C` in terminal
2. Start again: `npm run dev`

### 4. Verify It Works

After restarting:
- ✅ Yellow banner should disappear
- ✅ No errors in browser console
- ✅ Can access login/register pages
- ✅ No "Missing Supabase" errors

## Common Errors

### "Missing Supabase environment variables"
- **Fix:** Make sure `.env` file is in project root
- **Fix:** Variables must start with `VITE_`
- **Fix:** Restart dev server

### "Invalid API key" or connection errors
- **Fix:** Double-check you copied the full anon key
- **Fix:** No extra spaces or quotes in `.env`
- **Fix:** Make sure Supabase project is active

### Variables not loading
- **Fix:** File must be named `.env` (not `.env.txt`)
- **Fix:** Must be in same folder as `package.json`
- **Fix:** **Restart dev server** after changes

## Still Having Issues?

1. Check `.env` file location: `/Users/limkokwingsl/Desktop/LIMSOLAR/.env`
2. Check file format: No quotes, no spaces around `=`
3. Verify values: Test in Supabase dashboard
4. Restart server: Always restart after editing `.env`

## Need Help?

See `ENV_SETUP_GUIDE.md` for detailed instructions.
