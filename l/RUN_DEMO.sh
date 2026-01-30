#!/bin/bash

echo "================================================"
echo "      CareAide - Healthcare Companion"
echo "================================================"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "[ERROR] dist folder not found!"
    echo ""
    echo "Please build the project first:"
    echo "  npm install"
    echo "  npm run build"
    echo ""
    exit 1
fi

echo "Starting local server..."
echo ""
echo "The app will open at: http://localhost:8000"
echo ""
echo "To view on mobile:"
echo "1. Find your computer's IP address (run 'ifconfig' or 'ipconfig')"
echo "2. Connect phone to same WiFi"
echo "3. Open browser on phone to: http://YOUR_IP:8000"
echo ""
echo "================================================"
echo ""

cd dist

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 to start server..."
    echo ""
    # Try to open browser (works on macOS and some Linux)
    if command -v open &> /dev/null; then
        open http://localhost:8000
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000
    fi
    python3 -m http.server 8000
# Check if Python is available
elif command -v python &> /dev/null; then
    echo "Using Python to start server..."
    echo ""
    python -m http.server 8000
else
    echo "[ERROR] Python not found!"
    echo ""
    echo "Please install Python or use another method:"
    echo "  - VS Code Live Server extension"
    echo "  - npm install -g http-server, then: http-server -p 8000"
    echo ""
    exit 1
fi
