import { useContext } from "react";
import LoggedInContext from "../contexts/LoggedInContext";

const ForgotPassword = () => {
  const [accessData] = useContext(LoggedInContext);

  return <div>forgotten password: {accessData.userId}</div>;
};

export default ForgotPassword;
