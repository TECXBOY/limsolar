# GitHub Repository Setup Guide

## Step 1: Create New GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `limsolar-website` (or your preferred name)
   - **Description**: "Professional solar energy website for Lim Solar"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **"Create repository"**

## Step 2: Copy Your Repository URL

After creating the repo, GitHub will show you commands. Copy the repository URL:
- It will look like: `https://github.com/YOUR_USERNAME/limsolar-website.git`
- Or SSH: `git@github.com:YOUR_USERNAME/limsolar-website.git`

## Step 3: Connect and Push to GitHub

Run these commands in your terminal (replace YOUR_USERNAME and REPO_NAME):

```bash
cd /Users/limkokwingsl/Desktop/LIMSOLAR

# Remove any existing remote (if any)
git remote remove origin 2>/dev/null || true

# Add your new GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Lim Solar website - Complete React app with Supabase integration"

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Verify

1. Go to your GitHub repository page
2. You should see all your files
3. Check that `.env` is NOT in the repository (it's in .gitignore)

## Important Notes

- ✅ `.env` file is already in `.gitignore` - your Supabase credentials won't be pushed
- ✅ `node_modules/` is ignored - won't be pushed
- ✅ All source code and configuration files will be pushed

## Troubleshooting

### "Repository not found"
- Check the repository URL is correct
- Make sure you have access to the repository
- Verify your GitHub username

### "Authentication failed"
- Use GitHub Personal Access Token instead of password
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### "Permission denied"
- Make sure you're logged into GitHub
- Check repository permissions

## Next Steps After Pushing

1. Set up GitHub Actions (already configured in `.github/workflows/ci.yml`)
2. Connect to Vercel for automatic deployments
3. Add environment variables in Vercel dashboard
4. Enable GitHub Pages (optional)
