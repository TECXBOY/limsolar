# .env File Setup Guide

## Current Status

Your `.env` file exists but needs to be filled with your Supabase credentials.

## Step 1: Get Your Supabase Credentials

1. Go to https://supabase.com and log in
2. Select your project (or create one)
3. Go to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 2: Edit .env File

Open `.env` file in your project root and add:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:**
- Replace `your-project-id` with your actual project ID
- Replace `your-anon-key-here` with your actual anon key
- **NO quotes** around the values
- **NO spaces** around the `=` sign
- Must start with `VITE_` (required for Vite)

## Step 3: Verify Format

Your `.env` file should look exactly like this (with your values):

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.abcdefghijklmnopqrstuvwxyz1234567890
```

## Step 4: Restart Dev Server

**CRITICAL:** After creating/editing `.env`, you MUST restart the dev server:

1. Stop current server: Press `Ctrl+C` in terminal
2. Start again: `npm run dev`

Environment variables are only loaded when the server starts!

## Step 5: Verify It's Working

After restarting, check:
1. No "Missing Supabase environment variables" errors
2. No red error banner at top of page
3. Can access login/register pages
4. Browser console shows no Supabase connection errors

## Common Errors & Fixes

### Error: "Missing Supabase environment variables"
- **Fix:** Make sure `.env` file exists and has correct variable names
- **Fix:** Restart dev server after creating `.env`

### Error: "Invalid API key"
- **Fix:** Double-check you copied the full anon key (it's very long)
- **Fix:** Make sure there are no extra spaces or quotes

### Error: "Failed to fetch" or network errors
- **Fix:** Check your Supabase URL is correct
- **Fix:** Make sure Supabase project is active
- **Fix:** Check internet connection

### Variables not loading
- **Fix:** File must be named exactly `.env` (not `env` or `.env.txt`)
- **Fix:** File must be in project root (same folder as `package.json`)
- **Fix:** Variables must start with `VITE_`
- **Fix:** Restart dev server after changes

## Quick Test

After setting up `.env` and restarting, open browser console and run:

```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
```

You should see your Supabase URL (not `undefined`).

## Still Having Issues?

1. **Check file location:** `.env` must be in `/Users/limkokwingsl/Desktop/LIMSOLAR/`
2. **Check file name:** Must be exactly `.env` (hidden file)
3. **Check format:** No quotes, no spaces around `=`
4. **Restart server:** Always restart after editing `.env`
5. **Check Supabase:** Make sure project is active and credentials are correct
