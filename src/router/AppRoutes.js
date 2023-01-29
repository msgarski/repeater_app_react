import { Route, Routes } from "react-router-dom";

import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import Home from "../components/Home";
import ForgotPassword from "../components/authentication/ForgotPassword";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="forgot" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
