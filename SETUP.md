# Lim Solar Website - Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- GitHub account (for version control)
- Vercel account (for deployment)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run the SQL schema from `CONCEPTNOTE.MD` (Database Schema section)
3. Enable Email authentication in Authentication > Providers
4. Get your project URL and anon key from Settings > API

## Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Run Development Server

```bash
npm run dev
```

The site will be available at http://localhost:5173

## Step 5: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Lim Solar website setup"
```

## Step 6: Connect to GitHub

1. Create a new repository on GitHub
2. Add the remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/limsolar-website.git
git branch -M main
git push -u origin main
```

## Step 7: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `limsolar-website` repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Click "Deploy"

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel --prod
```

## Auto-Save to GitHub

### Option 1: Manual Script
```bash
./auto-save.sh "Your commit message"
```

### Option 2: NPM Script
```bash
npm run save
```

### Option 3: Watch Script (Auto-commits on file changes)
```bash
npm run watch:save
```

## Database Setup

Run the following SQL in your Supabase SQL Editor (from CONCEPTNOTE.MD):

1. Create tables: profiles, services, service_applications, contact_submissions
2. Insert default services
3. Set up Row Level Security policies
4. Create trigger for new user creation

## Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation works on all pages
- [ ] User can register new account
- [ ] User can login
- [ ] User can apply for services
- [ ] Dashboard shows applications
- [ ] Contact form submits successfully
- [ ] Protected routes redirect to login
- [ ] Mobile responsive design works

## Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check Supabase connection
- Verify all dependencies are installed

### Authentication Issues
- Verify Supabase email auth is enabled
- Check RLS policies are set correctly
- Ensure trigger function is created

### Deployment Issues
- Verify environment variables in Vercel dashboard
- Check build logs in Vercel
- Ensure Node.js version is 18+

## Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- Vercel Documentation: https://vercel.com/docs
- React Router Documentation: https://reactrouter.com
