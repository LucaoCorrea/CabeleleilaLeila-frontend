import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.sub;

        const userRole = userEmail === "leila@gmail.com" ? "ADMIN" : "CLIENT"; // gambiarras extremas

        setUser({
          id: decodedToken.sub,
          email: userEmail,
          role: userRole,
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        logout();
      }
    }
  }, []);

  const login = (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      const userEmail = decodedToken.sub;

      const userRole = userEmail === "leila@gmail.com" ? "ADMIN" : "CLIENT"; // gambiarras extremas

      const user = {
        id: decodedToken.sub,
        email: userEmail,
        role: userRole,
      };
      setUser(user);
      localStorage.setItem("access_token", accessToken);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      throw new Error("Erro ao autenticar o usuário.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
