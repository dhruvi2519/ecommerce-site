const ProductModel = require("../../models/product");
const Category = require("../../models/category");
const Product = require("../../models/product");
const query = require("express");
const fs = require("fs");
const path = require("path");

// async function getAllProducts(reqQuery) {
//   let {
//     category,
//     color,
//     sizes,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//     type = "all",
//   } = reqQuery;

//   pageSize = parseInt(pageSize) || 10;
//   pageNumber = parseInt(pageNumber) || 0;

//   let query = Product.find().populate("category");
//   // console.log("query", query);
//   if (category) {
//     const existCategory = await Category.findOne(
//       category._id ? { _id: category._id } : { name: category }
//     );
//     if (existCategory) {
//       query = query.where("Category").equals(category);
//     }
//   }

//   console.log("category fun", category);

//   if (color) {
//     query = query.where("Color").equals(color);
//   }
//   console.log("color fun", color);

//   if (sizes && Array.isArray(sizes)) {
//     query = query.where("Size").in(sizes);
//   } else if (sizes) {
//     query = query.where("Size").equals(sizes);
//   }
//   console.log("sizes fun", sizes);

//   if (minPrice && maxPrice) {
//     query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
//   }
//   console.log("minPrice fun", minPrice);
//   console.log("maxPrice fun", maxPrice);

//   if (minDiscount) {
//     query = query.where("discountPercent").gte(minDiscount);
//   }
//   console.log("minDiscount fun", minDiscount);

//   if (stock) {
//     if (stock === "in_stock") {
//       query = query.where("stock").gt(0);
//     } else if (stock === "out_of_stock") {
//       query = query.where("stock").lte(0);
//     }
//   }

//   if (sort === "price_low") {
//     query = query.sort({ discountedPrice: 1 });
//   } else if (sort === "price_high") {
//     query = query.sort({ discountedPrice: -1 });
//   }
//   console.log("sort fun", sort);
//   if (type !== "all") {
//     query = `${query}&type=${type}`;
//   }
//   try {
//     // let query = {};
//     console.log("hssasas", query);

//     const totalProducts = await Product.countDocuments(query);
//     console.log("totalProducts", totalProducts);
//     const totalPages = Math.ceil(totalProducts / pageSize);

//     const skip = Math.max(0, pageNumber * pageSize);

//     const products = await Product.find(query)
//       .skip(skip)
//       .limit(pageSize)
//       .exec();
//     console.log("productsssssss", products);

//     // Return the fetched products along with pagination details
//     return { content: products, currentPage: pageNumber, totalPages };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// }

async function getAllProducts(reqQuery) {
  let { category: categoryId, brand } = reqQuery;

  try {
    let query = {};

    if (categoryId) {
      const existCategory = await Category.findById(categoryId);
      console.log("existCategory", existCategory);
      if (!existCategory) {
        throw new Error("Category not found");
      }
      query.category = existCategory._id;
      console.log("existCategory.id ", existCategory._id);
    }

    if (brand) {
      query.brand = brand;
      console.log("brand", brand);
    }

    const products = await Product.find(query).exec();

    console.log("products", products);
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const imageUrl = product.imageUrl;
        const imagePath = path.join(
          "D:",
          "eproject",
          "backend",
          "utils",
          "mongo",
          "images",
          imageUrl
        );

        const imageData = fs.readFileSync(imagePath);

        const base64Image = imageData.toString("base64");

        product.imageUrl = "data:image/jpeg;base64," + base64Image;

        return product;
      })
    );

    return { content: productsWithImages };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function getAllProduct(reqQuery) {
  let { brand } = reqQuery;

  try {
    let query = Product.find();

    if (brand) {
      query = query.where({ brand: brand });
    }
    console.log("brand", brand);

    // if (categoryId) {
    //   query = query.where({ category: categoryId }).populate("category");
    // }

    const products = await query.exec();
    // console.log("products in mongo get all products", products);

    // Convert and assign base64 images
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const imageUrl = product.imageUrl;
        const imagePath = path.join(
          "D:",
          "eproject",
          "backend",
          "utils",
          "mongo",
          "images",
          imageUrl
        );

        const imageData = fs.readFileSync(imagePath);

        const base64Image = imageData.toString("base64");

        product.imageUrl = "data:image/jpeg;base64," + base64Image;

        return product;
      })
    );
    return { content: productsWithImages };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

const allProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");

    // Extract unique brand names from products
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        try {
          const imageUrl = product.imageUrl;
          const imagePath = path.join(__dirname, "images", imageUrl); // Assuming images are stored relative to this file

          // Read image file synchronously
          const imageData = fs.readFileSync(imagePath);

          // Convert image data to base64
          const base64Image = imageData.toString("base64");

          // Update product with base64 image
          product.imageUrl = `data:image/jpeg;base64,${base64Image}`;

          return product;
        } catch (error) {
          console.error("Error processing product:", error);
          return product; // Return original product in case of error
        }
      })
    );

    // Return products with base64 images and unique brand names
    return {
      content: {
        products: productsWithImages,
        uniqueBrands: uniqueBrands,
      },
    };
  } catch (error) {
    next(error);
  }
};

async function getProductByProductId({ product_id }) {
  console.log("heloooooo");
  try {
    const product = await ProductModel.findById({ _id: product_id });
    console.log("product - - - ----", product);
    return product;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/product at getProductByProductId ==> Error : ",
      error
    );
  }
}

async function updateProduct(productId, updateData) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

async function findProductById(product_id) {
  console.log("Finding product with ID:", product_id);
  try {
    const product = await Product.findById(product_id)
      .populate("category")
      .exec();

    if (!product) {
      throw new Error("Product not found with id " + product_id);
    }

    const imageUrl = product.imageUrl;
    const imagePath = path.join(
      "D:",
      "eproject",
      "backend",
      "utils",
      "mongo",
      "images",
      imageUrl
    );

    console.log("Image path:", imagePath);

    const imageData = fs.readFileSync(imagePath);
    console.log("imageData", imageData);

    const base64Image = imageData.toString("base64");
    console.log("Base64 Image:", base64Image);

    product.imageUrl = "data:image/jpeg;base64," + base64Image;

    console.log("Product with Base64 Image:", product);

    return product;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to fetch image data");
  }
}

async function createProduct(reqData) {
  try {
    let topLevel = await Category.findOne({
      _id: reqData.topLevelCategory,
    }).select("name");

    let secondLevel = await Category.findOne({
      _id: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });

    let thirdLevel = await Category.findOne({
      _id: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    }).select("name");

    const imageUrl = reqData.imageUrl;
    console.log("imageurl", imageUrl);
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const imageName = "image_" + Date.now() + ".png";

    const imagePath = path.join(__dirname, "images", imageName);

    fs.writeFileSync(imagePath, buffer);
    console.log("Image saved successfully:", imageName);
    const imageUrlPath = imageName;
    console.log("imageUrlPath", imageUrlPath);
    const product = new Product({
      title: reqData.title || "",
      description: reqData.description || "",
      discountedPrice: reqData.discountedPrice || 0,
      discountPersent: reqData.discountPersent || 0,
      imageUrl: imageUrlPath || "",
      brand: reqData.brand || "",
      price: reqData.price || 0,
      quantity: reqData.quantity || 0,
      category: thirdLevel,
      highlights: reqData.highlights || "",
      Details: reqData.Details || "",
      user: reqData.user || "",
      colors: reqData.colors || [],
    });

    // Check if colors exist and convert them to string
    if (reqData.colors) {
      product.colors = reqData.colors.map((colorObj) => ({
        color: colorObj.color,
        sizes: colorObj.sizes,
      }));
    }
    return await product.save();
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }
}

async function deleteProductById(product_id) {
  console.log("helloooo delete", product_id);
  try {
    const product = await ProductModel.findById({ _id: product_id });
    console.log("productsss", product);
    await Product.findByIdAndDelete(product_id);

    return "Product deleted successfully";
  } catch (error) {
    console.error("Error deleting product:", error);
    console.log("error", error);
    return "An error occurred while deleting the product";
  }
}

async function searchProducts(query) {
  console.log("hellooooo query");
  try {
    const searchResults = await Product.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    return searchResults;
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error("Error searching products");
  }
}

const findProductByUserId = async (userId) => {
  try {
    const products = await Product.find({ user: userId })
      .populate("category")
      .exec();

    for (const product of products) {
      const imageUrl = product.imageUrl;
      const imagePath = path.join(
        "D:",
        "eproject",
        "backend",
        "utils",
        "mongo",
        "images",
        imageUrl
      );

      console.log("Image path:", imagePath);

      const imageData = fs.readFileSync(imagePath);
      console.log("imageData", imageData);

      const base64Image = imageData.toString("base64");
      console.log("Base64 Image:", base64Image);

      product.imageUrl = "data:image/jpeg;base64," + base64Image;

      console.log("Product with Base64 Image:", product);
    }

    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: "Failed to fetch products" };
  }
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProductByProductId = getProductByProductId;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProductById = deleteProductById;
module.exports.allProducts = allProducts;
module.exports.findProductById = findProductById;
module.exports.searchProducts = searchProducts;
module.exports.findProductByUserId = findProductByUserId;
module.exports.getAllProduct = getAllProduct;
