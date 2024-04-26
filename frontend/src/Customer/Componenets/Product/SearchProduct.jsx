import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { mens_kurta } from "../../Data/Men/men_kurta";
import { filterSize, filters, singleDiscountFilter } from "./FilterData";
import { singleFilter } from "./FilterData";
import { sortOptions } from "./FilterData";
import { FormControl, Radio } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@headlessui/react";
import { FormControlLabel } from "@mui/material";
import { handleFilter, useParams } from "react-router-dom";
import { Routes } from "react-router-dom";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";
import Homesectioncarosol from "../Homesectioncarosol/Homesectioncarosol";
import { fetchColors, fetchSizes } from "../../../State/Filter/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SearchProduct = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [Pricerange, setPricerange] = useState("");
  const [Discountrange, setDiscountrange] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(false);
  let queryParams = new URLSearchParams(location.search);
  const param = useParams();
  console.log("param", param);
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const { filter } = useSelector((store) => store);
  const decodeedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodeedQueryString);

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    let data = {
      categoryId: param.id || "",
    };
    console.log("heyee", data);
    dispatch(findProducts(data));
  }, [param.id]);

  let url = window.location.pathname;
  let path = url.split("/");
  let name = null;
  if (path[2]) {
    name = path[2];
  }
  useEffect(() => {
    console.log("idddddddd", name);
  }, [name]);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, [dispatch]);

  return (
    <>
      <div className="bg-white">
        <div>
          <main className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-5">
            <div className="flex items-baseline justify-between border-b border-black-200 pb-8 pt-20">
              <h1 className="text-4xl font-bold tracking-tight text-black-900">
                Products
              </h1>

              <div className="flex items-center"></div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-4">
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap bg-white">
                    {product?.products &&
                      product?.products?.content?.map((item) => (
                        <ProductCard product={item} />
                      ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full px=[3.6rem]">
              <div className="px-4 py-5 justify-center">
                <Pagination
                  count={product.products?.totalPages}
                  color="secondary"
                  onChange={handlePaginationChange}
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
