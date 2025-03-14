import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    if (response) {
      setUser(response.user);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
