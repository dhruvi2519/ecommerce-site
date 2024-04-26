import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Customer/Homepage/Homepage";
import Cart from "../Customer/Componenets/Cart/Cart";
import Product from "../Customer/Componenets/Product/Product";
import ProductDetails from "../Customer/Componenets/ProductDetails/ProductDetails";
import Footer from "../Customer/Componenets/Footer/Footer";
import CheckOut from "../Customer/Componenets/CheckOut/CheckOut";
import Order from "../Customer/Componenets/OrderPage/Order";
import OrderDetails from "../Customer/Componenets/OrderPage/OrderDetails";
import OrderSummery from "../Customer/Componenets/CheckOut/OrderSummery";
import SearchProduct from "../Customer/Componenets/Product/SearchProduct";
import Navigation from "../Customer/Componenets/Navigation/Navigation";
import Profile from "../Customer/Componenets/Profile/Profile";
import AllProduct from "../Customer/Componenets/Product/AllProduct";

const CustomerRouters = () => {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        get all products
        <Route path="/products" element={<AllProduct />}></Route>
        search product
        <Route path="/products=search/:id" element={<SearchProduct />}></Route>
        filter products
        <Route exact path="/product/:id" element={<Product />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
        <Route path="/myorders" element={<Order />}></Route>
        <Route
          path="/account/order/:orderId"
          element={<OrderDetails />}
        ></Route>
        <Route path="/ordersummery" element={<OrderSummery />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default CustomerRouters;
