import React, { useEffect, useState } from "react";
import CartItem from "../Cart/CartItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderAddressCard from "../AddressCard/orderaddressCard";
import { getCart, applyCoupon } from "../../../State/Cart/Action";
import { createOrder } from "../../../State/Order/Action";

const steps = ["Cart", "Delivery Address", "Order Summary", "Payment"];

const OrderSummery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const { cart, loading } = useSelector((store) => store); // Added loading state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [message, setMessage] = useState(null); // State to store success/error message

  const handleSelectAddress = () => {
    setSelectedAddress(cart.addresses);
  };

  const handleCheckOut = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await dispatch(getCart(userId));
      await handleSelectAddress();

      if (!cart?.cart?.LineItems || cart?.cart?.LineItems.length === 0) {
        throw new Error("Cart is empty");
      }
      if (!selectedAddress || selectedAddress.length === 0) {
        throw new Error("No shipping address selected");
      }
      {
        console.log(" cart.cart.LineItems", cart?.cart?.LineItems?.product);
      }
      const products = cart?.cart?.LineItems?.map((item) => item?.product);
      console.log("products", products);
      const response = await dispatch(
        createOrder(userId, products, selectedAddress[0])
      );

      navigate("/payment");
    } catch (error) {
      console.error("Error checking out:", error);
      setMessage("Error checking out. Please try again.");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getCart(userId));
  }, [dispatch]);

  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    if (couponCode) {
      dispatch(applyCoupon(couponCode));
    }
  }, [dispatch, couponCode]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {message && (
        <div
          className={
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }
        >
          {message}
        </div>
      )}
      <div className="p-5 shadow-lg rounded-s-md border">
        <div className="p-5 shadow-lg rounded-s-md border">
          <OrderAddressCard selectedAddress={cart.selectedAddress} />
        </div>
      </div>
      <br />
      <br />
      <div>
        <div className="lg:grid grid-cols-2 lg:px-20 relative">
          <div className="cols-span-2">
            {cart?.cart &&
              cart.cart?.LineItems?.map((item) => <CartItem item={item} />)}
          </div>
          <div className="px-10 sticky top-0 h-[90vh] mt-5 lg:mt-0">
            <div className="border">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price Details
              </p>
              <hr />
              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>₹{cart?.cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3  ">
                  <span>Discount</span>
                  <span className="text-green-600">
                    -₹{cart?.cart?.totalDiscount}
                  </span>
                </div>
                <div className="flex justify-between pt-3 ">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3  font-bold">
                  <span>Total amount</span>
                  <span className="text-green-600">
                    ₹{cart?.cart?.totalDiscountedPrice}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckOut}
                type="submit"
                disabled={loading}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-Pink-500 focus:ring-offset-2"
              >
                {loading ? "Processing..." : "CheckOut"}
              </button>
              <div
                style={{
                  maxWidth: "400px",
                  margin: "0 auto",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <h2>Apply Coupon</h2>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="couponCode"
                    style={{ display: "block", marginBottom: "5px" }}
                  ></label>
                  <input
                    type="text"
                    id="couponCode"
                    style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <button
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                    onClick={() => setCouponCode("")} // Clear coupon code
                  >
                    Clear Coupon
                  </button>
                </div>
              </div>
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
