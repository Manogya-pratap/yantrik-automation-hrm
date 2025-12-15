import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

function LoginCard({ onLogin, msg }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const input = document.getElementById("username-input");
    if (input) input.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3b0a18, #7b1e3c, #a83250)",
        padding: "20px",
      }}
    >
      {/* ===== COMPANY HEADING (OUTSIDE CARD) ===== */}
      <div
        className="text-center"
        style={{
          marginBottom: "65px",
          marginTop: "-90px", // move slightly upward
        }}
      >
        <h1
          style={{
            fontWeight: "900",
            fontSize: "60px", // BIGGER TEXT
            letterSpacing: "1.6px",
            marginBottom: "20px",
            textTransform: "uppercase",

            /* STRONGER GRADIENT */
            background:
              "linear-gradient(135deg, #ffffff 0%, #ffd6dd 30%, #ff9fb3 60%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",

            /* SUBTLE GLOW */
            //   textShadow:
            //   "0 0 12px rgba(255, 180, 200, 0.35), 0 0 24px rgba(255, 120, 150, 0.25)",
          }}
        >
          YANTRIK Automation Pvt. Ltd.
        </h1>

        <div
          style={{
            fontSize: "15px",
            fontWeight: "500",
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}
        >
          Industrial Automation • Smart Engineering Solutions
        </div>
      </div>

      {/* ===== LOGIN CARD ===== */}
      <Card
        style={{
          width: "380px",
          padding: "28px",
          borderRadius: "14px",
          boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
          background: "#ffffff",
        }}
      >
        <h4
          className="text-center mb-3"
          style={{
            fontWeight: "700",
            color: "#3b0a18",
            letterSpacing: "0.5px",
          }}
        >
          Secure Login
        </h4>

        {msg && <p className="text-danger text-center">{msg}</p>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username-input"
              autoComplete="off"
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "#7b1e3c",
              border: "none",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            Login
          </Button>
        </Form>

        <div
          style={{
            fontSize: "12px",
            marginTop: "14px",
            color: "#555",
            textAlign: "center",
          }}
        >
          <b>Demo Users:</b> HR / MD / ADMIN1 / ADMIN2
        </div>
      </Card>
    </div>
  );
}

export default LoginCard;
