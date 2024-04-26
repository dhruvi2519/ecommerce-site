// Layout.js
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AdminRouters from "./AdminRouters";
import SellerRouters from "./SellerRouters";
import CustomerRouters from "./CustomerRouters";
let ROLE = localStorage.getItem("role");
const Layout = () => {
  const [userType, setUserType] = useState(ROLE || "user");

  // useEffect(() => {
  //   if (localStorage.getItem("role")) {
  //     // console.log("Heyeeeee", localStorage.getItem("role"));
  //     setUserType(userType);
  //   }
  // }, [userType]);
  useEffect(() => {
    const userInfo = localStorage.getItem("role");
    if (userInfo) {
      setUserType(userInfo);
    } else {
      setUserType("user");
    }
  }, [setUserType]);
  // console.log("Hey please check this ", localStorage.getItem("role"));
  return (
    <div>
      <BrowserRouter>
        {userType === "admin" || ROLE === "admin" ? <AdminRouters /> : null}
        {userType === "seller" || ROLE === "seller" ? <SellerRouters /> : null}
        {userType === "user" || ROLE === "user" ? <CustomerRouters /> : null}
      </BrowserRouter>
    </div>
  );
};

export default Layout;
