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
import { Button, FormControl, Radio } from "@mui/material";
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
import {
  findAllProducts,
  findProduct,
  findProducts,
} from "../../../State/Product/Action";
import Homesectioncarosol from "../Homesectioncarosol/Homesectioncarosol";
import { fetchColors, fetchSizes } from "../../../State/Filter/Action";
import ProductFilter from "./ProductFIlter";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Product = () => {
  const [Pricerange, setPricerange] = useState("");
  const [Discountrange, setDiscountrange] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const { filter } = useSelector((store) => store);
  const decodeedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodeedQueryString);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const handleFilter = (selectedBrand) => {
    setSelectedBrand(selectedBrand);
    // Check if the brand is already selected
    const isBrandSelected = selectedBrands.includes(selectedBrand);

    // If the brand is not selected, add it to the selectedBrands array
    if (!isBrandSelected) {
      setSelectedBrands([...selectedBrands, selectedBrand]);

      // Dispatch the action to find products based on the selected brand
      dispatch(findProducts({ brand: selectedBrand }));
    } else {
      // If the brand is already selected, remove it from the selectedBrands array
      const updatedSelectedBrands = selectedBrands.filter(
        (brand) => brand !== selectedBrand
      );
      setSelectedBrands(updatedSelectedBrands);

      // Dispatch the action to find products without the deselected brand
      dispatch(findProducts({}));
    }
  };

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(findAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="bg-white">
        <div>
          <main className="mx-auto max-w-7xl px-2 sm:px-8 lg:px-2">
            <div className="flex items-baseline justify-between border-b border-black-200 pb-0 pt-20">
              <h1 className="text-4xl font-bold tracking-tight text-black-900">
                Please, choose a filter according to your preference.
              </h1>
              <div className="flex items-center"></div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-4">
                <div>
                  <form className="hidden lg:block">
                    <span className="font-medium text-black-900">
                      <h1> Available Brands</h1>
                    </span>
                    {/* {product?.allproducts?.content?.uniqueBrands?.map(
                      (brand, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            id={`${index}-checkbox`}
                            name={`${index}-checkbox`}
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleFilter(brand)}
                          />
                          <label htmlFor={`${index}-checkbox`}>{brand}</label>
                        </div>
                      )
                    )} */}{" "}
                    {product?.allproducts?.content?.uniqueBrands?.map(
                      (brand, index) => (
                        <div key={index}>
                          <input
                            type="radio"
                            id={`${index}-radio`}
                            name="brand-radio" // Use the same name for all radio buttons in a group
                            checked={selectedBrand === brand}
                            onChange={() => handleFilter(brand)}
                          />
                          <label htmlFor={`${index}-radio`}>{brand}</label>
                        </div>
                      )
                    )}
                    {/* {singleDiscountFilter.map((section) => (
                      <Disclosure as="div" key={section.id}>
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-black-400 hover:text-black-500">
                                {/*  <span className="font-medium text-gray-900"></span> 
                                <FormLabel
                                  sx={{ color: "black" }}
                                  className="font-medium text-black-500"
                                  id="demo-radio-buttons-group-label"
                                >
                                  {section.name}
                                </FormLabel>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                <FormControl>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                  >
                                    {section.options.map((option) => (
                                      <FormControlLabel
                                        key={option.id}
                                        name={`radio-${section.id}`} // Unique name for the group
                                        checked={Discountrange === option.value}
                                        onChange={(e) => {
                                          if (
                                            e.target.checked &&
                                            section.name === "Discount_Range"
                                          ) {
                                            // console.log("heyyiiiii");
                                            setDiscountrange(option.value);
                                          }
                                          const selectedValue = e;
                                          handleRadioFilterChange(
                                            selectedValue,
                                            section.id
                                          );
                                        }}
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                      />
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))} */}
                    {sortOptions.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-black-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-black-400 hover:text-black-500">
                                <span className="font-medium text-black-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.value}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-black-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-black-600"
                                    >
                                      {option.value}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </div>

                <div className="lg:col-span-3">
                  <div className="flex flex-wrap bg-white">
                    {product?.products &&
                      product?.products?.content?.map((item) => (
                        <ProductCard product={item} />
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Product;
