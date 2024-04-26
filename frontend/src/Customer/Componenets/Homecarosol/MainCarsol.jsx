import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./MainCarsolData";

const MainCarousel = () => {
  const items = mainCarouselData.map((item) => (
    <img
      className="cursor-pointer"
      role="presentation"
      src={item.image}
      style={{ height: "800px" }}
      width="2000px"
      //height="500px" // Adjusted height to 500px
      alt=""
    />
  ));
  return (
    <div className="w-[90%]  h-[50%] m-auto ">
      <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
      />
    </div>
  );
};
export default MainCarousel;
