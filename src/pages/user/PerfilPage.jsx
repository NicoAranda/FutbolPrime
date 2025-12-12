import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const PerfilPage = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    fetch("http://52.203.16.208:8080/api/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }
          throw new Error();
        }
        return res.json();
      })
      .then(setPerfil)
      .catch(() => setError("No se pudo cargar el perfil"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Card principal */}
          <div className="card shadow border-0">

            {/* Header con fondo */}
            <div className="bg-primary rounded-top position-relative" style={{ height: "140px" }}>
              <div
                className="rounded-circle bg-white d-flex justify-content-center align-items-center shadow position-absolute top-100 start-50 translate-middle"
                style={{ width: "120px", height: "120px" }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}img/cuenta.png`}
                  alt="Avatar"
                  style={{ width: "90px", height: "90px" }}
                />
              </div>
            </div>

            {/* Body */}
            <div className="card-body text-center pt-5 mt-4">
              <h4 className="mb-1">{perfil.nombre}</h4>
              <p className="text-muted mb-3">{perfil.email}</p>

              <span className="badge bg-secondary mb-4">
                {perfil.rol}
              </span>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/")}
                >
                  Volver al inicio
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
