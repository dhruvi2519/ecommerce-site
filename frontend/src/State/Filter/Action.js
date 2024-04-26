import { api } from "../../config/apiConfig";
import {
  FETCH_COLORS_FAILURE,
  FETCH_COLORS_REQUEST,
  FETCH_COLORS_SUCCESS,
  FETCH_SIZES_FAILURE,
  FETCH_SIZES_REQUEST,
  FETCH_SIZES_SUCCESS,
} from "./ActionType";

export const fetchColors = () => {
  return async (dispatch) => {
    console.log("heyyy come fetch color");
    try {
      dispatch({ type: FETCH_COLORS_REQUEST });
      const { data } = await api.get("/user/color");

      dispatch({ type: FETCH_COLORS_SUCCESS, payload: data });
    } catch (error) {
      //console.log("error", error);
      dispatch({ type: FETCH_COLORS_FAILURE, payload: error });
    }
  };
};

export const fetchSizes = () => {
  return async (dispatch) => {
    console.log("heyyy come fetch size");
    try {
      dispatch({ type: FETCH_SIZES_REQUEST });
      const { data } = await api.get("/user/size");

      dispatch({ type: FETCH_SIZES_SUCCESS, payload: data });
    } catch (error) {
      //console.log("error", error);
      dispatch({ type: FETCH_SIZES_FAILURE, payload: error });
    }
  };
};
