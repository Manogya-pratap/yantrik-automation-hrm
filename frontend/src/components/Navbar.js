import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function TopNavbar({
  onPageChange,
  onResetDetails,
  onLogout,
  currentPage,
  name,
  role,
}) {
  const displayName = name || "User";

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(90deg, #4a0e23, #7b1e3c, #a83250)",
        padding: "12px 20px",
      }}
      variant="dark"
    >
      <Container fluid>
        {/* ===== BRAND ===== */}
        <Navbar.Brand
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            onResetDetails();
            onPageChange("home");
          }}
        >
          YANTRIK Automation
        </Navbar.Brand>

        {/* ===== TOGGLE FOR MOBILE ===== */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* ===== LEFT NAV LINKS ===== */}
          <Nav className="me-auto">
            {/* HOME */}
            <Nav.Link
              active={currentPage === "home"}
              style={{ color: "white" }}
              onClick={() => {
                onResetDetails();
                onPageChange("home");
              }}
            >
              Home
            </Nav.Link>

            {/* EMPLOYEE DETAILS (TOGGLE STYLE) */}
            <Nav.Link
              active={currentPage === "employees"}
              style={{ color: "white" }}
              onClick={() => {
                onResetDetails();
                onPageChange(
                  currentPage === "employees" ? "home" : "employees"
                );
              }}
            >
              Employee Details
            </Nav.Link>

            {/* ATTENDANCE */}
            <Nav.Link
              active={currentPage === "attendance"}
              style={{ color: "white" }}
              onClick={() => {
                onResetDetails();
                onPageChange(
                  currentPage === "attendance" ? "home" : "attendance"
                );
              }}
            >
              Attendance
            </Nav.Link>
          </Nav>

          {/* ===== USER INFO ===== */}
          <div
            style={{
              color: "white",
              marginRight: "15px",
              fontSize: "14px",
              textAlign: "right",
              lineHeight: "1.2",
            }}
          >
            Welcome, <b>{displayName}</b>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>({role})</div>
          </div>

          {/* ===== LOGOUT ===== */}
          <Button
            onClick={onLogout}
            style={{
              backgroundColor: "#7b1e3c",
              border: "none",
              fontWeight: "600",
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
