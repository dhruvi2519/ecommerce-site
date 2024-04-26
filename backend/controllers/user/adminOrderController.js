const orderService = require("../../utils/mongo/order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrder();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const confirmedOrders = async (req, res) => {
  const orderId = await req.params.orderId;
  try {
    const orders = await orderService.confirmedOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shippOrders = async (req, res) => {
  const orderId = await req.params.orderId;
  try {
    const orders = await orderService.shipOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrders = async (req, res) => {
  const orderId = await req.params.orderId;
  try {
    const orders = await orderService.deliverOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelledOrders = async (req, res) => {
  const orderId = await req.params.orderId;
  try {
    const orders = await orderService.cancelledOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrders = async (req, res) => {
  const orderId = req.params.orderId;
  console.log("Deleting Order with ID", orderId);
  try {
    const orders = await orderService.deleteOrder(orderId);
    console.log("orderID controller", orderId);
    console.log("orders controller", orders);
    return res.status(200).send(orders);
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  confirmedOrders,
  shippOrders,
  deliverOrders,
  cancelledOrders,
  deleteOrders,
};
