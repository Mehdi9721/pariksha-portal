import { createContext, useContext, useState } from 'react';

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [isStudentLoggedIn, setStudentLoggedIn] = useState(false);

  const studentLogin = () => {
    setStudentLoggedIn(true);
  };

  const studentLogout = () => {

    setStudentLoggedIn(false);
  };

  return (
    <StudentAuthContext.Provider value={{ isStudentLoggedIn, studentLogin, studentLogout }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => useContext(StudentAuthContext);
