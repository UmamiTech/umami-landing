@echo off
REM Double-click to start the local dev server.
REM Open http://localhost:3000 in your browser to see live edits.

cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies for the first time...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Press any key to close.
    pause >nul
    exit /b 1
  )
)

echo.
echo ============================================
echo   Umami Landing - Local Dev Server
echo   Open: http://localhost:3000
echo   Press Ctrl+C in this window to stop
echo ============================================
echo.

call npm run dev
