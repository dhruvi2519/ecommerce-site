import { API_BASE_URL, api } from "../../config/apiConfig";
import {
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  APPLY_COUPON_FAILURE,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_COUPONS_FAILURE,
  FETCH_COUPONS_REQUEST,
  FETCH_COUPONS_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  SET_SELECTED_ADDRESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

/*  dispatch({ type: FIND_PRODUCTS_REQUEST });
    try {
      let { data } = await api.get(`/user/products`);
      // console.log("product data-----", data);
      dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    } */

export const getCart = (userId) => async (dispatch) => {
  console.log("User ID:", userId);
  try {
    dispatch({ type: GET_CART_REQUEST });
    console.log("helooooooooos");
    let { data } = await api.get(`/user/cart/${userId}`);
    console.log("Cart data:", data);
    localStorage.setItem("CartItems", data.LineItems.length);
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching cart:", error);
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    const { data } = await api.post(
      `/user/cart/add-to-cart/${reqData.productId}`,
      reqData
    );

    console.log("add item to cart", data);

    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};
export const removeCartItem = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    const { data } = await api.delete(`/user/cartItem/${reqData.cartItemId}`);
    console.log("data remove cart action", data);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: reqData });
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    console.log("heloooooo update ");
    const { data } = await api.put(
      `/user/cartItem/${reqData.cartItemId}`,
      reqData
    );
    console.log("dataupdate", data);
    console.log("reqData", reqData);
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const fetchAddresses = (userId) => async (dispatch) => {
  console.log("User ID:", userId);
  try {
    dispatch({ type: FETCH_ADDRESSES_REQUEST });
    console.log("helooooo fetch address");
    const { data } = await api.get(`/user/auth/address/${userId}`);
    console.log("response cart action", data);
    dispatch({
      type: FETCH_ADDRESSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ADDRESSES_FAILURE,
      error: error.message,
    });
  }
};

export const selectAddress = (address) => ({
  type: SET_SELECTED_ADDRESS,
  payload: address,
});

export const addAddress = (addressData) => async (dispatch) => {
  console.log("data create addresssssssss");
  try {
    dispatch({ type: ADD_ADDRESS_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/user/auth/address`,
      addressData
    );
    console.log("data address action", data);
    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Failed to add address:", error.message);
    dispatch({ type: ADD_ADDRESS_FAILURE, payload: error.message });
  }
};

export const applyCoupon = (couponCode, couponData) => async (dispatch) => {
  console.log("Applying coupon...");
  try {
    dispatch({ type: APPLY_COUPON_REQUEST });

    // Make API call to apply coupon
    const response = await api.post(
      `${API_BASE_URL}/seller/coupon/apply/${couponCode}`,
      couponData
    );

    // Dispatch success action with the coupon data
    dispatch({ type: APPLY_COUPON_SUCCESS, payload: response.data });
    console.log("Coupon applied successfully:", response.data);
  } catch (error) {
    console.error("Failed to apply coupon:", error.message);
    // Dispatch failure action with error message
    dispatch({ type: APPLY_COUPON_FAILURE, payload: error.message });
  }
};

export const fetchCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COUPONS_REQUEST });

    const { data } = await api.get(
      "http://localhost:5000/seller/coupon/related-coupons"
    );
    console.log("data in fetch coupon", data);
    dispatch({ type: FETCH_COUPONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COUPONS_FAILURE, payload: error.message });
  }
};
