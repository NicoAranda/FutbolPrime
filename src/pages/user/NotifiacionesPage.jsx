import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const NotificacionesPage = () => {
  const { usuario } = useAuth();
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    fetch(`http://52.203.16.208:8080/api/notificaciones/usuario/${usuario.id}`)
      .then(res => res.json())
      .then(setNotis);
  }, []);

  const marcarLeida = async (id) => {
    await fetch(`http://52.203.16.208:8080/api/notificaciones/${id}/leer`, {
      method: "PATCH"
    });
    setNotis(notis.map(n => n.id === id ? { ...n, leida: true } : n));
  };

  return (
    <div className="container my-5">
      <h3>Notificaciones</h3>

      {notis.map(n => (
        <div key={n.id} className={`alert ${n.leida ? "alert-light" : "alert-primary"}`}>
          <strong>{n.titulo}</strong>
          <p>{n.mensaje}</p>
          {!n.leida && (
            <button className="btn btn-sm btn-outline-secondary" onClick={() => marcarLeida(n.id)}>
              Marcar como leída
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
