# Quick Admin Account Setup

## Step 1: Set Up Supabase (If Not Done)

Follow `SUPABASE_SETUP.md` to:
1. Create Supabase project
2. Run database schema
3. Get API credentials
4. Create `.env` file

## Step 2: Create Your Admin Account

### Method 1: Via Supabase Dashboard (Easiest)

1. Go to your Supabase project → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: your-admin-email@example.com
   - **Password**: (create a strong password)
   - ✅ **Auto Confirm User**: Check this box
4. Click **"Create user"**
5. Copy the **User UID** (you'll see it in the user list)

### Method 2: Via Website Registration

1. Start dev server: `npm run dev`
2. Go to http://localhost:5173/register
3. Register with your email
4. Then update role in database (see Step 3)

## Step 3: Set Admin Role

1. Go to Supabase → **SQL Editor**
2. Run this query (replace with YOUR email):

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

3. Click **"Run"**
4. Verify it worked:

```sql
SELECT email, role FROM profiles WHERE email = 'your-email@example.com';
```

You should see `role: admin`

## Step 4: Log In and Test

1. Go to http://localhost:5173/login
2. Log in with your admin credentials
3. You should see:
   - "Admin" link in the navbar (yellow text)
   - Access to `/admin` dashboard
   - Ability to manage all applications

## Step 5: Cross-Device Login

Supabase automatically handles this! Just:

1. **On any device/browser**: Go to your site
2. **Log in** with the same admin credentials
3. **You'll be logged in** on that device
4. **Sessions persist** until you log out or session expires

### Session Duration

- Default: 1 hour
- To change: Supabase Dashboard → Authentication → Settings → JWT expiry
- Increase for longer sessions (e.g., 86400 = 24 hours)

## Troubleshooting

### "Access Denied" on Admin Page

**Check your role:**
```sql
SELECT email, role FROM profiles WHERE email = 'your-email@example.com';
```

**If role is NULL or 'user', fix it:**
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

### Can't See Admin Link

1. Make sure you're logged in
2. Refresh the page
3. Check browser console for errors
4. Verify role in database (see above)

### Not Logged In on Another Device

1. Make sure you're using the same Supabase project URL
2. Log in on each device separately
3. Sessions are per-device, but account is shared

## Security Tips

1. **Use strong password** for admin account
2. **Don't share admin credentials**
3. **Limit admin accounts** - only create for trusted users
4. **Enable email confirmations** in production
5. **Use 2FA** if available (Supabase supports this)

## Creating Additional Admin Accounts

To make another user an admin:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'another-user@example.com';
```

## Removing Admin Access

```sql
UPDATE profiles
SET role = 'user'
WHERE email = 'user@example.com';
```
