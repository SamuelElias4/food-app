// AuthContext.js

import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return false;
      }
      setToken(token);
      return true;
    } catch (err) {
      console.error('Error decoding token:', err);
      localStorage.removeItem('token');
      return false;
    }
  };

  useEffect(() => {
    const loggedIn = checkToken();
    setLoggedIn(loggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
