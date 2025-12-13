import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

function LoginCard({ onLogin, msg }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Focus username on load
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
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #3b0a18, #7b1e3c, #a83250)",
      }}
    >
      <Card
        style={{
          width: "360px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        }}
      >
        <h3 className="text-center mb-3" style={{ fontWeight: "bold" }}>
          YANTRIK LOGIN
        </h3>

        {msg && <p className="text-danger text-center">{msg}</p>}

        <Form onSubmit={handleSubmit}>
          {/* Username */}
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

          {/* Password */}
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

          {/* Login Button */}
          <Button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "#7b1e3c",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </Form>

        {/* Demo Accounts */}
        <div style={{ fontSize: "12px", marginTop: "12px" }}>
          <b>Default Users:</b> HR / MD / ADMIN1 / ADMIN2
        </div>
      </Card>
    </div>
  );
}

export default LoginCard;
