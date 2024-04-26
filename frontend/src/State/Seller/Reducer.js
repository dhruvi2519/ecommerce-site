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

const initialState = {
  seller: JSON.parse(localStorage.getItem("user_data")) || null,
  isLoading: false,
  error: null,
  jwt: localStorage.getItem("token") || null,
  sellers: [],
};

const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_REGISTER_REQUEST:
    case SELLER_LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case SELLER_REGISTER_SUCCESS:
    case SELLER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        seller: action.payload,
      };

    case SELLER_REGISTER_FAILURE:
    case SELLER_LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case GET_SELLER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_SELLER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        seller: action.payload,
      };

    case GET_SELLER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default sellerReducer;
