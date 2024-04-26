import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = (product) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product?.product._id) {
      navigate(`/products/${product?.product._id}`);
    } else {
      console.error("Product ID not found");
    }
  };
  // console.log("product?.allproducts?.content?.brand", product.product);
  return (
    <div
      onClick={handleClick}
      className="productCard w-[12rem] m-3 transition-all cursor-pointer"
    >
      <div className="h-[15rem]">
        <img
          className="h-full w-60 object-cover object-left-top"
          src={product?.product?.imageUrl}
          alt="No Image"
        ></img>
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-80">{product?.product?.brand}</p>
          <p className="font-semibold opacity-60">{product?.product?.title}</p>
          <div className="flex items-center space-x-2">
            <p className="font-semibold">
              ₹{product?.product?.discountedPrice?.$numberDecimal}
            </p>
            <p className="line-through opacity-60">
              ₹{product?.product?.price?.$numberDecimal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
