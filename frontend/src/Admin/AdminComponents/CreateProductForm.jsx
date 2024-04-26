import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, fetchCategories } from "../../State/Product/Action";
import { fetchColors, fetchSizes } from "../../State/Filter/Action";
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductForm = () => {
  const { filter } = useSelector((store) => store);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = useSelector((store) => store);
  const [selectedValue, setSelectedValue] = useState("");
  const [sizes, setSizes] = useState([""]);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState("");
  const [selectedSizefield, setSelectedSizefield] = useState("");
  const [selectedSize, setSelectedSize] = useState({});

  const [file, setFile] = useState();

  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    colors: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    sizes: " ",
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    user: localStorage.getItem("userId") || "",
  });
  //console.log("productDataaaaaaaaaaaaa", productData);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
    let Allsizes = [];

    filter?.sizes?.map((el) => {
      Allsizes.push({ size: el.name[0], quantity: 0 });
    });
    setSelectedSizeIndex(Allsizes);
    console.log("Hey please check this ", selectedSizeIndex);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "topLevelCategory") {
      setProductData((prevState) => ({
        ...prevState,
        secondLevelCategory: "",
        thirdLevelCategory: "",
      }));
    }
  };

  const handleSizeChange = (value) => {
    setSelectedSizefield(value[0]);
    console.log("Selected size:", value[0]);
  };

  const handleQuantityChange = (event, fieldName) => {
    const value = event.target.value;
    console.log("fieldName", selectedSizefield);
    const newSizeValue = [...selectedSizeIndex];
    newSizeValue.find((el) => el.size === selectedSizefield[0]).quantity =
      Number(value);
    console.log(
      "newSizeValue : ",
      newSizeValue.find((el) => el.size === selectedSizefield[0]).quantity
    );
    console.log("Hey eee");

    setSelectedSizeIndex(newSizeValue);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      dispatch(createProduct(productData)).then(() => {
        toast.success("Product added successfully!");
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add Product");
    }
    console.log("productDatacccc", productData);
  };

  return (
    <div className="createProductContainer p-10">
      <ToastContainer />
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10">
        ADD NEW PRODUCT
      </Typography>
      <form
        onSubmit={handleSubmit}
        method="post"
        enctype="multipart/form-data"
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              name="imageUrl"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const imageUrl = e.target.result;

                    document.getElementById("previewImage").src = imageUrl;
                  };
                  reader.readAsDataURL(file);
                }
                handleChange(e);
              }}
            />
            <img id="previewImage" src="imageUrl" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Select Color</InputLabel>
              <Select
                name="colors"
                label="Select Color"
                value={selectedValue}
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                  handleChange(e);
                }}
              >
                {filter.colors.map((colorOption) => (
                  <MenuItem key={colorOption.id} value={colorOption.name}>
                    {colorOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={3.5}>
            <TextField
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                {product?.categories
                  ?.filter((category) => category.level === 1)
                  .map((category) => (
                    <MenuItem key={category.id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
                disabled={!productData.topLevelCategory}
              >
                {product?.categories
                  ?.filter(
                    (category) =>
                      category.level === 2 &&
                      category.parentCategory === productData.topLevelCategory
                  )
                  .map((level2Cat) => (
                    <MenuItem key={level2Cat.id} value={level2Cat._id}>
                      {level2Cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
                disabled={!productData.secondLevelCategory}
              >
                {product?.categories
                  ?.filter(
                    (category) =>
                      category.level === 3 &&
                      category.parentCategory ===
                        productData.secondLevelCategory
                  )
                  .map((level3Cat) => (
                    <MenuItem key={level3Cat.id} value={level3Cat._id}>
                      {level3Cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Select Size</InputLabel>
              <Select
                label="sizes"
                name="sizes"
                value={selectedSizefield}
                onChange={(e) => {
                  setSelectedSizefield(e.target.value);
                  console.log("e.target.value", e.target.value);
                  handleChange(e);
                }}
                required
              >
                {filter?.sizes?.length > 0 ? (
                  filter.sizes.map((sizeOption, index) => (
                    <MenuItem key={index} value={sizeOption.name}>
                      {sizeOption.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No sizes available</MenuItem>
                )}
              </Select>
            </FormControl>
            {selectedSizeIndex !== "" && (
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={
                  selectedSizeIndex.find(
                    (el) => el.size === selectedSizefield[0]
                  )?.quantity || ""
                }
                // value={selectedSizeIndex[selectedSizefield]?.quantity || ""}
                onChange={(e) => {
                  handleQuantityChange(e, "quantity");
                  handleSubmit(e);
                }}
                type="number"
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
