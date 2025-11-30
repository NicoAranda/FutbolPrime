import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginAdminImg from "../../../public/img/loginAdmin.png";

export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://52.203.16.208:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        toast.error("Credenciales incorrectas");
        return;
      }

      const usuario = await res.json();

      if (usuario.rol !== "ADMIN") {
        toast.error("Este usuario no tiene permisos de administrador");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(usuario));

      localStorage.setItem("token", usuario.token);

      toast.success("Inicio de sesión correcto");

      setTimeout(() => navigate("/administrador"), 1200);

    } catch (error) {
      console.error(error);
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <div className="bg-light d-flex align-items-center justify-content-center vh-100">
        <div className="card shadow p-4 rounded-4">
          <div className="text-center mb-4">
            <img src={loginAdminImg} alt="Admin Icon" width="70" />
            <h3 className="mt-2">Administrador</h3>
            <p className="text-muted">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Administrador</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="admin@futbolprime.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
              </div>
              <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <NavLink to="/login" className="text-decoration-none">
                Volver
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};
