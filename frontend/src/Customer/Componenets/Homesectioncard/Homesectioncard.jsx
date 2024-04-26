import React from "react";

const Homesectioncard = ({ product }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 ">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-50 h-40"
          src={product?.products?.imageUrl}
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          {product?.products?.brand}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{product?.products?.title}</p>
      </div>
    </div>
  );
};

export default Homesectioncard;
