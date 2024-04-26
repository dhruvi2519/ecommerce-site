const {
  getAllCategories,
  getCategoryByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("./categories");
const {
  getAlluser,
  findUserById,
  updateUser,
  deleteUser,
  getUserProfileByToken,
  getUserByUserEmail,
  createUser,
  findUserByAddress,
  createAddress,
  getAlladdress,
} = require("./user");
const {
  getAllProducts,
  getProductByProductId,
  createProduct,
  updateProduct,
  deleteProduct,
  createMultipleProduct,
  findProductById,
  searchProducts,
  deleteProductById,
  findProductsByUserId,
  findProductByUserId,
  getAllProduct,
  allProducts,
} = require("./product");
const {
  getAllOrder,
  getOrderByOrderId,
  createOrder,
  deleteOrder,
  userOrderHistory,
  cancelledOrder,
  deliverOrder,
  shipOrder,
  confirmedOrder,
  createOrders,
  findOrderByUserId,
  findOrderBySellerId,
} = require("./order");
const {
  updateCartItem,
  removeCartItem,
  findCartItemById,
} = require("./cartItems");
const {
  addCartItem,
  finduserCart,
  applyCouponToCart,
} = require("./cartservice");
const { createRating, getProductRating } = require("./rating");
const { getAllReview, createReview } = require("./review");
const { createsize, getsizeBysizeId, getAllsizes } = require("./size");
const { getAllcolor, getcolorBycolorId, createcolor } = require("./color");
const { getAllbrand, getbrandBybrandId, createbrand } = require("./brand");
const { createSeller, getSeller } = require("./seller");
const {
  createCoupon,
  createsCoupon,
  checkCouponsForCartItems,
} = require("./coupon");

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

module.exports.getAllCategories = getAllCategories;
module.exports.getCategoryByCategoryId = getCategoryByCategoryId;
module.exports.createCategory = createCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;

module.exports.getAllOrder = getAllOrder;
module.exports.findOrderByUserId = findOrderByUserId;
module.exports.createOrders = createOrders;
module.exports.userOrderHistory = userOrderHistory;
module.exports.deleteOrder = deleteOrder;
module.exports.cancelledOrder = cancelledOrder;
module.exports.deliverOrder = deliverOrder;
module.exports.shipOrder = shipOrder;
module.exports.confirmedOrder = confirmedOrder;
module.exports.findOrderBySellerId = findOrderBySellerId;

module.exports.getAlluser = getAlluser;
module.exports.findUserById = findUserById;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserProfileByToken = getUserProfileByToken;
module.exports.getUserByUserEmail = getUserByUserEmail;
module.exports.findUserByAddress = findUserByAddress;
module.exports.createAddress = createAddress;
module.exports.getAlladdress = getAlladdress;

module.exports.updateCartItem = updateCartItem;
module.exports.removeCartItem = removeCartItem;
module.exports.findCartItemById = findCartItemById;

module.exports.addCartItem = addCartItem;
module.exports.finduserCart = finduserCart;

module.exports.createRating = createRating;
module.exports.getProductRating = getProductRating;

module.exports.createReview = createReview;
module.exports.getAllReview = getAllReview;

module.exports.getAllsizes = getAllsizes;
module.exports.getsizeBysizeId = getsizeBysizeId;
module.exports.createsize = createsize;

module.exports.getAllcolor = getAllcolor;
module.exports.getcolorBycolorId = getcolorBycolorId;
module.exports.createcolor = createcolor;

module.exports.getAllbrand = getAllbrand;
module.exports.getbrandBybrandId = getbrandBybrandId;
module.exports.createbrand = createbrand;

module.exports.createSeller = createSeller;
module.exports.getSeller = getSeller;

module.exports.createsCoupon = createsCoupon;

module.exports.applyCouponToCart = applyCouponToCart;
module.exports.checkCouponsForCartItems = checkCouponsForCartItems;
