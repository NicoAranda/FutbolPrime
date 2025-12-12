import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("usuario", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUsuario(userData);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
