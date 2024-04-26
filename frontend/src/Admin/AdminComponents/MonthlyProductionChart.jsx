import React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, Legend } from "recharts";

const SellerPieChart = () => {
  const data = [
    { year: "2020", value: 400, description: "Sales in 2020" },
    { year: "2021", value: 300, description: "Sales in 2021" },
    { year: "2022", value: 300, description: "Sales in 2022" },
    { year: "2023", value: 200, description: "Sales in 2023" },
    { year: "2024", value: 500, description: "Sales in 2024" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#ffffff" }}>
        Yearly Sales Distribution
      </h2>
      <RechartsPieChart
        width={400}
        height={400}
        style={{ backgroundColor: "black", margin: "auto" }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          wrapperStyle={{ color: "#ffffff", fontSize: "12px" }}
        />
      </RechartsPieChart>
    </div>
  );
};

export default SellerPieChart;
