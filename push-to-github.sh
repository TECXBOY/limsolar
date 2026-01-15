#!/bin/bash

# Script to push Lim Solar website to GitHub
# Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME REPO_NAME

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME REPO_NAME"
    echo "Example: ./push-to-github.sh johndoe limsolar-website"
    exit 1
fi

GITHUB_USER=$1
REPO_NAME=$2

echo "🚀 Setting up GitHub repository..."
echo "Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

# Remove any existing remote
git remote remove origin 2>/dev/null || true

# Add new remote
echo "📡 Adding remote repository..."
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository: https://github.com/$GITHUB_USER/$REPO_NAME"
else
    echo ""
    echo "❌ Failed to push. Make sure:"
    echo "   1. Repository exists on GitHub"
    echo "   2. You have access to the repository"
    echo "   3. You're authenticated (use GitHub CLI or Personal Access Token)"
fi
