import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FILTER_PRODUCTS_FAILURE,
  FILTER_PRODUCTS_REQUEST,
  FILTER_PRODUCTS_SUCCESS,
  FIND_ALL_PRODUCTS_FAILURE,
  FIND_ALL_PRODUCTS_REQUEST,
  FIND_ALL_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";

const initialState = {
  allproducts: [],
  products: [],
  brands: [],
  product: null,
  loading: false,
  error: null,
  categories: [],
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FIND_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };
    case FIND_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FIND_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null, products: action.payload };
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };

    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedproduct: action.payload,
      };
    case FIND_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCTS_SUCCESS:
      console.log("action.payload", action.payload);
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case CREATE_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        brands: null,
        error: action.payload,
      };
    case FILTER_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FILTER_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
        error: null,
      };
    case FILTER_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
