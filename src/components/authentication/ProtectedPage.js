import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

const ProtectedPage = ({ children }) => {
  const { token } = useAuthentication();
  //******************************************************************** */
  // JSX code
  //******************************************************************** */
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedPage;
