import React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, Legend } from "recharts";
const SellerPieChart = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <RechartsPieChart
      width={400}
      height={400}
      style={{ backgroundColor: "black" }}
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
      <Legend />
    </RechartsPieChart>
  );
};

export default SellerPieChart;
