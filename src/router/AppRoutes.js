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
import LessonPage from "../components/lessons/LessonPage";
import SingleImport from "../components/cards/SingleImport";
import MassImport from "../components/cards/MassImport";
import LearningNew from "../components/presentations/LearningNew";
import EditLesson from "../components/lessons/EditLesson";
import EditCourse from "../components/courses/EditCourse";

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
        <Route
          path="course"
          element={
            <ProtectedPage>
              <CoursePage />
            </ProtectedPage>
          }
        >
          <Route path=":course_id" element={<CoursePage />}></Route>
        </Route>
        <Route
          path="newlesson"
          element={
            <ProtectedPage>
              <NewLesson />
            </ProtectedPage>
          }
        >
          <Route path=":course_id" element={<NewLesson />}></Route>
        </Route>
        <Route
          path="lesson"
          element={
            <ProtectedPage>
              <LessonPage />
            </ProtectedPage>
          }
        >
          <Route path=":lesson_id" element={<LessonPage />}></Route>
        </Route>
        <Route
          path="singleimport"
          element={
            <ProtectedPage>
              <SingleImport />
            </ProtectedPage>
          }
        >
          <Route path=":lesson_id" element={<SingleImport />}></Route>
        </Route>
        <Route
          path="massimport"
          element={
            <ProtectedPage>
              <MassImport />
            </ProtectedPage>
          }
        >
          <Route path=":lesson_id" element={<MassImport />}></Route>
        </Route>
        <Route
          path="learningnew"
          element={
            <ProtectedPage>
              <LearningNew />
            </ProtectedPage>
          }
        >
          <Route path=":courseId" element={<LearningNew />}></Route>
        </Route>

        <Route
          path="editlesson"
          element={
            <ProtectedPage>
              <EditLesson />
            </ProtectedPage>
          }
        >
          <Route path=":lessonId" element={<EditLesson />}></Route>
        </Route>

        <Route
          path="editcourse"
          element={
            <ProtectedPage>
              <EditCourse />
            </ProtectedPage>
          }
        >
          <Route path=":courseId" element={<EditCourse />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
