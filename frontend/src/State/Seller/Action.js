// sellerActions.js

import {
  GET_SELLER_FAILURE,
  GET_SELLER_REQUEST,
  GET_SELLER_SUCCESS,
  SELLER_LOGIN_FAILURE,
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_REGISTER_FAILURE,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
} from "./ActionType";
import { API_BASE_URL, api } from "../../config/apiConfig";

export const registerSeller = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_REGISTER_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/user/seller/registration`,
      userData
    );
    console.log(" register seller", data);
    dispatch({
      type: SELLER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: SELLER_REGISTER_FAILURE,
      payload: error.message,
    });
  }
};

export const loginSeller = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_LOGIN_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/user/seller/login`,
      userData
    );
    console.log(" login seller", data);
    localStorage.setItem("token", data.data.token);
    //console.log("user.data.userId", seller.data.userId);
    localStorage.setItem("userId", data.data.userId);

    localStorage.setItem("role", data.data.role);
    console.log("user.data.role", data.data.role);
    localStorage.setItem("user_data", JSON.stringify(data.data));
    dispatch({
      type: SELLER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: SELLER_LOGIN_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllSellers = (userData) => async (dispatch) => {
  try {
    dispatch({ type: GET_SELLER_REQUEST });

    const { data } = await api.get(`/user/seller`, userData);
    console.log(" all seller", data);
    dispatch({
      type: GET_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_SELLER_FAILURE,
      payload: error.message,
    });
  }
};
