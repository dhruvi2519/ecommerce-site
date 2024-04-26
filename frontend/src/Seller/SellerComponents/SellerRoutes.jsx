import React from "react";
import Sellerlogin from "./Sellerlogin";
import { Route, Routes } from "react-router-dom";

const SellerRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Sellerlogin />}></Route>
      </Routes>
    </div>
  );
};

export default SellerRoutes;
