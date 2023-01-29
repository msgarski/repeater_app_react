import { createContext } from "react";
import { useState } from "react";

const LoggedInContext = createContext();

const Provider = ({ children }) => {
  const currState = {
    loggedIn: false,
    token: null,
  };
  // useState hook for updating weather user is still logged or not
  const [isLoggedIn, setIsLoggedIn] = useState(currState);

  // function for changing isLoggedIn state
  const userLoginState = (newState) => {
    setIsLoggedIn({ loggedIn: newState.loggedIn, token: newState.token });
  };

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      {children}
    </LoggedInContext.Provider>
  );
};

export { Provider };
export default LoggedInContext;
