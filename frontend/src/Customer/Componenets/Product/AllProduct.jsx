import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import ProductCard from "./ProductCard";
import { findAllProducts, findProduct } from "../../../State/Product/Action";
import { fetchColors, fetchSizes } from "../../../State/Filter/Action";

const AllProduct = () => {
  const [Pricerange, setPricerange] = useState("");
  const [Discountrange, setDiscountrange] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
    dispatch(findAllProducts());
  }, [dispatch]);

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleFilter = (brand) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("brand");
    searchParams.append("brand", brand);
    const query = searchParams.toString();
    navigate(`?${query}`);
    dispatch(findProduct({ brand }));
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate(`?${query}`);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-9xl px-2 sm:px-8 lg:px-2">
        <div className="flex items-baseline justify-between border-b border-black-200 pb-0 pt-20">
          <h1 className="text-4xl font-bold tracking-tight text-black-900">
            Products
          </h1>
          <div className="flex items-center"></div>
        </div>
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-7">
            {product?.product?.content &&
              product?.product?.content.map((item) => (
                <div key={item._id} className="m-4">
                  <ProductCard product={item} />
                </div>
              ))}
          </div>
        </section>
        <Pagination
          count={10} // Assuming you have 10 pages
          onChange={handlePaginationChange}
        />
      </main>
    </div>
  );
};

export default AllProduct;
