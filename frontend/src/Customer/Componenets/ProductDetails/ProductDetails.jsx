import { useEffect, useState } from "react";

import {
  Grid,
  Rating,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action.js";
import ProductCard from "../Product/ProductCard.jsx";
import { addItemToCart } from "../../../State/Cart/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setSelectedColor(selectedColor);

    const colorData = product?.product?.colors.find(
      (color) => color === selectedColor
    );
    if (colorData) {
      setAvailableSizes(colorData.sizes);
      setSelectedSize("");
    } else {
      setAvailableSizes([]);
      setSelectedSize("");
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    const data = {
      userId: userId,
      productId: params.id,
      size: selectedSize,
      quantity: quantity,
    }; // Include quantity in the data object
    dispatch(addItemToCart(data));
    toast.success("Item added to cart!");
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    dispatch(findProductsById(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (
      product &&
      product.colors &&
      product.colors.length > 0 &&
      product.sizes &&
      product.sizes.length > 0
    ) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);
  return (
    <div className="bg-white">
      <div className="pt-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          <div className="flex flex-col items-center">
            <img
              src={product?.product?.imageUrl}
              alt=""
              className="h-full w-full object-cover object-center max-w-[30rem] max-h-[35rem]"
            />
          </div>
          <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <Typography variant="h4" gutterBottom>
              {product?.product?.brand?.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {product?.product?.title}
            </Typography>
            <div className="flex space-x-5 items-center text-lg text-gray-900 mt-6">
              <Typography variant="h6">
                ₹ {product?.product?.discountedPrice?.$numberDecimal}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="line-through"
              >
                ₹ {product?.product?.price?.$numberDecimal}
              </Typography>
            </div>
            <div className="mt-6">
              <div className="flex item-center space-x-3">
                <Rating name="read-only" value={4.5} readOnly />
                <Typography variant="body2" color="textSecondary">
                  56786 Ratings
                </Typography>
                <Typography
                  variant="body2"
                  className="text-pink-600 hover:text-pink-500"
                >
                  3647 Reviews
                </Typography>
              </div>
            </div>
            <form className="mt-10" onSubmit={handleAddToCart}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Select Color</InputLabel>
                    <Select
                      name="colors"
                      label="Select Color"
                      value={selectedColor}
                      onChange={handleColorChange}
                    >
                      {product?.product?.colors &&
                        product?.product?.colors?.map((color, index) => (
                          <MenuItem key={index} value={color}>
                            {color.color} {/* Render color name */}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Select Size</InputLabel>
                    <Select
                      name="sizes"
                      label="Select Size"
                      value={selectedSize}
                      onChange={handleSizeChange}
                    >
                      {availableSizes.map((size, index) => (
                        <MenuItem key={index} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="flex items-center">
                    <Typography variant="subtitle1" className="mr-2">
                      Quantity:
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={decreaseQuantity}
                    >
                      -
                    </Button>
                    <Typography variant="subtitle1" className="mx-2">
                      {quantity}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={increaseQuantity}
                    >
                      +
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </section>
        {/* Recent reviews section */}
        <Divider />
        <section>
          <Typography variant="h4" className="py-5">
            Recent Review & Rating
          </Typography>
          {/* Product review cards */}
          <div className="border p-5">
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {[1].map((item) => (
                    <ProductReviewCard key={item} />
                  ))}
                </div>
              </Grid>
              <Grid item xs={5}>
                {/* Product ratings */}
                <Typography variant="h5" className="pb-2">
                  Product Ratings
                </Typography>
                <div className="flex item-center space-x-3">
                  <Rating value={4.6} precision={0.5} readOnly></Rating>
                  <Typography variant="body2" color="textSecondary">
                    56748 Ratings
                  </Typography>
                </div>
                {/* Display ratings */}
                <Box className="mt-5 space-y-3">
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    {/* Display ratings */}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>
        {/* Similar products section */}
        <section>
          <Typography variant="h4" className="product-title py-5">
            Similar Products:
          </Typography>
          {/* Display similar products */}
          <div className="flex flex-wrap space-y-5 pt-10">
            {product?.product?.content &&
              product?.product?.content.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
