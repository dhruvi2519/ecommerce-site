import React from "react";

// Sample monthly product sales data
const monthlyProductSalesData = [
  { month: "January", 2020: 100, 2021: 120, 2022: 150, 2023: 180, 2024: 200 },
  { month: "February", 2020: 120, 2021: 140, 2022: 170, 2023: 200, 2024: 220 },
  { month: "March", 2020: 150, 2021: 180, 2022: 210, 2023: 240, 2024: 260 },
  { month: "April", 2020: 180, 2021: 210, 2022: 240, 2023: 270, 2024: 290 },
  { month: "May", 2020: 200, 2021: 230, 2022: 260, 2023: 290, 2024: 310 },
  { month: "June", 2020: 220, 2021: 250, 2022: 280, 2023: 310, 2024: 330 },
  { month: "July", 2020: 250, 2021: 280, 2022: 310, 2023: 340, 2024: 360 },
  { month: "August", 2020: 270, 2021: 300, 2022: 330, 2023: 360, 2024: 380 },
  { month: "September", 2020: 280, 2021: 310, 2022: 340, 2023: 370, 2024: 390 },
  { month: "October", 2020: 300, 2021: 320, 2022: 350, 2023: 380, 2024: 400 },
  { month: "November", 2020: 320, 2021: 340, 2022: 370, 2023: 400, 2024: 420 },
  { month: "December", 2020: 350, 2021: 370, 2022: 400, 2023: 430, 2024: 450 },
];

const MonthlyProductSalesTable = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", marginTop: "20px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Monthly Product Sales
      </h1>
      <table
        style={{ width: "100%", borderCollapse: "collapse", color: "#333" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Month
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
              }}
            >
              2020
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              2021
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
              }}
            >
              2022
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              2023
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
              }}
            >
              2024
            </th>
          </tr>
        </thead>
        <tbody>
          {monthlyProductSalesData.map((data, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}
            >
              <td
                style={{
                  border: "1px solid #dddddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {data.month}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  padding: "8px",
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {data["2020"]}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {data["2021"]}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  padding: "8px",
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {data["2022"]}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {data["2023"]}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  padding: "8px",
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {data["2024"]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyProductSalesTable;
