import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    if (!usuario) return;

    const cargar = async () => {
      const res = await fetch(
        `http://52.203.16.208:8080/api/notificaciones/usuario/${usuario.id}/no-leidas`
      );
      const data = await res.json();
      setNotificaciones(data);
    };

    cargar();
    const interval = setInterval(cargar, 15000);
    return () => clearInterval(interval);
  }, [usuario]);

  return (
    <NotificationContext.Provider value={{ notificaciones, setNotificaciones }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
