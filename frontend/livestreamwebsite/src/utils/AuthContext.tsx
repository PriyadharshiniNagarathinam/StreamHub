import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<boolean | null>(null);
  const [username, setUserName] = useState<string | null>(null);

  const login = (token: boolean, username: string) => {
    setToken(token);
    setUserName(username);
  };

  const logout = () => {
    console.log("Logging out");
    setToken(null);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, username } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
