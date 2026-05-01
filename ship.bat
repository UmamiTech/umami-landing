@echo off
REM Double-click to ship your changes to umami.com.ph.
REM This commits everything, pushes to GitHub, and Vercel auto-deploys to production.

cd /d "%~dp0"

echo.
echo ============================================
echo   Shipping changes to umami.com.ph
echo ============================================
echo.

REM Show what's about to ship
echo Files changed since last ship:
git status --short
echo.

REM Bail if nothing to ship
git diff --quiet HEAD 2>nul
if not errorlevel 1 (
  git diff --cached --quiet
  if not errorlevel 1 (
    REM Check for untracked files
    for /f %%i in ('git ls-files --others --exclude-standard ^| find /c /v ""') do set UNTRACKED=%%i
    if "!UNTRACKED!"=="0" (
      echo Nothing to ship. No changes since last commit.
      echo.
      pause
      exit /b 0
    )
  )
)

REM Ask for a short description
set /p MSG="What did you change? (one line, then Enter): "
if "%MSG%"=="" set MSG=Update landing page content

REM Pre-flight build check so we don't push broken code
echo.
echo Running build check before push...
call npm run build
if errorlevel 1 (
  echo.
  echo BUILD FAILED. Fix the errors above before shipping.
  echo Nothing has been pushed - your changes are still local.
  echo.
  pause
  exit /b 1
)

echo.
echo Build passed. Committing and pushing...
echo.

git add -A
git commit -m "%MSG%"
if errorlevel 1 (
  echo Commit failed. See error above.
  pause
  exit /b 1
)

git push origin main
if errorlevel 1 (
  echo Push failed. See error above.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   SHIPPED. Vercel is deploying now.
echo   Live at: https://umami.com.ph
echo   Watch deploy: https://vercel.com/umamitechs-projects/umami-landing
echo   Usually takes about 60 seconds.
echo ============================================
echo.

pause
