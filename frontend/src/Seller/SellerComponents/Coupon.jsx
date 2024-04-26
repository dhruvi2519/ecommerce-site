import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../config/apiConfig";
import { fetchSellerProducts } from "../../State/Seller/Products/Action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Coupon = () => {
  const dispatch = useDispatch();
  const { sellerproduct } = useSelector((store) => store);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [productIdMap, setProductIdMap] = useState({}); // State to hold mapping of product titles to IDs
  const [selectedProductTitle, setSelectedProductTitle] = useState(""); // State to hold selected product title
  const [expiredate, setExpiryDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(fetchSellerProducts(userId));
  }, [dispatch]);

  useEffect(() => {
    if (sellerproduct.products) {
      const idMap = {};
      sellerproduct?.products?.data?.forEach((product) => {
        idMap[product.title] = product._id;
      });
      setProductIdMap(idMap);
    }
  }, [sellerproduct]);

  const applyCoupon = async () => {
    if (!couponCode || !selectedProductTitle || !expiredate || !totalAmount) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const productId = productIdMap[selectedProductTitle];
      const { data } = await api.post(
        "http://localhost:5000/seller/coupon/create",
        { couponCode, productId, expiredate, totalAmount }
      );
      console.log("productId:>> ", productId);
      console.log("responseeeeeee:>> ", data);
      setMessage(data.message);
      setError("");
    } catch (error) {
      setMessage("");
      setError(error.data.message);
    }
  };

  return (
    <div
      style={{
        marginTop: "150px",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Apply Coupon
      </h2>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="couponCode"
          style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
        >
          Coupon Code:
        </label>
        <input
          type="text"
          id="couponCode"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="productId"
          style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
        >
          Product Name:
        </label>
        <select
          id="productId"
          value={selectedProductTitle}
          onChange={(e) => setSelectedProductTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          <option value="">Select Product</option>
          {Object.keys(productIdMap).map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="expiryDate"
          style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
        >
          Expiry Date:
        </label>
        <input
          type="date"
          id="expiryDate"
          value={expiredate}
          onChange={(e) => setExpiryDate(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="totalAmount"
          style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
        >
          Total Amount:
        </label>
        <input
          type="number"
          id="totalAmount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <button
        onClick={applyCoupon}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Apply Coupon
      </button>
      {message && (
        <p
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Coupon;
