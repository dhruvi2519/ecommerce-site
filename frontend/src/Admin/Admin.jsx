import { InboxIcon, MinusSmallIcon } from "@heroicons/react/24/outline";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import ArchiveIcon from "@mui/icons-material/Archive";
import Face3Icon from "@mui/icons-material/Face3";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./AdminComponents/Dashboard";
import CreateProductForm from "./AdminComponents/CreateProductForm";
import ProductsTable from "./AdminComponents/ProductsTable";
import OrdersTable from "./AdminComponents/OrdersTable";
import CustomerTable from "./AdminComponents/CustomerTable";
import MyAccount from "./AdminComponents/MyAccount";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SellerTable from "./AdminComponents/SellerTable";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  {
    name: "Products",
    path: "/admin/products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <BorderColorIcon /> },
  { name: "Add Products", path: "/admin/product/create", icon: <AddIcon /> },
  { name: "Sellers", path: "/admin/seller", icon: <StorefrontIcon /> },
  { name: "My Account", path: "/admin/account", icon: <Face3Icon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
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

      {/* <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/account">
            <ListItemIcon>
              <Face3Icon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List> */}
    </Box>
  );

  return (
    <div className="relative">
      <div className="flex h-[100vh] ">
        <CssBaseline />
        <div className="w-[15%] border border-r-gray-300 h-full fixed top-0 bg-blue-500">
          {drawer}
        </div>

        <div className="w-[85%] h-full ml-[15%] bg-gray-200">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route
              path="/product/create"
              element={<CreateProductForm />}
            ></Route>
            <Route path="/products" element={<ProductsTable />}></Route>
            <Route path="/orders" element={<OrdersTable />}></Route>
            <Route path="/customers" element={<CustomerTable />}></Route>
            <Route path="/account" element={<MyAccount />}></Route>
            <Route path="/seller" element={<SellerTable />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
