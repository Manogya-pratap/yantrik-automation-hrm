import React,{ useState, useEffect } from "react";
import TopNavbar from "../components/Navbar";
import EmployeeList from "../components/EmployeeList";
import EmployeeDetails from "../components/EmployeeDetails";

function Dashboard({ employees, headers, onLogout, loading }) {
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

  return (
    <>
      <TopNavbar
        onPageChange={setPage}
        onResetDetails={resetDetails}
        onLogout={onLogout}
        currentPage={page}
      />

      <div className="container mt-4">
        {/* HOME SCREEN */}
        {page === "home" && !selectedEmployee && (
          <div
            style={{
              textAlign: "center",
              marginTop: "100px",
              fontSize: "48px",
              fontWeight: "700",
              color: "white",
              letterSpacing: "2px",
            }}
          >
            YANTRIK Automation Pvt.Ltd.
          </div>
        )}

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

        {/* EMPLOYEE DETAILS PAGE */}
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
    </>
  );
}

export default Dashboard;
