import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [username, setUserName] = useState<string | null>(localStorage.getItem("username"));

  const login = (token: string, username: string) => {
    setToken(token);
    setUserName(username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, username } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
