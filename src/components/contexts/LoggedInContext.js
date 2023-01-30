import { createContext } from "react";
import { useState } from "react";

const LoggedInContext = createContext();

const Provider = ({ children }) => {
  const [accessData, setAccessData] = useState({ userId: null, token: null });

  const updateAccessToken = (newToken) => {
    setAccessData((accessData) => ({ ...accessData, token: newToken }));
  };
  const setUserId = (userIdNumber) => {
    setAccessData((accessData) => ({ ...accessData, userId: userIdNumber }));
  };
  // todo maybe instead array, pass props in object? here, below...
  return (
    <LoggedInContext.Provider
      value={[accessData, updateAccessToken, setUserId]}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export { Provider };
export default LoggedInContext;
