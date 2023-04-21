import { Navigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
//************************************************************************ */
// Function component
//************************************************************************ */
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
