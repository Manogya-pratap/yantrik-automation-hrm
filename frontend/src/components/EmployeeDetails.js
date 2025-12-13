import React from "react";
import { Button, Table } from "react-bootstrap";

function EmployeeDetails({ employee = {}, headers = [], onBack }) {
  // Detect photo field dynamically
  const photoField = [
    "Photo",
    "Profile Photo",
    "Image",
    "Profile",
    "Picture",
  ].find((key) => employee[key]);

  const photoUrl = photoField ? employee[photoField] : null;

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        marginTop: "20px",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <div
        className="card-custom"
        style={{
          width: "820px",
          padding: "22px",
          borderRadius: "16px",
          background: "white",

          border: "4px solid transparent",
          backgroundImage:
            "linear-gradient(white, white), linear-gradient(135deg, #4a0e23, #7b1e3c, #a83250)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",

          boxShadow: "0 8px 22px rgba(0,0,0,0.15)",
          transition: "0.3s",
        }}
      >
        {/* Back Button */}
        <Button variant="secondary" onClick={onBack} size="sm">
          ← Back
        </Button>

        {/* PHOTO + HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg, #4a0e23, #7b1e3c)",
            padding: "25px",
            borderRadius: "12px",
            color: "white",
            marginTop: "15px",
            marginBottom: "20px",
            textAlign: "center",

            boxShadow: "0 5px 14px rgba(0,0,0,0.25)",
          }}
        >
          {/* Employee Photo */}
          <img
            src={
              photoUrl && photoUrl.startsWith("http")
                ? photoUrl
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Employee"
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "12px",
              border: "4px solid white",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          />

          <h3 style={{ margin: 0, fontWeight: "700", letterSpacing: "0.5px" }}>
            {employee.FullName}
          </h3>
          <h5 style={{ opacity: 0.85 }}>{employee.Designation}</h5>
        </div>

        {/* Scrollable Table */}
        <div
          className="details-scroll"
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            borderRadius: "12px",
            border: "1px solid #ddd",
          }}
        >
          <Table
            bordered
            hover
            style={{
              margin: 0,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <tbody>
              {headers.map((h) => (
                <tr key={h} className="row-hover">
                  <th
                    style={{
                      width: "35%",
                      background: "#fafafa",
                      fontWeight: "600",
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                    }}
                  >
                    {h}
                  </th>
                  <td>{employee[h] ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .row-hover:hover {
            background: rgba(123, 30, 60, 0.10);
            cursor: pointer;
            transition: 0.2s ease-in-out;
          }

          /* SCROLLBAR FIX — applies to scroll container */
          .details-scroll::-webkit-scrollbar {
            width: 10px;
          }
          .details-scroll::-webkit-scrollbar-thumb {
            background: #7b1e3c !important;
            border-radius: 6px;
          }
          .details-scroll::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
        `}
      </style>
    </div>
  );
}

export default EmployeeDetails;
