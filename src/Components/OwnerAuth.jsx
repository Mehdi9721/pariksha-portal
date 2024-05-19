import { createContext, useContext, useState } from 'react';

const OwnerAuthContext = createContext();

export const OwnerAuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setLoggedIn(false);
  };

  return (
    <OwnerAuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};

export const useOwnerAuth = () => useContext(OwnerAuthContext);
