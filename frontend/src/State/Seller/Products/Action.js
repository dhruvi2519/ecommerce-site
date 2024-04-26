import { API_BASE_URL, api } from "../../../config/apiConfig";
import {
  FETCH_SELLER_PRODUCTS_FAILURE,
  FETCH_SELLER_PRODUCTS_REQUEST,
  FETCH_SELLER_PRODUCTS_SUCCESS,
} from "./ActionType";

export const fetchSellerProducts = (userId) => async (dispatch) => {
  console.log("seller id in product action", userId);

  try {
    dispatch({ type: FETCH_SELLER_PRODUCTS_REQUEST });
    console.log("helooooo fetch seller product");
    const { data } = await api.get(`/seller/product/${userId}`);
    dispatch({
      type: FETCH_SELLER_PRODUCTS_SUCCESS,
      payload: data,
    });
    console.log(" data in seller in action", data);
  } catch (error) {
    dispatch({
      type: FETCH_SELLER_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

// export const fetchAddresses = (userId) => async (dispatch) => {
//   console.log("User ID:", userId);
//   try {
//     dispatch({ type: FETCH_ADDRESSES_REQUEST });
//     console.log("helooooo fetch address");
//     const { data } = await api.get(`/user/auth/address/${userId}`);
//     console.log("response cart action", data);
//     dispatch({
//       type: FETCH_ADDRESSES_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_ADDRESSES_FAILURE,
//       error: error.message,
//     });
//   }
// };
