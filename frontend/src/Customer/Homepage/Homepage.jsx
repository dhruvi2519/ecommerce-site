import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../Componenets/Homecarosol/MainCarsol";
import Homesectioncarosol from "../Componenets/Homesectioncarosol/Homesectioncarosol";
import ProductCard from "../Componenets/Product/ProductCard";
import { findAllProducts } from "../../State/Product/Action";

const Homepage = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(findAllProducts());
  }, [dispatch]);
  {
    // console.log("product?.allproducts", product);
  }
  return (
    <div>
      <MainCarousel />
      <Homesectioncarosol datas={product} sectionName="Men's Kurta" />
      <h2 className="text-2xl font-bold text-center mt-8">
        NEW ARRIVAL PRODUCTS
      </h2>
      <div className="flex flex-wrap justify-center">
        {product?.content &&
          product?.content?.map((item) => (
            <div key={item._id} className="m-4">
              <ProductCard product={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Homepage;
