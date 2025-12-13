Below is a **professional, clean, production-ready README.md** for your HRM Employee Directory project.
You can copy–paste it directly into your repository.
If you want, I can also **include screenshots, badges, or deployment links**.

---

# 🌟 Yantrik Automation – Employee Directory (HRM)

A secure and modern **Employee Information Management System** built using:

- **React + Bootstrap** (Frontend UI)
- **Node.js + Express** (Backend API)
- **Google Sheets API** (Live employee data source)
- **JWT Authentication** (Secure login for HR/Admin)
- **Render Deployment** (Backend & Frontend hosting)

The system allows HR/Admin to log in and:

✔ View all employees
✔ Search by name or designation
✔ View full employee profile
✔ Scroll through detailed information
✔ Fetch real-time data from Google Sheets
✔ Secure access using JWT tokens

---

## 🚀 Live Demo

(You can add your links here after deployment)

**Frontend:** [https://your-frontend-url](https://your-frontend-url)
**Backend API:** [https://your-backend-url](https://your-backend-url)

---

# 📂 Project Structure

```
YntrkEmplydtil/
│
├── backend/                  # NodeJS + Express backend
│   ├── server.js
│   ├── package.json
│   ├── .env (NOT COMMITTED)
│
├── frontend_yntrkemplydtil/  # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env (NOT COMMITTED)
│
├── .gitignore
└── README.md
```

---

# ✨ Features

### 🔐 Secure Login

- HR, MD, and Admin roles
- JWT-based authentication
- Logged-in state persists until logout

### 📊 Google Sheets Integration

- Live data fetching using Google Sheets API
- First + Middle + Last Name automatically combined into **Full Name**
- Handles duplicate sheet headers safely
- Supports any sized sheet dynamically

### 👨‍💼 Employee Directory

- Search employees by name or designation
- Scrollable, responsive employee list
- Click on "View Details" to get full employee profile

### 🧾 Employee Detail Page

- Gradient header with name + designation
- Scrollable table of all sheet columns
- Sticky left labels
- Smooth animations and UI enhancements

---

# 🛠️ Technology Stack

### **Frontend**

- React
- Bootstrap
- Custom CSS (gradient UI, animations)
- Fetch API for backend communication

### **Backend**

- Node.js
- Express.js
- Google Sheets API v4
- JWT Authentication
- CORS Enabled

---

# 🔧 Backend Environment Variables

Create a `.env` file inside **backend/**:

```
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_CERT_URL=cert_url

SPREADSHEET_ID=your_google_sheet_id
SHEET_NAME=Form responses 1

JWT_SECRET=your_secret_key
```

⚠ **Do NOT commit this file.**
It must be added in **Render Environment Variables**.

---

# 🔧 Frontend Environment Variables

Create a `.env` file inside **frontend_yntrkemplydtil/**:

```
REACT_APP_API=https://your-backend-url.onrender.com
```

---

# 🚀 Running Locally

### 1️⃣ Install Backend

```
cd backend
npm install
npm start
```

Server runs on:
👉 [http://localhost:4000](http://localhost:4000)

---

### 2️⃣ Install Frontend

```
cd ../frontend_yntrkemplydtil
npm install
npm start
```

Frontend runs on:
👉 [http://localhost:3000](http://localhost:3000)

---

# 🌍 Deployment Guide

## ▶ Deploy Backend on Render

1. Go to [https://render.com](https://render.com)
2. Create “New Web Service”
3. Select **backend folder**
4. Set:

   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

5. Add all `.env` variables manually
6. Deploy 🚀

---

## ▶ Deploy Frontend on Render

1. Create **Static Site**
2. Select `frontend_yntrkemplydtil` folder
3. Set:

   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build/`

4. Add:

   ```
   REACT_APP_API=https://your-render-backend-url
   ```

---

# 🔒 Security Notes

- `service-account.json` must **never** be committed to GitHub
- Use `.env` for all API secrets
- `.gitignore` already blocks sensitive files
- Render handles environment variables securely

---

# 🙌 Credits

Developed by **Yantrik Automation**
For HR/Admin Employee Management Internal Use.

---

# 📞 Support

If you need help with:

- Deployment
- Fixing Google Sheet permissions
- Adding new features
- Docker deployment
- Full redesign

Feel free to reach out anytime! 🚀

---

If you want, I can also create:

✅ A **logo** for your HRM system
✅ A **beautiful README header banner**
✅ A **deployment architecture diagram**
Just tell me!
