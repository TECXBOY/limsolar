#!/bin/bash

# Auto-save script for Lim Solar project
# Usage: ./auto-save.sh "Your commit message"

MESSAGE=${1:-"Auto-save: Updates $(date '+%Y-%m-%d %H:%M:%S')"}

echo "🔄 Auto-saving to GitHub..."

# Add all changes
git add .

# Commit with message
git commit -m "$MESSAGE"

# Push to GitHub
git push origin main

echo "✅ Changes saved to GitHub successfully!"
