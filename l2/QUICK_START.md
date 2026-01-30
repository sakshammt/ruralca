# 🚀 CareAide - Quick Start Guide

## ⚡ Fastest Way to Run (3 Steps)

### **Windows Users:**

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Double-click:** `RUN_DEMO.bat`

3. **Browser opens automatically** at `http://localhost:8000`

---

### **Mac/Linux Users:**

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Make script executable and run:**
   ```bash
   chmod +x RUN_DEMO.sh
   ./RUN_DEMO.sh
   ```

3. **Browser opens** at `http://localhost:8000`

---

## 📱 View on Your Phone

### **After starting the server above:**

1. **Find your computer's IP:**
   - **Windows:** Open CMD, type `ipconfig`, look for "IPv4 Address"
   - **Mac:** Open Terminal, type `ifconfig | grep inet`, look for 192.168.x.x
   - **Linux:** Type `hostname -I`

2. **Connect phone to SAME WiFi as computer**

3. **Open phone browser** and go to:
   ```
   http://YOUR_IP_ADDRESS:8000
   ```
   Example: `http://192.168.1.100:8000`

4. **Install as App:**
   - **Android:** Tap menu (⋮) → "Install app"
   - **iPhone:** Tap Share → "Add to Home Screen"

---

## 🎯 Alternative Methods

### **Method 1: Python (Most Common)**

```bash
npm run build
cd dist
python -m http.server 8000
```

Then open: `http://localhost:8000`

---

### **Method 2: Node.js**

```bash
npm install -g http-server
npm run build
cd dist
http-server -p 8000
```

Then open: `http://localhost:8000`

---

### **Method 3: VS Code**

1. Install "Live Server" extension
2. Build: `npm run build`
3. Right-click `dist/index.html` → "Open with Live Server"

---

### **Method 4: Development Mode (for coding)**

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` with hot reload

---

## 📦 Share Your Demo

### **Option 1: USB Drive**

1. Build: `npm run build`
2. Copy `dist` folder + `RUN_DEMO.bat` to USB
3. Give to others - they double-click `RUN_DEMO.bat`

---

### **Option 2: Free Cloud Hosting**

**Netlify (Easiest):**
1. Go to [netlify.com](https://netlify.com)
2. Drag `dist` folder onto page
3. Get free URL to share

**Vercel:**
```bash
npm install -g vercel
npm run build
cd dist
vercel --prod
```

**GitHub Pages:**
1. Push to GitHub
2. Settings → Pages → Deploy from `dist`

---

## 🎭 Demo the App

### **Test Flow:**

1. **Select ASHA Worker mode**
2. **Add an elder:**
   - Name: "Ramesh Kumar"
   - Age: 72
   - Village: "Belur"
   - Add emergency contact

3. **Add a reminder:**
   - Medicine reminder
   - Time: 8:00 AM
   - Mark as done

4. **Log vitals:**
   - Blood Pressure: 120/80
   - Blood Sugar: 95

5. **Add family member:**
   - Name: "Priya Kumar"
   - Relation: Daughter
   - Mark as emergency contact

6. **View Reports:**
   - See elder's adherence
   - Download report

7. **Change language:**
   - Settings → Language → हिंदी
   - Entire app translates!

8. **Export data:**
   - Settings → Download Data
   - Save backup

---

## 🔧 Troubleshooting

### **"npm: command not found"**
Install Node.js from [nodejs.org](https://nodejs.org)

### **"Python: command not found"**
Install Python from [python.org](https://python.org)

### **Port 8000 already in use**
Change port number:
```bash
python -m http.server 8080
```

### **Can't access from phone**
- Check phone on same WiFi
- Check firewall isn't blocking port 8000
- Try phone's IP on computer first

### **App not installing on phone**
- Must use IP address (not localhost)
- Android needs Chrome
- iPhone needs Safari

---

## 📊 File Size

- **Full app:** ~321 KB (gzipped: 87 KB)
- **Loads in:** < 2 seconds on 3G
- **Works offline:** Yes, after first load
- **Storage used:** < 5 MB with data

---

## ✅ What Works Offline

✅ All app features  
✅ Add/edit reminders  
✅ Log vitals  
✅ Add family members  
✅ View reports  
✅ Change language  
✅ Export data  

⚠️ **Needs internet:**
- First-time loading
- SOS SMS (uses phone's SMS, not internet)
- Email sharing (if using web email)

---

## 🎓 Training Materials

### **For ASHA Workers:**

1. **Day 1:** Mode selection, adding elders
2. **Day 2:** Setting reminders, logging vitals
3. **Day 3:** Family contacts, SOS setup
4. **Day 4:** Reports, data export
5. **Day 5:** Language selection, troubleshooting

### **For Elders:**

- Use **Elder Mode** (simplified interface)
- Large buttons, fewer options
- Voice reminders enabled
- Daily health tips

### **For Caregivers:**

- Use **Caregiver Mode** (full features)
- Remote monitoring
- Handoff notes between shifts
- Medicine inventory tracking

---

## 📞 Support

**Questions?** Check README.md for detailed documentation

**Issues?** The app stores all data locally - no data loss!

**Updates?** Pull latest code and rebuild

---

## 🇮🇳 Languages Available

🇬🇧 English  
🇮🇳 हिंदी (Hindi)  
🇮🇳 தமிழ் (Tamil)  
🇮🇳 తెలుగు (Telugu)  
🇮🇳 বাংলা (Bengali)  
🇮🇳 मराठी (Marathi)  
🇮🇳 ಕನ್ನಡ (Kannada)  

---

**Enjoy using CareAide!** 🏥💙

Built with ❤️ for rural India healthcare
