# 🏥 CareAide - Healthcare Companion

[![Deploy Status](https://img.shields.io/badge/deploy-ready-brightgreen)](https://github.com/yourusername/careaide-app)
[![PWA](https://img.shields.io/badge/PWA-enabled-blue)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Made in India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-orange)](https://github.com/yourusername/careaide-app)

**🌐 Live Demo:** [https://your-app-name.netlify.app](#) _(Deploy to get your URL)_

A Progressive Web App (PWA) for rural healthcare deployment under India's UBA (Unnat Bharat Abhiyan) scheme.

---

## ✨ Features

✅ **Mode-Based System**
- **Elder Mode**: Simplified interface for elderly self-care
- **Caregiver Mode**: Full features for family caregivers  
- **ASHA Mode**: Multi-elder management for health workers

✅ **Core Functionality**
- 💊 Medication reminders with notifications
- 🏥 Vital tracking (BP, Sugar, Water, Steps)
- 👨‍👩‍👧‍👦 Family member management
- 🚨 SOS Emergency with GPS location
- 📊 Health reports & analytics
- 💾 Data export/backup (JSON, Email)

✅ **Accessibility**
- 🌐 7 Indian languages (EN, HI, TA, TE, BN, MR, KN)
- 📴 Works completely offline
- 📱 Installable as mobile app (PWA)
- ♿ Large buttons for elderly users
- 🎨 Clean white interface with high contrast

---

## 🚀 Quick Deploy to GitHub & Go Live

### **Step 1: Upload to GitHub** (2 minutes)

**Option A: GitHub Desktop (Easiest)**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Add your project folder
3. Click "Publish repository"
4. Done! ✅

**Option B: Terminal**
```bash
git init
git add .
git commit -m "Initial commit: CareAide PWA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/careaide-app.git
git push -u origin main
```

### **Step 2: Deploy on Netlify** (3 minutes)

**Method 1: Drag & Drop (Fastest!)**
```bash
npm run build
```
- Go to [app.netlify.com/drop](https://app.netlify.com/drop)
- Drag the `dist` folder
- Get instant live URL! 🎉

**Method 2: Connect GitHub (Auto-Deploy)**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. "New site from Git" → Select your repo
4. Build: `npm run build`, Publish: `dist`
5. Deploy! Live in 2 minutes! 🚀

**Your app is now live at:** `https://your-app-name.netlify.app`

📚 **See [DEPLOY_STEPS.md](DEPLOY_STEPS.md) for detailed instructions**  
📚 **Open [DEPLOYMENT_GUIDE.html](DEPLOYMENT_GUIDE.html) for visual guide**

---

## 🚀 How to Run Offline (Demo/Prototype)

### **Method 1: Python Server (Easiest)**

1. **Build the project first:**
```bash
npm install
npm run build
```

2. **Navigate to dist folder:**
```bash
cd dist
```

3. **Start Python server:**

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

4. **Open browser:**
```
http://localhost:8000
```

---

### **Method 2: Node.js http-server**

1. **Install http-server globally:**
```bash
npm install -g http-server
```

2. **Build and serve:**
```bash
npm run build
cd dist
http-server -p 8000
```

3. **Open browser:**
```
http://localhost:8000
```

---

### **Method 3: VS Code Live Server**

1. **Install Extension:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search "Live Server"
   - Install by Ritwick Dey

2. **Run:**
```bash
npm run build
```

3. **Right-click** `dist/index.html` → **"Open with Live Server"**

---

### **Method 4: Direct File (Limited Features)**

```bash
npm run build
```

Then double-click `dist/index.html` in file explorer.

⚠️ **Note:** Some features won't work with `file://` protocol (localStorage might have issues, no service worker)

---

## 📱 Install as Mobile PWA

### **On Android (Chrome):**

1. **Find your computer's IP address:**
   - Windows: `ipconfig` in CMD
   - Mac/Linux: `ifconfig` in Terminal
   - Look for something like `192.168.1.100`

2. **Start server on your computer:**
```bash
cd dist
python -m http.server 8000
```

3. **On your Android phone:**
   - Make sure phone is on **same WiFi** as computer
   - Open Chrome browser
   - Go to: `http://YOUR_COMPUTER_IP:8000` (e.g., `http://192.168.1.100:8000`)

4. **Install the app:**
   - Tap **⋮** (three dots menu)
   - Select **"Install app"** or **"Add to Home Screen"**
   - App icon appears on home screen!

5. **Use offline:**
   - Once installed, works without internet
   - All data stored locally on phone

### **On iPhone (Safari):**

1. Follow steps 1-3 above

2. **Install:**
   - Tap **Share** button (square with arrow up)
   - Scroll and tap **"Add to Home Screen"**
   - Tap **"Add"**

3. App works offline!

---

## 🎯 Quick Start Guide

### **Development Mode:**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to URL shown (usually http://localhost:5173)
```

### **Production Build:**

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

---

## 📦 Creating a Portable Demo

### **Option A: Share Built Folder**

1. Build the project:
```bash
npm run build
```

2. **Zip the `dist` folder**

3. Share with others - they can:
   - Unzip it
   - Run any server method above
   - Or double-click `index.html`

### **Option B: Create USB Demo Stick**

1. Build the project
2. Copy `dist` folder to USB drive
3. Include a `START.bat` file (Windows):

```batch
@echo off
echo Starting CareAide Demo...
cd dist
python -m http.server 8000
echo.
echo Open browser to: http://localhost:8000
pause
```

4. Double-click `START.bat` to run demo

### **Option C: Cloud Deploy (Free)**

**Deploy to Netlify (Free):**

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop `dist` folder
3. Get a free URL like `careaide-demo.netlify.app`
4. Share URL - works on any device!

**Deploy to Vercel (Free):**

```bash
npm install -g vercel
npm run build
cd dist
vercel
```

**Deploy to GitHub Pages (Free):**

1. Push code to GitHub
2. Go to Settings → Pages
3. Select `dist` folder
4. Get URL like `username.github.io/careaide`

---

## 🌐 Features

- **Elder Mode**: Simplified interface for elderly
- **Caregiver Mode**: Full features for family
- **ASHA Mode**: Multi-elder management
- **7 Languages**: EN, HI, TA, TE, BN, MR, KN
- **Offline-First**: Works without internet
- **PWA**: Install as mobile app
- **SOS Emergency**: GPS + SMS alerts
- **Data Export**: Download/email backups

---

## 📱 System Requirements

### **Minimum:**
- Modern browser (Chrome 90+, Safari 14+, Firefox 88+)
- JavaScript enabled
- LocalStorage enabled
- 50MB free space

### **Recommended:**
- Android 8+ or iOS 13+
- GPS/Location services (for SOS)
- Camera (for future features)

---

## 🔧 Troubleshooting

### **"Cannot access localStorage"**
- Use a server (not file://)
- Check browser privacy settings
- Try incognito mode

### **App not installing on phone**
- Must use HTTPS or localhost
- Check browser supports PWA
- Try Chrome on Android

### **Translations not working**
- Clear browser cache
- Check language is selected in Settings
- Reload the page

### **SOS not working**
- Enable location permissions
- Check GPS is on
- Must have emergency contacts added

---

## 📄 License

MIT License - Free for educational and healthcare use

---

## 🇮🇳 Made for India

Built for rural healthcare under UBA (Unnat Bharat Abhiyan) scheme.

**Support:** careaide@example.com  
**Version:** 1.0.0  
**Last Updated:** 2024

---

## 💡 Tips for Demo

1. **Test all 3 modes** (Elder, Caregiver, ASHA)
2. **Switch languages** to show translation
3. **Add sample data** before demo
4. **Show SOS feature** (don't actually send SMS)
5. **Export data** to show backup feature
6. **Install on phone** for full effect

---

**Quick Demo Script:**

1. Open app → Select ASHA mode
2. Add an elder with details
3. Add reminder for that elder
4. Switch to Family tab → Add family member
5. Switch to Health tab → Log vitals
6. Go to Reports → Show summary
7. Change language → Everything translates
8. Settings → Export data
9. Show on phone as installed PWA

---

Enjoy using CareAide! 🏥💙
