import axios from "axios";
import { API_URL } from "./constants";

export const http1 = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const httpJWT = axios;

export const setAuthTokenHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const shouldWeUpdateContextJWT = (response = null, oldToken = null) => {
  let newToken = response.data.newToken;

  if (!response || !oldToken) {
    return true;
  } else {
    return !!oldToken.localeCompare(newToken);
  }
};
