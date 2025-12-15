import React, { useState, useEffect } from "react";
import TopNavbar from "../components/Navbar";
import EmployeeList from "../components/EmployeeList";
import EmployeeDetails from "../components/EmployeeDetails";

function Dashboard({ employees, headers, onLogout, loading, role, name }) {
  const [page, setPage] = useState("home");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // RESET EMPLOYEE DETAILS
  const resetDetails = () => setSelectedEmployee(null);

  // BROWSER BACK BUTTON CONTROL
  useEffect(() => {
    const handleBack = () => {
      if (selectedEmployee) {
        setSelectedEmployee(null);
        setPage("employees");
      } else if (page === "employees") {
        setPage("home");
      }
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [page, selectedEmployee]);

  // 🔒 LOCK SCROLL ON HOME
  useEffect(() => {
    if (page === "home") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [page]);

  return (
    <>
      <TopNavbar
        onPageChange={setPage}
        onResetDetails={resetDetails}
        onLogout={onLogout}
        currentPage={page}
        name={name}
        role={role}
      />

      {/* ================= HOME SCREEN ================= */}
      {page === "home" && !selectedEmployee && (
        <div
          className="d-flex justify-content-center align-items-start"
          style={{
            minHeight: "calc(100vh - 70px)", // navbar height
            background: "linear-gradient(135deg, #3b0a18, #7b1e3c, #a83250)",
            paddingTop: "40px", // small, safe spacing
          }}
        >
          <div
            className="text-center"
            style={{
              animation: "brandEnter 1.2s ease-out forwards",
            }}
          >
            <h1
              style={{
                fontWeight: "900",
                fontSize: "62px",
                letterSpacing: "2px",
                marginBottom: "18px",
                textTransform: "uppercase",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #ffd6dd 30%, #ff9fb3 60%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              YANTRIK Automation Pvt. Ltd.
            </h1>

            <div
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Industrial Automation • Smart Engineering Solutions
            </div>

            {/* Animation */}
            <style>
              {`
                @keyframes brandEnter {
                  0% {
                    opacity: 0;
                    transform: translateY(-35px) scale(0.98);
                  }
                  60% {
                    opacity: 1;
                    transform: translateY(8px) scale(1.01);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
              `}
            </style>
          </div>
        </div>
      )}

      {/* ================= NON-HOME CONTENT ================= */}
      {page !== "home" && (
        <div className="container mt-4">
          {/* EMPLOYEE LIST */}
          {page === "employees" && !selectedEmployee && (
            <EmployeeList
              employees={employees}
              onSelect={(emp) => {
                setSelectedEmployee(emp);
                window.history.pushState({}, "details");
              }}
            />
          )}

          {/* EMPLOYEE DETAILS */}
          {selectedEmployee && (
            <EmployeeDetails
              employee={selectedEmployee}
              headers={headers}
              onBack={() => {
                setSelectedEmployee(null);
                setPage("employees");
                window.history.pushState({}, "employees");
              }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
