import { createContext, useState } from "react";

const LoggedInContext = createContext();

const Provider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  const setTokenContext = (newToken) => {
    setToken(newToken);
  };
  const setUserIdContext = (userIdNumber) => {
    setUserId(userIdNumber);
  };
  const setUserNameContext = (newUsername) => {
    setUserName(newUsername);
  };

  const userLogOut = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);
  };

  return (
    <LoggedInContext.Provider
      value={{
        token,
        userId,
        userName,
        userLogOut,
        setTokenContext,
        setUserIdContext,
        setUserNameContext,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export { Provider };
export default LoggedInContext;
