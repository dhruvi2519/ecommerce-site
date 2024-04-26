import React, { useState, useEffect } from "react";
import Homesectioncard from "../Homesectioncard/Homesectioncard";
import AliceCarousel from "react-alice-carousel";
import { useSelector, useDispatch } from "react-redux";

import { findProducts } from "../../../State/Product/Action";

const Homesectioncarosol = ({ sectionName }) => {
  /*const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    // Dispatch action to fetch product data when the component mounts
    dispatch(findProducts());
  }, [dispatch]);

  /*  if (!Array.isArray(product)) {
    console.error("Error: products is not an array");
    return null;
  }
 
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 6 },
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = product?.map((item) => (
    <Homesectioncard key={item._id} product={item} />
  ));

  return (
    <div className="border">
      <h2 className="text-2xl font-extrabol text-gray-800 py-5">
        {sectionName}
      </h2>
      <div className="relative p-5 border ">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  ); */
};

export default Homesectioncarosol;
