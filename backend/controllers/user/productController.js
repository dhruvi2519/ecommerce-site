const Product = require("../../models/product");
const productService = require("../../utils/mongo/product");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    console.log("Created product controller: ", product);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  console.log("deleteProduct param", productId);
  try {
    const product = await productService.deleteProductById(productId);
    console.log("deleteProduct param", product);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.updateProduct(productId, req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductsByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log("seller id ", userId);
  try {
    const products = await productService.findProductByUserId(userId);

    // console.log("products in seller controller", products);
    if (!products) {
      return res
        .status(404)
        .json({ message: "Products not found for user with id " + userId });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  const reqQuery = req.query;
  console.log("reqQuery", reqQuery);
  try {
    if (Object.keys(reqQuery).length === 0) {
      const products = await productService.getAllProducts(reqQuery);
      // console.log("products controller", products);
      return res.status(200).send(products);
    } else {
      const products = await productService.getAllProducts(reqQuery);
      return res.status(200).send(products);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const AllProducts = async (req, res, next) => {
  try {
    const products = await productService.allProducts();
    return res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

const getAllProductfilter = async (req, res) => {
  const reqQuery = req.query;
  console.log("reqQueryyyyyyyy", reqQuery);
  try {
    if (Object.keys(reqQuery).length === 0) {
      const products = await productService.getAllProduct(reqQuery);
      // console.log("products controller", products);
      return res.status(200).send(products);
    } else {
      const products = await productService.getAllProduct(reqQuery);
      return res.status(200).send(products);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createMultipleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.createMultipleProduct(req.body);
    return res.status(201).send({ message: "products created successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const searchProductsController = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    console.log("searchTerm", searchTerm);
    const products = await Product.find({
      title: { $regex: new RegExp(searchTerm, "i") },
    });
    console.log("product controller", products);
    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  createMultipleProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  searchProductsController,
  findProductsByUserId,
  getAllProductfilter,
  AllProducts,
};
