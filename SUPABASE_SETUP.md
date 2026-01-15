# Supabase Setup Guide for Lim Solar

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: limsolar-website (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine to start
5. Click "Create new project"
6. Wait 2-3 minutes for project to initialize

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `database-schema.sql` file
4. Click "Run" (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 4: Configure Environment Variables

1. In your project root, create a `.env` file:
   ```bash
   touch .env
   ```

2. Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Replace with your actual values from Step 2

## Step 5: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Under **Email Auth**, you can configure:
   - **Enable email confirmations**: Turn OFF for development (turn ON for production)
   - **Secure email change**: Optional
4. Click "Save"

## Step 6: Create Your Admin Account

### Option A: Create via Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: your-admin-email@example.com
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this (so you don't need email confirmation)
4. Click "Create user"
5. Copy the **User UID** (you'll need this)

### Option B: Create via Website Registration

1. Start your dev server: `npm run dev`
2. Go to http://localhost:5173/register
3. Register with your admin email
4. After registration, you'll need to update the role in Supabase (see below)

## Step 7: Set Admin Role in Database

1. Go to **SQL Editor** in Supabase
2. Run this query (replace `YOUR_USER_EMAIL` with your admin email):

```sql
-- Update your user to admin role
UPDATE profiles
SET role = 'admin'
WHERE email = 'YOUR_USER_EMAIL@example.com';
```

Or if you have the User UID from Step 6:

```sql
-- Update user to admin using UID
UPDATE profiles
SET role = 'admin'
WHERE id = 'YOUR_USER_UID_HERE';
```

3. Click "Run"
4. Verify it worked:
```sql
-- Check your admin status
SELECT email, role FROM profiles WHERE role = 'admin';
```

## Step 8: Test Authentication

1. Restart your dev server:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. Go to http://localhost:5173
3. Click "Login"
4. Log in with your admin credentials
5. You should see:
   - "Dashboard" link in navbar
   - "Admin Dashboard" link (if you're admin)
   - Your name in the dashboard

## Step 9: Verify Admin Access

1. After logging in, go to `/admin` (or check navbar for admin link)
2. You should see the admin dashboard
3. If you see "Access Denied", double-check:
   - Your profile role is set to 'admin' in database
   - You're logged in with the correct account
   - Refresh the page

## Step 10: Cross-Device Authentication

Supabase automatically handles cross-device authentication! Here's how:

1. **Session Storage**: Supabase stores sessions in localStorage (browser) or secure storage (mobile)
2. **Session Persistence**: Sessions persist across browser tabs and devices when you:
   - Log in on one device
   - Use the same browser/account on another device
3. **Session Duration**: Default is 1 hour, but can be configured

### To Stay Logged In Across Devices:

1. Make sure you're using the same Supabase project URL
2. Log in on each device with the same credentials
3. Sessions are independent per device, but your account is the same

### Configure Session Duration (Optional):

1. Go to **Authentication** → **Settings**
2. Under **JWT expiry**, set your preferred duration
3. Default: 3600 seconds (1 hour)
4. For longer sessions, increase this value

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists in project root
- Check that variables start with `VITE_`
- Restart dev server after creating `.env`

### "Error fetching profile"
- Make sure you ran the database schema SQL
- Check that `profiles` table exists
- Verify RLS policies are set correctly

### "Access Denied" on admin pages
- Verify your role is 'admin' in database:
  ```sql
  SELECT email, role FROM profiles WHERE email = 'your-email@example.com';
  ```
- If role is NULL or 'user', update it:
  ```sql
  UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
  ```

### Can't log in
- Check email/password are correct
- Verify email authentication is enabled in Supabase
- Check browser console for errors
- Make sure Supabase URL and key are correct in `.env`

## Security Notes

1. **Never commit `.env` file** - it's in `.gitignore`
2. **Use environment variables in production** (Vercel, etc.)
3. **Enable email confirmations** in production
4. **Use strong passwords** for admin accounts
5. **Limit admin accounts** - only create admin roles for trusted users

## Next Steps

- Set up admin dashboard to manage applications
- Configure email notifications (optional)
- Set up custom domain (optional)
- Deploy to Vercel with environment variables
