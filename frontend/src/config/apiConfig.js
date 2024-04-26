import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

const jwt = localStorage.getItem("token");
//alert(jwt);
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
