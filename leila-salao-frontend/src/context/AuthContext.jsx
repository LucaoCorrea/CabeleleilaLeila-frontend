import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Cria o contexto de autenticação
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Verifica se há um token no localStorage ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.sub;

        // Define a role com base no e-mail do usuário
        const userRole = userEmail === "leila@gmail.com" ? "ADMIN" : "CLIENT";

        setUser({
          id: decodedToken.sub,
          email: userEmail,
          role: userRole, // Armazena a role do usuário
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        logout();
      }
    }
  }, []);

  // Função de login
  const login = (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      const userEmail = decodedToken.sub;

      // Define a role com base no e-mail do usuário
      const userRole = userEmail === "leila@gmail.com" ? "ADMIN" : "CLIENT";

      const user = {
        id: decodedToken.sub,
        email: userEmail,
        role: userRole, // Armazena a role do usuário
      };
      setUser(user);
      localStorage.setItem("access_token", accessToken);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      throw new Error("Erro ao autenticar o usuário.");
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  // Expõe o user, role, login e logout no contexto
  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role, // Expõe a role diretamente
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}