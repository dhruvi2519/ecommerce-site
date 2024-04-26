import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { removeCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleRemoveCartItem = () => {
    const data = {
      cartItemId: item._id,
    };
    dispatch(removeCartItem(data));
  };
  console.log("item", item);
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product?.imageUrl}
            alt="Product Image"
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70 mt-2"> {item?.product?.brand}</p>
          <div className="flex space-x-5 items-center text-gray-900 mt-6">
            <p className="font-semibold">
              ₹{item?.discountedPrice.$numberDecimal}
            </p>
            <p className="opacity-50 line-through">
              ₹{item?.price.$numberDecimal}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div>
          <Button sx={{ color: "black" }} onClick={handleRemoveCartItem}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
