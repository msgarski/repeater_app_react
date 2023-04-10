import { Route, Routes } from "react-router-dom";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import Home from "../components/Home";
import ForgotPassword from "../components/authentication/ForgotPassword";
import PorchSite from "../components/PorchSite";
import ResetPassword from "../components/authentication/ResetPassword";
import AccuntActivation from "../components/authentication/AccountActivation";
import ProtectedPage from "../components/authentication/ProtectedPage";
import MainScreen from "../components/MainScreen";
import NewCourse from "../components/courses/NewCourse";
import MainOptions from "../components/settings/MainOptions";
import RepeatPhase from "../components/presentations/RepeatPhase";
import CoursePage from "../components/courses/CoursePage";
import NewLesson from "../components/lessons/NewLesson";
import LessonInterior from "../components/lessons/LessonInterior";

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
        <Route
          path="mainscreen"
          element={
            <ProtectedPage>
              <MainScreen />
            </ProtectedPage>
          }
        />
        <Route
          path="newcourse"
          element={
            <ProtectedPage>
              <NewCourse />
            </ProtectedPage>
          }
        />
        <Route
          path="mainoptions"
          element={
            <ProtectedPage>
              <MainOptions />
            </ProtectedPage>
          }
        />
        <Route path="resetpass" element={<ResetPassword />}>
          <Route path=":resetToken" element={<ResetPassword />}></Route>
        </Route>
        <Route path="accountactivation" element={<AccuntActivation />}>
          <Route path=":activationToken" element={<AccuntActivation />}></Route>
        </Route>
        <Route path="repeatphase" element={<RepeatPhase />}>
          <Route path=":course_id" element={<RepeatPhase />}></Route>
        </Route>
        <Route path="course" element={<CoursePage />}>
          <Route path=":course_id" element={<CoursePage />}></Route>
        </Route>
        <Route path="newlesson" element={<NewLesson />}>
          <Route path=":course_id" element={<NewLesson />}></Route>
        </Route>
        <Route path="lesson" element={<LessonInterior />}>
          <Route path=":lesson_id" element={<LessonInterior />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
