const orderService = require("../../utils/mongo/order");

const createOrder = async (req, res) => {
  const { orderData, shippingAddress } = req.body; // Destructuring req.body to extract cartItems and shippingAddress

  const userId = req.user[0]._id;

  console.log("userId in order controller", userId);
  console.log("cartItems in order controller", orderData);
  console.log("shippingAddress in order controller", shippingAddress);
  try {
    let createdOrder = await orderService.createOrders(
      userId,
      orderData,
      shippingAddress
    );
    console.log("createdOrder", createdOrder);
    res.status(201).send(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  const orderId = req.params.id;
  console.log("order id controller ", req.params.id);

  try {
    const createdOrder = await orderService.findOrderById(orderId);
    console.log("createdOrder", createdOrder);
    if (!createdOrder) {
      return res.status(404).send({ error: "Order not found" });
    }
    res.status(200).send(createdOrder);
  } catch (error) {
    console.error("Error in findOrderByIdController:", error);
    return res.status(500).send({ error: error.message });
  }
};

const orderHistory = async (req, res) => {
  const user = await req.user;
  try {
    let OrderHistory = await orderService.userOrderHistory(user._id);
    console.log("OrderHistory", OrderHistory);
    res.status(201).send(OrderHistory);
  } catch (error) {
    return res.status(201).send({ error: error.message });
  }
};

const findOrderByUserIdController = async (req, res) => {
  const userId = req.user[0]._id;
  console.log("userId in controller", userId);
  try {
    const orders = await orderService.findOrderByUserId(userId);
    console.log("orders in controller", orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const findOrderBySellerIdController = async (req, res) => {
  const userId = req.user[0]._id;
  console.log("seller Id  in controller", userId);
  try {
    const orders = await orderService.findOrderBySellerId(userId);
    console.log("orders in controller seller", orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  orderHistory,
  findOrderByUserIdController,
  findOrderBySellerIdController,
};
