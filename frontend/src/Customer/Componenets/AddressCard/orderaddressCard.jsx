import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, fetchCoupons } from "../../../State/Cart/Action";

const OrderAddressCard = ({ selectedAddress }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleApplyCoupon = (couponCode) => {
    dispatch(applyCoupon(couponCode));
  };

  return (
    <div className="order-address-card-container">
      {/* Section for displaying selected address */}
      <div className="address-section">
        <p className="address-card-title">Selected Address:</p>
        <div className="address-details">
          <p>
            <span className="address-label">Name:</span>{" "}
            {selectedAddress?.firstname + " " + selectedAddress?.lastname}
          </p>
          <p>
            <span className="address-label">City:</span> {selectedAddress?.city}
          </p>
          <p>
            <span className="address-label">State:</span>{" "}
            {selectedAddress?.state}
          </p>
          <p>
            <span className="address-label">Street:</span>{" "}
            {selectedAddress?.streetAddress}
          </p>
          <p>
            <span className="address-label">Phone No:</span>{" "}
            {selectedAddress?.mobile}
          </p>
          <p>
            <span className="address-label">Zip:</span>{" "}
            {selectedAddress?.zipCode}
          </p>
        </div>
      </div>
      <br />
      <br />
      {/* Section for displaying related coupons */}
      <div
        className="coupon-section"
        style={{
          width: "50%",
          height: "auto",
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          className="coupon-title"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Available Coupons:
        </p>
        <ul
          className="coupon-list"
          style={{
            listStyle: "none",
            padding: "0",
          }}
        >
          {cart?.coupons?.coupons?.coupons?.map((coupon, index) => (
            <li
              key={index}
              className="coupon-item"
              style={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ marginRight: "10px" }}>
                  Coupon Code: {coupon.couponCode}
                </span>
                <br />
                <span>Total Amount: {coupon.totalAmount}</span>
              </div>
              <button
                className="apply-button"
                onClick={() => handleApplyCoupon(coupon.couponCode)}
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderAddressCard;
