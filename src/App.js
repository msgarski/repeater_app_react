import React from "react";
import AppRoutes from "./router/AppRoutes";
import "./App.scss";
import NavHeader from "./components/navigation/NavHeader";

import useAuthentication from "./hooks/useAuthentication";
import axios from "axios";
import { API_URL } from "./general/constants";

function App() {
  const {
    token,
    userId,
    setTokenContext,
    setUserIdContext,
    setUserNameContext,
  } = useAuthentication();

  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common["Authorization"] = token;

  return (
    <>
      <NavHeader />
      <AppRoutes />
    </>
  );
}

export default App;
