import { createContext } from "react";
import { useState } from "react";

const LoggedInContext = createContext();

const Provider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const accessData = {
    userId,
    token,
  };

  const updateTokenContext = (newToken) => {
    setToken(newToken);
  };

  const updateUserIdContext = (userIdNumber) => {
    setUserId(userIdNumber);
  };
  // todo maybe instead array, pass props in object? here, below...
  return (
    <LoggedInContext.Provider
      value={{ accessData, updateTokenContext, updateUserIdContext }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export { Provider };
export default LoggedInContext;
