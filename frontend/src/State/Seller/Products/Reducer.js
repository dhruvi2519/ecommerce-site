import {
  FETCH_SELLER_PRODUCTS_FAILURE,
  FETCH_SELLER_PRODUCTS_REQUEST,
  FETCH_SELLER_PRODUCTS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

const sellerProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELLER_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SELLER_PRODUCTS_SUCCESS:
      {
        console.log("action.payload in seller products", action.payload);
      }
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case FETCH_SELLER_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default sellerProductsReducer;
