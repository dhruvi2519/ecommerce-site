const Cart = require("../../models/cart");
const CartItems = require("../../models/cartItems");
const Product = require("../../models/product");
const updateCartItem = require("../mongo/cartItems");
const Coupon = require("../../models/coupon");
async function createCart(userId) {
  console.log("hello create cart");
  try {
    const cart = new Cart({ userId });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

const fs = require("fs");
const path = require("path");

async function finduserCart(user) {
  try {
    console.log("user cart", user);
    const cart = await Cart.findOne({ user: user });

    console.log("0-0-0-0-0-0-0-0-0-00-0-0", cart);
    let cartItems = await CartItems.find({ cart: cart }).populate("product");

    // Convert image URLs to base64
    for (let i = 0; i < cartItems.length; i++) {
      const imageUrl = cartItems[i].product.imageUrl;
      if (imageUrl) {
        const imagePath = path.join(__dirname, "images", imageUrl); // Adjust the path as per your project structure
        console.log("Image path:", imagePath);
        const imageData = fs.readFileSync(imagePath);
        const base64Image = imageData.toString("base64");
        cartItems[i].product.imageUrl = `data:image/jpeg;base64,${base64Image}`;
      }
    }

    let res = {
      LineItems: cartItems,
      totalDiscountedPrice: cart?.totalDiscountedPrice,
      totalItem: cart?.totalItem,
      totalPrice: cart?.totalPrice,
      totalDiscount: cart?.totalDiscount,
      _id: cart?._id,
    };

    return res;
  } catch (error) {
    console.log("in user cart");
    console.error("Error finding user cart:", error);
    return null;
  }
}

const addCartItem = async (userId, item) => {
  try {
    const productId = item.productId;
    const product = await Product.findById(productId);
    console.log("productssssssssssss", product);

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId });
    }

    let cartItem = await CartItems.findOne({
      cart: cart._id,
      product: productId,
    });

    if (!cartItem) {
      cartItem = await CartItems.create({
        quantity: item.quantity || 1,
        price: product.price,
        discountedPrice: product.discountedPrice,
        discount: product.price - product.discountedPrice,
        product: productId,
        user: userId,
        cart: cart._id,
        size: item.size,
        imageUrl: item.base64Image,
      });
    } else {
      cartItem.quantity += item.quantity || 1;
      await cartItem.save();
    }

    const cartItems = await CartItems.find({ cart: cart._id });
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalQuantity = 0;
    let totalDiscount = 0;

    for (let i = 0; i < cartItems.length; i++) {
      const currentItem = cartItems[i];
      const itemPrice = currentItem.price * currentItem.quantity;
      const itemDiscountedPrice =
        currentItem.discountedPrice * currentItem.quantity;
      const itemDiscount = itemPrice - itemDiscountedPrice;

      totalQuantity += currentItem.quantity;
      totalPrice += itemPrice;
      totalDiscountedPrice += itemDiscountedPrice;
      totalDiscount += itemDiscount;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalQuantity;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalDiscount = totalDiscount;

    await cart.save();

    return {
      message: "Item added to the cart",
      cartId: cart._id,
      cartItem: cartItem,
    };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error("Internal Server Error");
  }
};

const applyCouponToCart = async (couponCode) => {
  console.log("couponCode", couponCode);

  try {
    const foundCoupon = await Coupon.findOne({ couponCode: couponCode });
    console.log("foundCoupon", foundCoupon);

    if (!foundCoupon) {
      throw new Error("Coupon not found");
    }
    const productId = foundCoupon.productId;
    console.log("productId", productId);
    const cartItems = await CartItems.findOne({ product: productId });
    console.log("cartItems", cartItems);
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Product not found in cart");
    }
    let price = cartItems.price;
    price -= foundCoupon.totalAmount;
    cartItems.price = price;
    await cartItems.save();
    console.log("update cartItems", cartItems);

    let cart = await Cart.findOne({ user: cartItems.user });
    console.log("cart before update", cart);
    if (!cart) {
      throw new Error("Cart not found");
    }
    cart.totalPrice -= foundCoupon.totalAmount;

    await cart.save();
    console.log("update cart", cart);
    return { success: true, message: "Coupon applied successfully" };
  } catch (error) {
    console.error("Error applying coupon:", error);
    return { success: false, message: error.message };
  }
};

module.exports = { addCartItem, finduserCart };
module.exports.createCart = createCart;
module.exports.applyCouponToCart = applyCouponToCart;
