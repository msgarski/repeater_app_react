import { Route, Routes } from "react-router-dom";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import Home from "../components/Home";
import ForgotPassword from "../components/authentication/ForgotPassword";
import PorchSite from "../components/PorchSite";
import ResetPassword from "../components/authentication/ResetPassword";
import AccuntActivation from "../components/authentication/AccountActivation";
import ProtectedPage from "../components/authentication/ProtectedPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route patsh="*" element={<SignIn />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="forgot" element={<ForgotPassword />}></Route>
        <Route
          path="porch"
          element={
            <ProtectedPage>
              <PorchSite />
            </ProtectedPage>
          }
        ></Route>
        <Route path="resetpass" element={<ResetPassword />}>
          <Route path=":resetToken" element={<ResetPassword />}></Route>
        </Route>
        <Route path="accountactivation" element={<AccuntActivation />}>
          <Route path=":activationToken" element={<AccuntActivation />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
