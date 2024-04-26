import React, { useEffect, useState } from "react";
import { api } from "../../config/apiConfig";

const Category = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [colorName, setColorName] = useState("");
  const [size, setSize] = useState("");

  const addSize = async () => {
    try {
      await api.post("http://localhost:5000/user/size", { size });
      alert("Size added successfully!");
      console.log("Size added successfully!");
      setSize("");
    } catch (error) {
      console.error("Error adding size and quantity:", error);
    }
  };

  const addcolour = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:5000/user/color", { name: colorName });
      alert("Color added successfully!");
      setColorName("");
    } catch (error) {
      console.error("Error adding color:", error);
      alert("Failed to add color");
    }
  };
  useEffect(() => {
    fetchParentCategories();
  }, []);

  const fetchParentCategories = async () => {
    try {
      const response = await api.get("http://localhost:5000/user/categories");
      setParentCategories(response.data);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };

  const handleSubmitParentCategory = async (event) => {
    event.preventDefault();
    try {
      const data = await api.post("http://localhost:5000/user/categories", {
        name: subCategory,
      });
      alert("Parent category added successfully!");
      console.log("Parent category added:", data);
      fetchParentCategories();
      setSubCategory(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error adding parent category:", error);
    }
  };

  const handleSubmitSubCategory = async (event) => {
    event.preventDefault();
    try {
      const data = await api.post("http://localhost:5000/user/categories", {
        name: subCategory,
        parentCategoryId: selectedParentCategory,
      });
      alert("Subcategory added successfully!");
      console.log("Subcategory added:", data);
      fetchParentCategories(); // Assuming fetchCategories is a function that fetches updated categories
      setSubCategory(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <div class="flex flex-wrap justify-right">
      <div class="flex">
        <div class="m-4 bg-gray-200 p-6 rounded-lg">
          <h2 class="text-lg font-bold mb-4">Add Parent Category</h2>
          <form onSubmit={handleSubmitParentCategory} class="flex items-center">
            <input
              class="mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Enter parent category name"
            />
            <button
              class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Add Parent Category
            </button>
          </form>
        </div>
      </div>
      <div class="flex">
        <div class="m-4 bg-gray-200 p-6 rounded-lg">
          <h2 class="text-lg font-bold mb-4">Add Subcategory</h2>
          <form onSubmit={handleSubmitSubCategory} class="flex items-center">
            <select
              class="mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={selectedParentCategory}
              onChange={(e) => setSelectedParentCategory(e.target.value)}
            >
              <option value="">Select Parent Category</option>
              {parentCategories
                .filter((category) => category.level === 1)
                .map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <input
              class="mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Enter subcategory name"
            />
            <button
              class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Add Subcategory
            </button>
          </form>
        </div>
      </div>
      <div class="flex">
        <div class="m-4 bg-gray-200 p-6 rounded-lg">
          <h2 class="text-lg font-bold mb-4">Add Subcategory</h2>
          <form onSubmit={handleSubmitSubCategory} class="flex items-right">
            <select
              class="mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={selectedParentCategory}
              onChange={(e) => setSelectedParentCategory(e.target.value)}
            >
              <option value="">Select Sub Category</option>
              {parentCategories
                .filter((category) => category.level === 2)
                .map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <input
              class="mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Enter subcategory name"
            />
            <button
              class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Add Subcategory
            </button>
          </form>
        </div>
      </div>
      <div class="flex">
        <div class="m-4 bg-gray-200 p-6 rounded-lg">
          <h2 class="text-lg font-bold mb-4">Add Color</h2>
          <form onSubmit={addcolour} class="flex items-right">
            <input
              class="mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              placeholder="Enter color name"
            />
            <button
              type="submit"
              class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Color
            </button>
          </form>
        </div>
      </div>
      <div className="flex">
        <div className="m-4 bg-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Add Size</h2>
          <form onSubmit={addSize} className="flex items-center">
            <div className="flex">
              <div>
                <label htmlFor="size">Size:</label>
                <input
                  className="mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type="text"
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Enter Size "
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Add Size
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Category;
