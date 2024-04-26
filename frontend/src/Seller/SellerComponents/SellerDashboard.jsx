import React from "react";
import SellerAchivement from "./DashBoard Components/SellerAchivement";
import { Grid } from "@mui/material";
import SellerMonthlyOverview from "./DashBoard Components/SellerMonthlyOverview";
import SellerPieChart from "./DashBoard Components/SellerPieChart";
import BarChart from "./DashBoard Components/BarChart";

const SellerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Seller Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-8">
            <SellerAchivement />
          </div>
          <div>
            <SellerPieChart />
          </div>
        </div>
        <div>
          <div className="mb-8">
            <SellerMonthlyOverview />
          </div>
          <div>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
