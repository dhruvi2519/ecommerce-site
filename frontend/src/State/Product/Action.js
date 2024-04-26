import { API_BASE_URL, api } from "../../config/apiConfig";
import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
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
export const findProducts = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: FIND_PRODUCTS_REQUEST });

    let url = "/user/products";

    if (reqData) {
      const { categoryId, brand } = reqData;

      // Check karein agar categoryId mojood hai ya nahi
      if (categoryId !== undefined) {
        // Agar categoryId mojood hai, to uski value URL mein shaamil karein
        url += `?category=${categoryId}`;
      } else {
        // Agar categoryId nahi hai, to sirf category query parameter add karein
        url += `?category=`;
      }

      if (brand) {
        // Agar brand mojood hai, '&' ke saath brand query parameter ko bhi URL mein shaamil karein
        url += `&brand=${brand}`;
      }
    }

    console.log("Requesting products from:", url);

    const { data } = await api.get(url);
    console.log("Received products data:", data);

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error finding products:", error);

    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FIND_ALL_PRODUCTS_REQUEST });

    const { data } = await api.get("/user/products");
    console.log("all products", data);
    // Fetch all products

    dispatch({ type: FIND_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_ALL_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProduct = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_PRODUCTS_REQUEST });

    let url = "/user/products/all";

    if (reqData && reqData.brand) {
      url += `?brand=${reqData.brand}`;
    }

    const response = await api.get(url);
    dispatch({ type: FILTER_PRODUCTS_SUCCESS, payload: response.data });
    return response.data; // Returning data for potential future use
  } catch (error) {
    dispatch({ type: FILTER_PRODUCTS_FAILURE, payload: error.message });
    throw error; // Re-throwing error for potential future handling
  }
};
export const findProductsById = (product_id) => async (dispatch) => {
  // console.log("hellooooooo");
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  if (!product_id) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: "Request data is missing.",
    });
    return;
  }

  // const { product_id } = reqData;

  try {
    const { data } = await api.get(`/user/products/id/${product_id}`);
    console.log("datavvvvv", {
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const fetchCategories = () => {
  return async (dispatch) => {
    console.log("heyyy come fetch");
    try {
      dispatch({ type: FETCH_CATEGORIES_REQUEST });
      const { data } = await api.get("/user/categories");
      // console.log("response", response);
      // const { data } = await response.json();
      //console.log("fetchCategories", data);

      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
      //console.log("error", error);
      dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error });
    }
  };
};

export const createProduct = (product) => async (dispatch) => {
  console.log("data create products", product);
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/user/admin/product`,
      product
    );
    console.log(" createdddd products", data);
    dispatch({
      type: CREATE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });

    const { data } = await api.delete(
      `${API_BASE_URL}/user/admin/product/${productId}`
    );
    console.log("delete products", data);
    dispatch({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: productId,
    });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const createProducts = (product) => async (dispatch) => {
  //console.log("data create products", product);
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });

    const { data } = await api.post(`/user/admin/product`, product);
    console.log(" createdddd products", data);
    dispatch({
      type: CREATE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
  }
};
