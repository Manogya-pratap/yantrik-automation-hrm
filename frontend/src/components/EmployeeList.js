import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function EmployeeList({ employees = [], onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = employees.filter((emp) => {
    const name = (emp.FullName || "").toLowerCase();
    const desig = (emp.Designation || "").toLowerCase();
    return (
      name.includes(search.toLowerCase()) ||
      desig.includes(search.toLowerCase())
    );
  });

  return (
    <div
      className="employee-list-container"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "16px",
        background: "white",

        /* GRADIENT BORDER */
        border: "4px solid transparent",
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(135deg, #4a0e23, #7b1e3c, #a83250)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",

        boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
        animation: "fadeIn 0.6s ease",
      }}
    >
      {/* Search Row */}
      <div className="d-flex justify-content-between mb-3 align-items-center flex-wrap">
        <Form.Control
          placeholder="Search by name or designation..."
          className="search-input"
          style={{ width: "330px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span style={{ fontWeight: "500" }}>
          {filtered.length} employees found
        </span>
      </div>

      {/* Scrollable Table Container */}
      <div
        style={{
          maxHeight: "720px",
          overflowY: "auto",
          borderRadius: "12px",
          border: "1px solid #ddd",
        }}
      >
        <table
          className="table table-hover employee-table"
          style={{
            margin: 0,
            minWidth: "100%",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 2,
              background: "linear-gradient(135deg, #4a0e23, #7b1e3c)",
              color: "white",
            }}
          >
            <tr>
              <th style={{ width: "45%", padding: "12px" }}>Name</th>
              <th style={{ width: "35%", padding: "12px" }}>Designation</th>
              <th style={{ width: "20%", padding: "12px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((emp, i) => (
              <tr key={i} className="row-hover">
                <td style={{ fontWeight: "600" }}>{emp.FullName}</td>
                <td style={{ color: "#555" }}>{emp.Designation}</td>
                <td>
                  <Button
                    size="sm"
                    className="btn-wine"
                    onClick={() => onSelect(emp)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-3 text-muted">
                  No employee found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Animations & Hover Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .row-hover:hover {
            background: rgba(123, 30, 60, 0.12);
            transition: 0.2s ease;
            cursor: pointer;
          }

          /* Scrollbar Styling */
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-thumb {
            background: #7b1e3c;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
}

export default EmployeeList;
