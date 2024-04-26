import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  SET_SELECTED_ADDRESS,
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAILURE,
  FETCH_COUPONS_REQUEST,
  FETCH_COUPONS_SUCCESS,
  FETCH_COUPONS_FAILURE,
} from "./ActionType";

const initialState = {
  cart: [],
  loading: false,
  error: null,
  addresses: [],
  coupon: null,
  selectedAddress: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
    case GET_CART_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case FETCH_ADDRESSES_REQUEST:
    case ADD_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_ITEM_TO_CART_SUCCESS:
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };

    case REMOVE_CART_ITEM_SUCCESS:
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload.cart, // Assuming the payload contains the updated cart object
      };

    case ADD_ITEM_TO_CART_FAILURE:
    case GET_CART_FAILURE:
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
    case FETCH_ADDRESSES_FAILURE:
    case ADD_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
        loading: false,
      };

    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };

    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
        error: null,
      };
    case APPLY_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupon: action.payload,
      };
    case APPLY_COUPON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_COUPONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: action.payload,
        error: "",
      };
    case FETCH_COUPONS_FAILURE:
      return {
        ...state,
        loading: false,
        coupon: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
