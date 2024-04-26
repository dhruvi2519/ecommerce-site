import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for routing
import { api } from "../../config/apiConfig";
import { Button, MenuItem } from "@mui/material";
import { fetchSellerProducts } from "../../State/Seller/Products/Action";
import { useDispatch } from "react-redux";
import { findProducts } from "../../State/Product/Action";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Fetch the id from URL params

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(findProducts(userId));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/user/admin/product/${id}`, updateData);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  return (
    <div style={{ margin: "100px auto", maxWidth: "600px" }}>
      <h2 style={{ marginBottom: "20px" }}>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="imageUrl" style={{ display: "block" }}>
            Image ````````:
          </label>
          <input
            type="file"
            id="fileInput"
            // onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="brand" style={{ display: "block" }}>
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={updateData.brand || product.brand}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="title" style={{ display: "block" }}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updateData.title || product.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="colors" style={{ display: "block" }}>
            Colors:
          </label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={updateData.colors || product.colors}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="discountedPrice" style={{ display: "block" }}>
            Discounted Price:
          </label>
          <input
            type="number"
            id="discountedPrice"
            name="discountedPrice"
            value={updateData.discountedPrice || product.discountedPrice}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="price" style={{ display: "block" }}>
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={updateData.price || product.price}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="discountPercent" style={{ display: "block" }}>
            Discount Percent:
          </label>
          <input
            type="number"
            id="discountPercent"
            name="discountPercent"
            value={updateData.discountPercent || product.discountPercent}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="sizes" style={{ display: "block" }}>
            Sizes:
          </label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={updateData.sizes || product.sizes}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="quantity" style={{ display: "block" }}>
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={updateData.quantity || product.quantity}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="topLevelCategory" style={{ display: "block" }}>
            Top Level Category:
          </label>
          <select
            id="topLevelCategory"
            name="topLevelCategory"
            value={updateData.topLevelCategory || product.topLevelCategory}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {product?.categories
              ?.filter((category) => category.level === 1)
              .map((category) => (
                <MenuItem key={category.id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="secondLevelCategory" style={{ display: "block" }}>
            Second Level Category:
          </label>
          <select
            id="secondLevelCategory"
            name="secondLevelCategory"
            value={
              updateData.secondLevelCategory || product.secondLevelCategory
            }
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {product?.categories
              ?.filter(
                (category) =>
                  category.level === 2 &&
                  category.parentCategory === product.topLevelCategory
              )
              .map((level2Cat) => (
                <MenuItem key={level2Cat.id} value={level2Cat._id}>
                  {level2Cat.name}
                </MenuItem>
              ))}
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="thirdLevelCategory" style={{ display: "block" }}>
            Third Level Category:
          </label>
          <select
            id="thirdLevelCategory"
            name="thirdLevelCategory"
            value={updateData.thirdLevelCategory || product.thirdLevelCategory}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {product?.categories
              ?.filter(
                (category) =>
                  category.level === 3 &&
                  category.parentCategory === product.secondLevelCategory
              )
              .map((level3Cat) => (
                <MenuItem key={level3Cat.id} value={level3Cat._id}>
                  {level3Cat.name}
                </MenuItem>
              ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="description" style={{ display: "block" }}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={updateData.description || product.description}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
