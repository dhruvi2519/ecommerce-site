const Cart = require("../../models/cart");
const CartItems = require("../../models/cartItems");
const Register = require("../../models/user");
const user = require("../mongo/user");
const userService = require("../mongo/user");
const Decimal128 = require("mongodb").Decimal128;

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    console.log("cartItemData:", cartItemData);
    console.log("userId:", userId);
    console.log("cartItemId:", cartItemId);

    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error(`Cart item not found: ${cartItemId}`);
    }

    // Assuming your Register model correctly references the user ID
    const user = await Register.findById(user._id);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    if (userId !== item.user.toString()) {
      throw new Error("You cannot update another user's cart item.");
    }

    item.quantity = cartItemData.quantity;
    item.price = item.quantity * item.product.price;
    item.discountedPrice = item.quantity * item.product.discountedPrice;

    const updatedCartItem = await item.save();

    // Rest of your function...

    return {
      message: "Cart item updated successfully",
      cartItem: updatedCartItem,
    };
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Internal Server Error");
  }
}

const removeCartItem = async (userId, cartItemId) => {
  try {
    console.log("userId", userId);
    console.log("cartItemId", cartItemId);

    // Find the cart item by its ID
    const cartItem = await CartItems.findById(cartItemId);
    if (!cartItem) {
      throw new Error(`Cart item not found: ${cartItemId}`);
    }

    // Find the user by their ID
    const user = await Register.findById(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    // Ensure the user owns the cart item
    if (user._id.toString() !== cartItem.user.toString()) {
      throw new Error("You cannot remove another user's cart item.");
    }

    // Delete the cart item
    await CartItems.findByIdAndDelete(cartItemId);

    // Update the user's cart details
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.totalPrice -= cartItem.price * cartItem.quantity;
      cart.totalItem -= cartItem.quantity;
      cart.totalDiscountedPrice -= cartItem.discountedPrice * cartItem.quantity;
      cart.totalDiscount -=
        (cartItem.price - cartItem.discountedPrice) * cartItem.quantity;

      await cart.save();
    }

    return "Cart item removed successfully.";
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw new Error("Internal Server Error");
  }
};

async function findCartItemById(cartItemId) {
  console.log("saalkjslkakahsa", cartItemId);
  const cartItem = await CartItems.find({ cart: cartItemId }).populate(
    "product"
  );
  console.log("dhruvicart", cartItem);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error(`No cart item with id ${cartItemId}`);
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById };
