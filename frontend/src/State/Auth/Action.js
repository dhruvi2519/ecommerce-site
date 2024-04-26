import axios from "axios";
import { API_BASE_URL, api } from "../../config/apiConfig";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/auth/registration`,
      userData
    );
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("token", user.jwt);
      localStorage.setItem("user_data", JSON.stringify(user));
      // localStorage.setItem("user_data", {
      //   fullName: user.fullName,
      //   email: user.email,
      // });
    }
    console.log("user", user);
    dispatch(registerSuccess(user.jwt));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/auth/login`,
      userData
    );
    const user = response.data;
    //console.log("useredata", user);
    localStorage.setItem("token", user.data.token);
    //console.log("user.data.userId", user.data.userId);
    localStorage.setItem("userId", user.data.userId);

    localStorage.setItem("role", user.data.role);
    console.log("user.data.role", user.data.role);
    localStorage.setItem("user_data", JSON.stringify(user.data));
    dispatch(loginSuccess(user.data));
    // console.log("userdataaaaa", user);
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await axios.get(`${API_BASE_URL}/user/auth/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("user", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });

  localStorage.clear();
};

export const fetchAllUsers = () => {
  return async (dispatch) => {
    console.log("heyyy come fetch user");
    try {
      dispatch({ type: FETCH_USERS_REQUEST });
      const { data } = await api.get("/user/auth/alluser");
      console.log("data", data);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: FETCH_USERS_FAILURE, payload: error });
    }
  };
};
