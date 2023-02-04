import { createContext, useState } from "react";

const LoggedInContext = createContext();

const Provider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const setTokenContext = (newToken) => {
    setToken(newToken);
  };

  const setUserIdContext = (userIdNumber) => {
    setUserId(userIdNumber);
  };

  const userLogOut = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <LoggedInContext.Provider
      value={{
        token,
        userId,
        userLogOut,
        setTokenContext,
        setUserIdContext,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export { Provider };
export default LoggedInContext;
