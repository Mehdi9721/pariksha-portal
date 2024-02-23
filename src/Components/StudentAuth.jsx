// StudentAuthContext.js
import { createContext, useContext, useState } from 'react';

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [isStudentLoggedIn, setStudentLoggedIn] = useState(false);

  const studentLogin = () => {
    // Perform your student login logic here
    setStudentLoggedIn(true);
  };

  const studentLogout = () => {
    // Perform your student logout logic here
    setStudentLoggedIn(false);
  };

  return (
    <StudentAuthContext.Provider value={{ isStudentLoggedIn, studentLogin, studentLogout }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => useContext(StudentAuthContext);
