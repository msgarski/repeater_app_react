import React from "react";
import AppRoutes from "./router/AppRoutes";
import "./App.scss";
import NavHeader from "./components/navigation/NavHeader";
function App() {
  return (
    <>
      <NavHeader />
      <AppRoutes />
    </>
  );
}

export default App;
