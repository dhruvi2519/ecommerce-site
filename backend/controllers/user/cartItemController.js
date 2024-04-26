const cartItemService = require("../../utils/mongo/cartItems");

const updateCartItem = async (req, res) => {
  console.log("req", req.params);
  try {
    const userId = req.params.userId; // Assuming req.user correctly holds the user ID
    console.log("userId:", userId);

    const cartItemId = req.params.cartItemId;
    console.log("cartItemId:", cartItemId);

    const cartItemData = req.params.cartItemData; // Assuming cart item data is sent in the request body
    console.log("cartItemData:", cartItemData);

    const updatedCartItem = await cartItemService.updateCartItem(
      userId,
      cartItemId,
      cartItemData
    );

    return res.status(200).send(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).send({ error: error.message });
  }
};
const removeCartItem = async (req, res) => {
  const user = await req.user;
  const cartItem = await req.params.cartItemId;
  console.log("cartItem", req.params.cartItemId);
  console.log("req.user", req.user);
  try {
    await cartItemService.removeCartItem(user, cartItem);

    console.log("cartItemService", cartItemService);
    console.log("req.params", req.params);
    return res.status(200).send({ message: "cart item removed successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = { updateCartItem, removeCartItem };
