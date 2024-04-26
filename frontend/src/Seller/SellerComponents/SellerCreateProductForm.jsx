import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProducts, fetchCategories } from "../../State/Product/Action";
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
import { Paper } from "@mui/material";
const SellerCreateProductForm = () => {
  const { filter } = useSelector((store) => store);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = useSelector((store) => store);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState("");
  const [colorSizes, setColorSizes] = useState([]);

  const handleColorChange = (index, color) => {
    const updatedColorSizes = [...colorSizes];
    updatedColorSizes[index] = {
      ...updatedColorSizes[index],
      color: color,
    };
    setColorSizes(updatedColorSizes);
  };

  const handleSizeChange = (index, size) => {
    const updatedColorSizes = [...colorSizes];
    updatedColorSizes[index] = {
      ...updatedColorSizes[index],
      sizes: size.split(",").map((s) => s.trim()),
    };
    setColorSizes(updatedColorSizes);
  };

  const handleRemoveColorAndSize = (index) => {
    const updatedColorSizes = [...colorSizes];
    updatedColorSizes.splice(index, 1);
    setColorSizes(updatedColorSizes);
  };
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    colors: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    sizes: "",
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    user: localStorage.getItem("userId") || "",
  });

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
    let Allsizes = [];

    filter?.sizes?.map((el, req) => {
      Allsizes.push({ size: el.name, quantity: req.body });
    });

    setSelectedSizeIndex(Allsizes);
  }, [dispatch]);

  useEffect(() => {
    console.log("Hey please check this ", selectedSizeIndex);
  }, [selectedSizeIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== "colors" && name !== "sizes") {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value.split(","),
      }));
    }

    if (name === "topLevelCategory") {
      setProductData((prevState) => ({
        ...prevState,
        secondLevelCategory: "",
        thirdLevelCategory: "",
      }));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", productData.imageUrl);
    formData.append("brand", productData.brand);
    formData.append("title", productData.title);

    // Map colors to their corresponding sizes
    colorSizes.forEach((colorSize, index) => {
      formData.append(`colors[${index}][color]`, colorSize.color);
      colorSize.sizes.forEach((size, sizeIndex) => {
        formData.append(`colors[${index}][sizes][${sizeIndex}]`, size);
      });
    });

    formData.append("discountedPrice", productData.discountedPrice);
    formData.append("price", productData.price);
    formData.append("discountPercent", productData.discountPercent);
    formData.append("quantity", productData.quantity);
    formData.append("topLevelCategory", productData.topLevelCategory);
    formData.append("secondLevelCategory", productData.secondLevelCategory);
    formData.append("thirdLevelCategory", productData.thirdLevelCategory);
    formData.append("description", productData.description);
    formData.append("user", productData.user);

    try {
      await dispatch(createProducts(formData));
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add Product");
    }
  };

  const handleAddColorAndSize = () => {
    setColorSizes([...colorSizes, { color: "", sizes: [] }]);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);
      reader.onload = (e) => {
        const imageUrlBase64 = e.target.result;
        console.log("imageUrlBase64", imageUrlBase64);
        setProductData({ ...productData, imageUrl: imageUrlBase64 });
      };
      reader.readAsDataURL(file);
      // Optionally, you can set a preview of the image
      const previewImage = URL.createObjectURL(file);
      console.log("previewImage", previewImage);
      document.getElementById("previewImage").src = previewImage;
    }
  };
  return (
    <Paper elevation={2} className="createProductContainer p-10">
      <ToastContainer />
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          my: 5,
          backgroundColor: "#f0f8ff",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          color: "#333",
          padding: "20px",
        }}
      >
        ADD NEW PRODUCT
      </Typography>
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={3}>
          {/* File input and image preview */}
          <Grid item xs={12} sm={4}>
            {/* Add button for uploading image */}
            <input
              type="file"
              id="fileInput"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            <img
              id="previewImage"
              src={productData.imageUrl}
              alt=""
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          </Grid>

          {/* Brand text field */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>

          {/* Total Quantity text field */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Total Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          {/* Price text field */}
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

          {/* Discounted Price text field */}
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

          {/* Discount Percent text field */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
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

          {/* Submit button */}
          <Grid item xs={12}>
            {colorSizes.map((colorSize, index) => (
              <div key={index}>
                <TextField
                  label={`Color ${index + 1}`}
                  value={colorSize.color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                />
                <TextField
                  label={`Sizes for Color ${index + 1}`}
                  value={colorSize.sizes.join(", ")}
                  onChange={(e) => handleSizeChange(index, e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={() => handleRemoveColorAndSize(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="contained" onClick={handleAddColorAndSize}>
              Add Color and Sizes
            </Button>

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
    </Paper>
  );
};

export default SellerCreateProductForm;
