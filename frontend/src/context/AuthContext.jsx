import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const receivedToken = response.data.token;

    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);

    const userData = {
      email,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
    });

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);