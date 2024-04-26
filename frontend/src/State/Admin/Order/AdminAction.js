// ordersActions.js

import axios from "axios";
import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVER_ORDER_FAILURE,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./AdminActionType";

// Action creators for getting orders
export const getOrders = (reqData) => {
  console.log("get all orders", reqData);
  return async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });

    try {
      const { data } = await api.get(`/user/admin/order`);
      console.log("get all orders response", data);
      dispatch({ type: GET_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_ORDER_FAILURE, payload: error });
    }
  };
};

// Action creators for confirming an order
export const confirmOrder = (reqData) => {
  console.log("get all confirmOrder", reqData);
  return async (dispatch) => {
    dispatch({ type: CONFIRM_ORDER_REQUEST });

    try {
      const { data } = await api.put(`/user/admin/order/confirm/:id`);
      console.log("get all confirmOrder response", data);
      dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: CONFIRM_ORDER_FAILURE, payload: error });
    }
  };
};

// Action creators for placing an order

export const placeOrder = (reqData) => {
  console.log("get all placeOrder", reqData);
  return async (dispatch) => {
    dispatch({ type: PLACE_ORDER_REQUEST });

    try {
      const { data } = await api.put(`/user/admin/order/place/:id`);
      console.log("get all placeOrder response", data);
      dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: PLACE_ORDER_FAILURE, payload: error });
    }
  };
};

// Action creators for delivering an order

export const deliverOrder = (reqData) => {
  console.log("get all deliverOrder", reqData);
  return async (dispatch) => {
    dispatch({ type: DELIVER_ORDER_REQUEST });

    try {
      const { data } = await api.put(`/user/admin/order/deliver/:id`);
      console.log("get all deliverOrder response", data);
      dispatch({ type: DELIVER_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: DELIVER_ORDER_FAILURE, payload: error });
    }
  };
};

// Action creators for cancelling an order

export const cancelOrder = (reqData) => {
  console.log("get all cancelOrder", reqData);
  return async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });

    try {
      const { data } = await api.put(`/user/admin/order/cancel/:id`);
      console.log("get all cancelOrder response", data);
      dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: CANCEL_ORDER_FAILURE, payload: error });
    }
  };
};

// Action creators for deleting an order

export const deleteOrder = (reqData) => {
  console.log("get all deleteOrder", reqData);
  return async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });

    try {
      const { data } = await api.delete(`/user/admin/order/delete/:id`);
      console.log("get all deleteOrder response", data);
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: DELETE_ORDER_FAILURE, payload: error });
    }
  };
};

// Action creators for shipping an order

export const shipOrder = (reqData) => {
  console.log("get all shipOrder", reqData);
  return async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });

    try {
      const { data } = await api.put(`/user/admin/order/ship/:id`);
      console.log("get all shipOrder response", data);
      dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: SHIP_ORDER_FAILURE, payload: error });
    }
  };
};
