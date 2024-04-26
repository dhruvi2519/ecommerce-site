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
  /* GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS, */
} from "./ActionType";

const initialState = {
  orders: [],
  ordersData: [],
  order: [],
  error: null,
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orderData: action.payload,
        error: null,
      };

    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };
    case GET_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    /*  case GET_ORDER_HISTORY_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case GET_ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_ORDER_HISTORY_FAILURE:
      return {
        loading: false,
        error: action.payload,
        orders: [],
      }; */
    case GET_ORDERS_BY_USERID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDERS_BY_USERID_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case GET_ORDERS_BY_USERID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ORDERS_BY_SELLERID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDERS_BY_SELLERID_SUCCESS:
      {
        console.log("action.payload", action.payload);
      }
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case GET_ORDERS_BY_SELLERID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
