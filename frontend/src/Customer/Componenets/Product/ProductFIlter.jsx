import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductFilter = (product) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product?.product._id) {
      navigate(`/products/${product.products._id}`);
    } else {
      console.error("Product ID not found");
    }
  };
  console.log("product?.brands?.content?", product?.product);
  return (
    <div
      onClick={handleClick}
      className="productCard w-[12rem] m-3 transition-all cursor-pointer"
    >
      <div className="h-[15rem]">
        <img
          className="h-full w-60 object-cover object-left-top"
          src={product?.products?.imageUrl}
          alt="No Image"
        ></img>
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-80">{product?.products?.brand}</p>
          <p className="font-semibold opacity-60">{product?.products?.title}</p>
          <div className="flex items-center space-x-2">
            <p className="font-semibold">
              ₹{product?.products?.discountedPrice?.$numberDecimal}
            </p>
            <p className="line-through opacity-60">
              ₹{product?.products?.price?.$numberDecimal}
            </p>
            {/* <p className="text-green-600 font-semibold">
              {product?.product?.discountPersent?.$numberDecimal} %off
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductFilter;
