import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getCart(userId));
    console.log("userIduserIduserId", userId);
  }, [dispatch]);
  return (
    <div>
      {/* {console.log("cart.cart?.data?.LineItems", cart?.cart?.LineItems)} */}
      {cart?.cart?.LineItems && cart?.cart?.LineItems.length > 0 && (
        <div>
          <div className="lg:grid grid-cols-2 lg:px-20 lg:py-20 relative">
            <div className="cols-span-2">
              {cart?.cart?.LineItems?.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}
            </div>
            <div className="px-10 sticky top-0 h-[90vh] mt-10 lg:mt-0">
              <div className="border">
                <div className="flex justify-center">
                  <p
                    className="uppercase font-bold opacity-60 pb-4 text-black"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Cart Totals
                  </p>
                </div>
                <hr />
                <div
                  className="space-y-3 font-semibold"
                  style={{ padding: "25px" }}
                >
                  <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span>₹{cart?.cart?.totalPrice}</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span>Discount</span>
                    <span className="text-green-600">
                      -₹{cart?.cart?.totalDiscount}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span>Delivery Charge</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 font-bold">
                    <span>Total amount</span>
                    <span className="text-green-600">
                      ₹{cart?.cart?.totalDiscountedPrice}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleCheckOut}
                    type="submit"
                    className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-8 py-3 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-Pink-500 focus:ring-offset-2"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
