import React,{ useEffect, useState } from "react";
import LoginCard from "./components/LoginCard";
import Dashboard from "./pages/Dashboard";
import "./theme.css";

const API = process.env.REACT_APP_API || "http://localhost:4000";

function App() {
  // Normalize stored token (guard against "undefined"/"null")
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(
    storedToken && storedToken !== "undefined" && storedToken !== "null"
      ? storedToken
      : null
  );

  const [employees, setEmployees] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Map raw sheet headers/data to objects that always include Name & Designation
  const normalizeData = (headersArr = [], dataArr = []) => {
    if (!headersArr || headersArr.length === 0) return [];

    // pick best keys (case-insensitive)
    const nameKey =
      headersArr.find((h) => /employee\s*name|full\s*name|name/i.test(h)) ||
      headersArr.find((h) => /name/i.test(h)) ||
      null;

    const designationKey =
      headersArr.find((h) =>
        /(designation|role|job\s*title|title|position|post)/i.test(h)
      ) || null;

    return dataArr.map((row) => {
      // row is already an object keyed by header names
      const obj = { ...row };

      // set standard fields for UI to use
      obj["Name"] = obj["Name"] || (nameKey ? obj[nameKey] : "") || "";
      obj["Designation"] =
        obj["Designation"] || (designationKey ? obj[designationKey] : "") || "";

      return obj;
    });
  };

  const fetchData = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (json.error === "Invalid token") {
        localStorage.removeItem("token");
        setToken(null);
        return;
      }

      setHeaders(json.headers);
      setEmployees(json.data);
    } catch {
      setMsg("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loginUser = async (creds) => {
    setMsg("");
    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const json = await res.json();
      if (json.token) {
        localStorage.setItem("token", json.token);
        setToken(json.token);
      } else {
        setMsg(json.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("login error:", err);
      setMsg("Login failed (server error)");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setEmployees([]);
    setHeaders([]);
  };

  // If not logged in -> show login card by default
  if (!token) {
    return <LoginCard onLogin={loginUser} msg={msg} />;
  }

  // Logged-in -> show Dashboard, pass logout handler
  return (
    <Dashboard
      employees={employees}
      headers={headers}
      onLogout={logoutUser}
      loading={loading}
    />
  );
}

export default App;
