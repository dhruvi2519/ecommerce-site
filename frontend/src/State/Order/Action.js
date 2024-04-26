import { API_BASE_URL, api } from "../../config/apiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDERS_BY_SELLERID_FAILURE,
  GET_ORDERS_BY_SELLERID_REQUEST,
  GET_ORDERS_BY_SELLERID_SUCCESS,
  GET_ORDERS_BY_USERID_FAILURE,
  GET_ORDERS_BY_USERID_REQUEST,
  GET_ORDERS_BY_USERID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./ActionType";

export const createOrder =
  (userId, orderData, shippingAddress, products) => async (dispatch) => {
    try {
      if (!orderData || !Array.isArray(orderData)) {
        throw new Error("Cart items must be provided as an array.");
      }

      // Dereference ObjectId and retrieve value
      const orderId = orderData;
      console.log("Order ID:", orderId);

      dispatch({ type: CREATE_ORDER_REQUEST });

      const requestData = {
        userId: userId,
        orderData: orderId,
        shippingAddress: shippingAddress,
        products: products,
      };

      const data = await api.post(`/user/order`, requestData);

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });

      throw error;
    }
  };

export const getOrderById = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    const { data } = await api.get(`${API_BASE_URL}/user/order/${orderId}`);
    console.log("order id action", orderId);
    console.log("order by id ", data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllOrders = () => {
  return async (dispatch) => {
    console.log("heyyy come fetch order");
    try {
      dispatch({ type: GET_ALL_ORDERS_REQUEST });
      const { data } = await api.get("/user/admin/order");
      console.log("get all orders", data);
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      //console.log("error", error);
      dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error });
    }
  };
};

export const getOrdersByUserID = (userId) => {
  return async (dispatch) => {
    console.log("Fetching orders by userID:", userId);
    try {
      dispatch({ type: GET_ORDERS_BY_USERID_REQUEST });
      const { data } = await api.get(`/seller/product/orders/${userId}`);
      console.log("Orders for user ID", data);
      dispatch({ type: GET_ORDERS_BY_USERID_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching orders by userID:", userId, error);
      dispatch({ type: GET_ORDERS_BY_USERID_FAILURE, payload: error });
    }
  };
};

export const getOrdersBySellerID = (userId) => {
  return async (dispatch) => {
    console.log("Fetching orders by userID:", userId);
    try {
      dispatch({ type: GET_ORDERS_BY_SELLERID_REQUEST });
      const { data } = await api.get(`/seller/product/orders/seller/${userId}`);
      console.log("Orders for user ID", data);
      dispatch({ type: GET_ORDERS_BY_SELLERID_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching orders by userID:", userId, error);
      dispatch({ type: GET_ORDERS_BY_SELLERID_FAILURE, payload: error });
    }
  };
};
