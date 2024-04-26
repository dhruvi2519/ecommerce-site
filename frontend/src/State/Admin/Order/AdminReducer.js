// ordersReducer.js

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

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const adminordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };

    case GET_ORDER_FAILURE:
      return {
        ...state,
        orders: [],
        isloading: false,
        error: action.payload,
      };
    case CONFIRM_ORDER_REQUEST:
    case PLACE_ORDER_REQUEST:
    case DELIVER_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        confirmed: action.payload,
        isloading: false,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        placed: action.payload,
        isloading: false,
      };
    case DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        delivered: action.payload,
        isloading: false,
      };
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        canceled: action.payload,
        isloading: false,
      };
    case CONFIRM_ORDER_FAILURE:
    case PLACE_ORDER_FAILURE:
    case DELIVER_ORDER_FAILURE:
    case CANCEL_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isloading: false,
      };

    case DELETE_ORDER_REQUEST:
      return {
        ...state,

        loading: true,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SHIP_ORDER_REQUEST:
      return {
        ...state,
        isloading: true,
        error: null,
      };
    case SHIP_ORDER_SUCCESS:
      return {
        ...state,
        isloading: false,
        shipped: action.payload,
      };
    case SHIP_ORDER_FAILURE:
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminordersReducer;
