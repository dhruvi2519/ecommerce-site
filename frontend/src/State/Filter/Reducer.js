import {
  FETCH_COLORS_FAILURE,
  FETCH_COLORS_REQUEST,
  FETCH_COLORS_SUCCESS,
  FETCH_SIZES_FAILURE,
  FETCH_SIZES_REQUEST,
  FETCH_SIZES_SUCCESS,
} from "./ActionType";

const initialState = {
  colors: [],
  loading: false,
  error: null,
  sizes: [],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COLORS_SUCCESS:
      return {
        ...state,
        loading: false,
        colors: action.payload,
      };
    case FETCH_COLORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SIZES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        sizes: action.payload,
      };
    case FETCH_SIZES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
