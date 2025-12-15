const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  token_uri: "https://oauth2.googleapis.com/token",
};

// Authenticate Google Sheets
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets.readonly"]
);

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Users
const USERS = {
  HR: {
    password: "hr123",
    role: "Human Resource",
    name: "Sir Tarun Kumar",
  },
  MD: {
    password: "md123",
    role: "Managing Director",
    name: "Sir Pankaj Kumar ",
  },
  ADMIN1: {
    password: "admin1123",
    role: "ADMIN",
    name: "System Administrator",
  },
  ADMIN2: {
    password: "admin2123",
    role: "ADMIN",
    name: "Admin Operator",
  },
};

// LOGIN API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!USERS[username] || USERS[username].password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ username, role: USERS[username].role }, JWT_SECRET, {
    expiresIn: "6h",
  });

  res.json({
    token,
    username,
    name: USERS[username].name,
    role: USERS[username].role,
  });
});

// Middleware for JWT auth
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// // GET SHEET DATA
// app.get("/api/data", authMiddleware, async (req, res) => {
//   try {
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: SHEET_NAME,
//     });

//     const rows = response.data.values;

//     if (!rows || rows.length === 0) {
//       return res.json({ headers: [], data: [] });
//     }

//     const headers = rows[0];
//     const data = [];

//     // Column index mapping based on YOUR sheet
//     const FIRST_NAME_COL = 2; // C
//     const MIDDLE_NAME_COL = 3; // D
//     const LAST_NAME_COL = 4; // E
//     const DESIGNATION_COL = 13; // N (0-based index → column 14 = index 13)

//     for (let i = 1; i < rows.length; i++) {
//       const row = rows[i];
//       let obj = {};

//       // Keep all raw columns
//       headers.forEach((h, index) => {
//         obj[h] = row[index] || "";
//       });

//       // Build Full Name
//       const first = row[FIRST_NAME_COL] || "";
//       const middle = row[MIDDLE_NAME_COL] || "";
//       const last = row[LAST_NAME_COL] || "";

//       obj.FullName = `${first} ${middle} ${last}`.replace(/\s+/g, " ").trim();

//       // Designation from column N
//       obj.Designation = row[DESIGNATION_COL] || "";

//       data.push(obj);
//     }

//     return res.json({ headers, data });
//   } catch (err) {
//     console.error("Google Sheets Fetch Error:", err);
//     return res.status(500).json({ error: "Failed to fetch sheet data" });
//   }
// });

app.get("/api/data", authMiddleware, async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.json({ headers: [], data: [] });
    }

    let headers = rows[0];
    const data = [];

    // FIX: ensure headers are UNIQUE
    const headerCount = {};
    headers = headers.map((h) => {
      let clean = h.trim() || "Column";

      if (!headerCount[clean]) {
        headerCount[clean] = 1;
        return clean;
      } else {
        headerCount[clean]++;
        return `${clean}_${headerCount[clean]}`; // make unique
      }
    });

    // Now mapping rows correctly
    const FIRST = 2; // C
    const MIDDLE = 3; // D
    const LAST = 4; // E
    const DESIGNATION = 13; // N

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const obj = {};

      // Store raw data WITH UNIQUE KEYS
      headers.forEach((headerName, colIndex) => {
        obj[headerName] = row[colIndex] || "";
      });

      // Build Full Name
      const f = row[FIRST] || "";
      const m = row[MIDDLE] || "";
      const l = row[LAST] || "";

      obj.FullName = `${f} ${m} ${l}`.replace(/\s+/g, " ").trim();
      obj.Designation = row[DESIGNATION] || "";

      data.push(obj);
    }

    return res.json({ headers, data });
  } catch (err) {
    console.error("Google Sheet Fetch Error:", err);
    return res.status(500).json({ error: "Failed to fetch sheet data" });
  }
});

// Test route for Render health checks
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Use Render port or fallback to 4000 locally
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

//app.listen(4000, () => console.log("Backend running on port 4000"));
