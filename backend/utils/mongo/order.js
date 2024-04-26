const OrderItems = require("../../models/OrderItems");
const Address = require("../../models/address");
const Cart = require("../../models/cart");
const CartItems = require("../../models/cartItems");
const Order = require("../../models/order");
const OrderModel = require("../../models/order");
const Product = require("../../models/product");
const cartService = require("../mongo/cartservice");
const fs = require("fs");
const path = require("path");

const getAllOrder = async (req, res) => {
  try {
    console.log("here get all order");
    const orders = await Order.find().populate("orderData");
    for (const order of orders) {
      for (const item of order.orderData) {
        const imageUrl = item?.imageUrl;
        console.log("imageUrl:", imageUrl);

        const imagePath = path.join(
          "D:",
          "eproject",
          "backend",
          "utils",
          "mongo",
          "images",
          imageUrl
        );

        try {
          const imageData = fs.readFileSync(imagePath);
          const base64Image = imageData.toString("base64");
          item.imageUrl = "data:image/jpeg;base64," + base64Image; // Assign base64 image data to imageUrl of each item
        } catch (error) {
          console.error("Error reading image file:", error);
          // Handle the error accordingly, maybe skip this item or log the error
        }
      }
    }

    console.log("orders", orders);
    return orders;
  } catch (error) {
    console.error("Error while fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function findOrderById(order_id) {
  try {
    const order = await OrderModel.find({ _id: order_id }).populate(
      "orderItems"
    );
    console.log("order in function", order);
    console.log("orderId in function", order_id);
    return order;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/order at findOrderById ==> Error : ",
      error
    );
    throw error;
  }
}

const createOrders = async (userId, orderData) => {
  console.log("orderData", orderData);
  console.log("userId", userId);

  try {
    // if (!orderData || !Array.isArray(orderData)) {
    //   throw new Error("Cart items must be provided as an array.");
    // }

    const product = await Product.find({ user: userId });
    console.log("product", product);
    const order = await Order.create({
      user: userId,
      orderData: orderData,
      shippingAddress: orderData.shippingAddress,
      paymentStatus: orderData.paymentStatus,
      orderStatus: orderData.orderStatus,
    });

    return {
      message: "Order created successfully",
      order: order,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Internal Server Error");
  }
};

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "confirmed";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "shipped";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "delivered";

  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "cancelled";

  return await order.save();
}

async function userOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "placed" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    console.log("orders history function", orders);
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

const findOrderByUserId = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).populate("orderData");
    console.log("orders++++", orders);

    for (const order of orders) {
      for (const item of order.orderData) {
        const imageUrl = item?.imageUrl;
        console.log("imageUrl:", imageUrl);

        const imagePath = path.join(
          "D:",
          "eproject",
          "backend",
          "utils",
          "mongo",
          "images",
          imageUrl
        );

        try {
          const imageData = fs.readFileSync(imagePath);
          const base64Image = imageData.toString("base64");
          item.imageUrl = "data:image/jpeg;base64," + base64Image; // Assign base64 image data to imageUrl of each item
        } catch (error) {
          console.error("Error reading image file:", error);
          // Handle the error accordingly, maybe skip this item or log the error
        }
      }
    }

    console.log("orders in findOrderByUserId ", orders);

    return orders;
  } catch (error) {
    console.error("Error finding orders by user ID:", error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

async function deleteOrder(orderId) {
  try {
    const order = await Order.find({ _id: orderId });
    console.log("order function", orderId);
    await OrderModel.findByIdAndDelete(orderId);
    console.log("Order deleted successfully");
    return order;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("An error occurred while deleting the order");
  }
}

const findOrderBySellerId = async (userId) => {
  try {
    // Find orders where orderData contains user with sellerId
    const orders = await Order.find().populate("orderData");
    console.log("orders*********", orders);
    // Loop through orders
    for (const order of orders) {
      // Loop through orderData items
      for (const item of order.orderData) {
        const imageUrl = item?.imageUrl;
        console.log("imageUrl:", imageUrl);

        const imagePath = path.join(
          "D:",
          "eproject",
          "backend",
          "utils",
          "mongo",
          "images",
          imageUrl
        );

        try {
          const imageData = fs.readFileSync(imagePath);
          const base64Image = imageData.toString("base64");
          item.imageUrl = "data:image/jpeg;base64," + base64Image;
        } catch (error) {
          console.error("Error reading image file:", error);
        }
      }
    }

    console.log("orders for seller ", orders);

    return orders;
  } catch (error) {
    console.error("Error finding orders for seller:", error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

module.exports.getAllOrder = getAllOrder;
module.exports.findOrderById = findOrderById;
module.exports.createOrders = createOrders;
module.exports.deleteOrder = deleteOrder;
module.exports.findOrderBySellerId = findOrderBySellerId;
module.exports.userOrderHistory = userOrderHistory;
module.exports.findOrderByUserId = findOrderByUserId;
module.exports.cancelledOrder = cancelledOrder;
module.exports.deliverOrder = deliverOrder;
module.exports.shipOrder = shipOrder;
module.exports.confirmedOrder = confirmedOrder;
