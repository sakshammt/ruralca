@echo off
echo ================================================
echo       CareAide - Healthcare Companion
echo ================================================
echo.

REM Check if dist folder exists
if not exist "dist" (
    echo [ERROR] dist folder not found!
    echo.
    echo Please build the project first:
    echo   npm install
    echo   npm run build
    echo.
    pause
    exit
)

echo Starting local server...
echo.
echo The app will open at: http://localhost:8000
echo.
echo To view on mobile:
echo 1. Find your computer's IP address (run 'ipconfig')
echo 2. Connect phone to same WiFi
echo 3. Open browser on phone to: http://YOUR_IP:8000
echo.
echo ================================================
echo.

cd dist

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python to start server...
    echo.
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo [ERROR] Python not found!
    echo.
    echo Please install Python or use another method:
    echo   - VS Code Live Server extension
    echo   - npm install -g http-server, then: http-server -p 8000
    echo.
    pause
)
