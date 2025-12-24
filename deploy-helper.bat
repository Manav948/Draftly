@echo off
REM SuperProductive - Vercel Deployment Helper Script (Windows)

echo.
echo 🚀 SuperProductive - Vercel Deployment Helper
echo =============================================
echo.

REM Check Node.js version
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%

REM Check npm version
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✓ npm version: %NPM_VERSION%

echo.
echo 📋 Checking project setup...
echo.

REM Check for required files
setlocal enabledelayedexpansion
set "files=package.json next.config.ts tsconfig.json prisma\schema.prisma vercel.json .env.example DEPLOYMENT.md PRODUCTION_CHECKLIST.md"

for %%F in (%files%) do (
  if exist "%%F" (
    echo ✓ %%F exists
  ) else (
    echo ✗ %%F missing
  )
)

echo.
echo 🔐 Environment Variable Setup
echo ==============================
echo.

if exist ".env.local" (
  echo ⚠ .env.local found - make sure this is in .gitignore
) else (
  echo ✓ No .env.local in repository (good)
)

echo.
echo To set up your Vercel deployment, follow these steps:
echo.
echo 1. Create a .env.local file with the following variables:
echo    DATABASE_URL=^<your-postgres-url^>
echo    NEXTAUTH_SECRET=^<generate-with-openssl^>
echo    NEXTAUTH_URL=http://localhost:3000 (development)
echo    GOOGLE_CLIENT_ID=^<from-google-console^>
echo    GOOGLE_CLIENT_SECRET=^<from-google-console^>
echo    GITHUB_ID=^<from-github-settings^>
echo    GITHUB_SECRET=^<from-github-settings^>
echo    UPLOADTHING_TOKEN=^<from-uploadthing-dashboard^>
echo.
echo 2. To generate NEXTAUTH_SECRET on Windows, use:
echo    For PowerShell: [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(24))
echo    Or use an online generator: https://generate-secret.vercel.app/
echo.
echo 3. Install dependencies:
echo    npm install
echo.
echo 4. Test build locally:
echo    npm run build
echo.
echo 5. Test production server:
echo    npm run start
echo.
echo 6. Push to GitHub and deploy to Vercel
echo.
echo 7. Set environment variables in Vercel Dashboard:
echo    - All the variables above (update NEXTAUTH_URL to your Vercel domain)
echo    - Make sure no .env.local is committed to GitHub
echo.
echo 📖 Documentation created:
echo    - DEPLOYMENT.md - Step-by-step deployment guide
echo    - PRODUCTION_CHECKLIST.md - Complete readiness checklist
echo    - .env.example - Example environment variables
echo.
echo ✓ Setup check complete!
echo.
pause
