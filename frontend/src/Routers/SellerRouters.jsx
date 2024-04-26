import React from "react";
import { Route, Routes } from "react-router-dom";
import Seller from "../Seller/Seller";
import Sellerlogin from "../Seller/SellerComponents/Sellerlogin";
import SellerRegistration from "../Seller/SellerComponents/SellerRegistration";
import Coupon from "../Seller/SellerComponents/Coupon";

const SellerRouters = () => {
  return (
    <div>
      <Routes>
        <Route path="/seller/*" element={<Seller />}></Route>
        <Route path="/seller/login" element={<Sellerlogin />}></Route>

        <Route
          path="/seller/registration"
          element={<SellerRegistration />}
        ></Route>
      </Routes>
    </div>
  );
};

export default SellerRouters;
