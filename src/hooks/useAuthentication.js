import { useContext } from "react";
import LoggedInContext from "../components/contexts/LoggedInContext";

const useAuthentication = () => {
  return useContext(LoggedInContext);
};
export default useAuthentication;
