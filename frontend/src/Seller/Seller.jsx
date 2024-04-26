import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Face3Icon from "@mui/icons-material/Face3";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { Link, Route, Routes } from "react-router-dom";
import SellerDashboard from "./SellerComponents/SellerDashboard";
import SellerCreateProductForm from "./SellerComponents/SellerCreateProductForm";
import SellerProductTable from "./SellerComponents/SellerProductTable";
import SellerOrderTable from "./SellerComponents/SellerOrderTable";
import SellerCustomerTable from "./SellerComponents/SellerCustomerTable";
import SellerAccount from "./SellerComponents/SellerAccount";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SellerComplaion from "./SellerComponents/SellerComplaion";
import Sellerlogin from "./SellerComponents/Sellerlogin";
import SellerRegistration from "./SellerComponents/SellerRegistration";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SellerMyProducts from "./SellerComponents/SellerMyProducts";
import Navigation from "./SellerComponents/SellerNavigation/Navigation";
import Category from "./SellerComponents/Category";
import Coupon from "./SellerComponents/Coupon";
import UpdateProduct from "./SellerComponents/UpdateProduct";

const Seller = () => {
  const menu = [
    { name: "My Shop", path: "/seller", icon: <DashboardIcon /> },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: <ProductionQuantityLimitsIcon />,
    },
    {
      name: "Customers",
      path: "/seller/customers",
      icon: <SupportAgentIcon />,
    },
    {
      name: "Complaints",
      path: "/seller/complaints",
      icon: <BorderColorIcon />,
    },
    { name: "Add Products", path: "/seller/product/create", icon: <AddIcon /> },
    {
      name: "My Products",
      path: "/seller/myproduct",
      icon: <StorefrontIcon />,
    },

    { name: "My Account", path: "/seller/account", icon: <Face3Icon /> },
    { name: "Add Category", path: "/seller/category", icon: <AddIcon /> },
    { name: "Add Coupon", path: "/seller/coupon", icon: <AddIcon /> },
    { name: "Sign Out", path: "/", icon: <ExitToAppIcon /> },
  ];
  const theme = useTheme();

  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // border: "1px solid blue",
        height: "100%",
      }}
    >
      <>
        {/* {isLargeScreen && <Toolbar />} */}
        <List>
          {menu.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => navigate(item.path)}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    </Box>
  );

  return (
    <div className="relative ">
      <div className="flex h-[100vh] ">
        <CssBaseline />
        <div className="w-[15%] border border-r-gray-300 h-full fixed top-0 bg-blue-200 overflow-hidden">
          {drawer}
        </div>

        <div className="w-[85%] h-full ml-[15%]">
          {/* <Navigation /> */}
          <Routes>
            <Route
              path="/seller-registration"
              element={<SellerRegistration />}
            ></Route>
            <Route path="/seller-login" element={<Sellerlogin />}></Route>a
            <Route path="/" element={<SellerDashboard />}></Route>
            <Route
              path="/product/create"
              element={<SellerCreateProductForm />}
            ></Route>
            <Route path="/products" element={<SellerProductTable />}></Route>
            <Route path="/orders" element={<SellerOrderTable />}></Route>
            {/* <Route path="/customers" element={<SellerCustomerTable />}></Route> */}
            <Route path="/myproduct" element={<SellerMyProducts />}></Route>
            <Route path="/account" element={<SellerAccount />}></Route>
            <Route path="/complaints" element={<SellerComplaion />}></Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path="/coupon" element={<Coupon />}></Route>
            <Route path="/update" element={<UpdateProduct />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Seller;
