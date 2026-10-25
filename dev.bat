@echo off
REM ============================================================
REM   Umami Landing - Local Dev Server
REM   Double-click to start. Ctrl+C in window to stop.
REM ============================================================

cd /d "%~dp0"

REM ---- 1. Check Node.js is installed ----
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo ERROR: Node.js is not installed or not on PATH.
  echo.
  echo Install it from https://nodejs.org/  ^(LTS version^),
  echo then re-run this file.
  echo.
  pause
  exit /b 1
)

REM ---- 2. Check / install dependencies ----
REM An interrupted install can leave node_modules existing but missing
REM the next binary. Detect that case explicitly instead of just checking
REM for the folder.
set NEEDS_INSTALL=0
if not exist "node_modules" set NEEDS_INSTALL=1
if not exist "node_modules\.bin\next.cmd" set NEEDS_INSTALL=1

if "%NEEDS_INSTALL%"=="1" (
  echo.
  echo Installing dependencies...  ^(30-60 seconds the first time^)
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo ============================================
    echo   npm install FAILED. Read errors above.
    echo ============================================
    echo.
    pause
    exit /b 1
  )
)

REM ---- 3. Start dev server ----
echo.
echo ============================================
echo   Umami Landing - Local Dev Server
echo   Open: http://localhost:3000
echo   Press Ctrl+C to stop
echo ============================================
echo.

REM ---- 3b. Tweaks design panel (only on a PC that has the craft skill) ----
REM Opens in its own minimised window. On the page, press Alt+T or click "Tweaks".
REM Skipped when a Tweaks server is already answering (e.g. dev.bat run twice).
set TWEAKS_UP=0
curl -s -o nul http://127.0.0.1:4791/state && set TWEAKS_UP=1
if exist "%USERPROFILE%\.claude\skills\craft\tweaks\server.mjs" if "%TWEAKS_UP%"=="0" start "Umami Tweaks" /min cmd /c npm run tweaks
if exist "%USERPROFILE%\.claude\skills\craft\tweaks\server.mjs" echo   Tweaks panel: press Alt+T on the page
echo.

call npm run dev

REM ---- 4. Pause on exit so user sees any errors ----
echo.
echo ============================================
echo   Dev server stopped.
echo ============================================
pause