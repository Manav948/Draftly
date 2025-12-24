#!/bin/bash

# SuperProductive - Vercel Deployment Helper Script
# This script helps prepare your application for Vercel deployment

set -e

echo "🚀 SuperProductive - Vercel Deployment Helper"
echo "=============================================="
echo ""

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✓ Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm -v)
echo "✓ npm version: $NPM_VERSION"

echo ""
echo "📋 Checking project setup..."
echo ""

# Check for required files
FILES_TO_CHECK=(
  "package.json"
  "next.config.ts"
  "tsconfig.json"
  "prisma/schema.prisma"
  "vercel.json"
  ".env.example"
  "DEPLOYMENT.md"
  "PRODUCTION_CHECKLIST.md"
)

for file in "${FILES_TO_CHECK[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file exists"
  else
    echo "✗ $file missing"
  fi
done

echo ""
echo "🔐 Environment Variable Setup"
echo "=============================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
  echo "⚠ .env.local found (this should not be committed)"
else
  echo "✓ No .env.local in repository (good)"
fi

echo ""
echo "To set up your Vercel deployment, follow these steps:"
echo ""
echo "1. Create a .env.local file with the following variables:"
echo "   DATABASE_URL=<your-postgres-url>"
echo "   NEXTAUTH_SECRET=<generate-with-openssl>"
echo "   NEXTAUTH_URL=http://localhost:3000 (development)"
echo "   GOOGLE_CLIENT_ID=<from-google-console>"
echo "   GOOGLE_CLIENT_SECRET=<from-google-console>"
echo "   GITHUB_ID=<from-github-settings>"
echo "   GITHUB_SECRET=<from-github-settings>"
echo "   UPLOADTHING_TOKEN=<from-uploadthing-dashboard>"
echo ""
echo "2. To generate NEXTAUTH_SECRET, run:"
echo "   openssl rand -base64 32"
echo ""
echo "3. Install dependencies:"
echo "   npm install"
echo ""
echo "4. Test build locally:"
echo "   npm run build"
echo ""
echo "5. Push to GitHub and deploy to Vercel"
echo ""
echo "6. Set environment variables in Vercel Dashboard:"
echo "   - All the variables above (update NEXTAUTH_URL to your Vercel domain)"
echo "   - Ensure no .env.local is committed"
echo ""

echo "📖 Documentation created:"
echo "   - DEPLOYMENT.md - Step-by-step deployment guide"
echo "   - PRODUCTION_CHECKLIST.md - Complete readiness checklist"
echo "   - .env.example - Example environment variables"
echo ""

echo "✓ Setup check complete!"
