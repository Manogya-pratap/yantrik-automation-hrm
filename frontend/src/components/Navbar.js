// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function TopNavbar({ onPageChange, onResetDetails, onLogout, currentPage }) {
  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(90deg, #4a0e23, #7b1e3c, #a83250)",
        padding: "12px 20px",
      }}
      className="mb-4"
    >
      <Container fluid>
        {/* LEFT SIDE BRAND */}
        <Navbar.Brand
          style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            onResetDetails();
            onPageChange("home");
            window.history.pushState({}, "home");
          }}
        >
          YANTRIK Automation
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* LEFT-SIDE NAVIGATION */}
          <Nav className="me-auto">
            {/* HOME */}
            <Nav.Link
              style={{ color: "white", fontSize: "16px" }}
              onClick={() => {
                onResetDetails();
                onPageChange("home");
                window.history.pushState({}, "home");
              }}
            >
              Home
            </Nav.Link>

            {/* EMPLOYEE DETAILS (TOGGLE) */}
            <Nav.Link
              style={{ color: "white", fontSize: "16px" }}
              onClick={() => {
                onResetDetails();
                if (currentPage === "employees") {
                  // second click → close page → go home
                  onPageChange("home");
                  window.history.pushState({}, "home");
                } else {
                  // first click → open employees page
                  onPageChange("employees");
                  window.history.pushState({}, "employees");
                }
              }}
            >
              Employee Details
            </Nav.Link>

            <Nav.Link
              style={{ color: "white", fontSize: "16px" }}
              onClick={() => {
                onResetDetails();
                if (currentPage === "attendence") {
                  // second click → close page → go home
                  onPageChange("home");
                  window.history.pushState({}, "home");
                } else {
                  // first click → open employees page
                  onPageChange("attendence");
                  window.history.pushState({}, "attendence");
                }
              }}
            >
              Attandence
            </Nav.Link>
          </Nav>

          {/* LOGOUT BUTTON ON RIGHT */}
          <Button
            variant="danger"
            onClick={onLogout}
            style={{
              backgroundColor: "#7b1e3c",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
