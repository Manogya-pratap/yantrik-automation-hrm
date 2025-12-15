import React, { useEffect, useState } from "react";
import LoginCard from "./components/LoginCard";
import Dashboard from "./pages/Dashboard";
import "./theme.css";

const API = process.env.REACT_APP_API;

/* ===== SAFE LOCALSTORAGE GETTER ===== */
const safeGet = (key) => {
  const value = localStorage.getItem(key);
  if (!value || value === "undefined" || value === "null") return null;
  return value;
};

function App() {
  /* ===== AUTH STATE ===== */
  const [token, setToken] = useState(() => {
    const t = safeGet("token");
    return t ? t : null;
  });

  const [user, setUser] = useState(() => ({
    //username: safeGet("username"),
    role: safeGet("role"),
    name: safeGet("name"),
  }));

  /* ===== DATA STATE ===== */
  const [employees, setEmployees] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== FETCH DATA ===== */
  const fetchData = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (json.error === "Invalid token") {
        logoutUser();
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
    // eslint-disable-next-line
  }, [token]);

  /* ===== LOGIN ===== */
  const loginUser = async (creds) => {
    setMsg("");
    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });

      const json = await res.json();
      //const json = await res.json();
      console.log("LOGIN RESPONSE:", json);

      if (json.token) {
        localStorage.setItem("token", json.token);
        //localStorage.setItem("username", json.username);
        if (json.role) {
          localStorage.setItem("role", json.role);
        }

        if (json.name) {
          localStorage.setItem("name", json.name);
        } else {
          localStorage.removeItem("name");
        }

        setToken(json.token);
        setUser({
          //username: json.username,
          role: json.role,
          name: json.name,
        });
      } else {
        setMsg(json.error || "Invalid credentials");
      }
    } catch {
      setMsg("Login failed (server error)");
    }
  };

  /* ===== LOGOUT ===== */
  const logoutUser = () => {
    localStorage.clear();
    setToken(null);
    setUser({ username: null, role: null, name: null });
    setEmployees([]);
    setHeaders([]);
  };

  /* ===== NOT LOGGED IN ===== */
  if (!token) {
    return <LoginCard onLogin={loginUser} msg={msg} />;
  }

  /* ===== LOGGED IN ===== */
  return (
    <Dashboard
      employees={employees}
      headers={headers}
      loading={loading}
      onLogout={logoutUser}
      //username={user.username}
      role={user.role}
      name={user.name}
    />
  );
}

export default App;
