import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../../../public/img/login.jpg";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación mínima antes de llamar al backend
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
        if (res.status === 403) {
          toast.warning("Este correo es de administrador. Usa el login especial.");
          return;
        }
        toast.error("Credenciales incorrectas");
        return;
      }

      const data = await res.json();

      // 🚫 Bloquear acceso de admins al login de clientes
      if (data.rol === "ADMIN") {
        toast.warning("Este correo es de administrador. Usa el login especial.");
        return;
      }

      // Guardar usuario + token JWT en localStorage
      login(
        {
          id: data.id,
          nombre: data.nombre,
          email: data.email,
          rol: data.rol,
        },
        data.token
      );

      localStorage.setItem("token", data.token);

      toast.success("Inicio de sesión correcto");

      // Redirección
      setTimeout(() => navigate("/home"), 1200);

    } catch (error) {
      console.error(error);
      toast.error("Error de servidor");
    }
  };

  return (
    <>
      <section className="min-vh-100 bg-smoke d-flex align-items-center">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">

                  {/* Imagen */}
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={loginImg} alt="login form" className="img-fluid" />
                  </div>

                  {/* Formulario */}
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form onSubmit={handleSubmit}>
                        <h3 className="fw-normal mb-3">Inicia Sesión</h3>

                        <div className="form-outline mb-4 position-relative">
                          <input
                            type="email"
                            className="form-control form-control-lg peer"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form-label">Correo electrónico</label>
                        </div>

                        <div className="form-outline mb-4 position-relative">
                          <input
                            type="password"
                            className="form-control form-control-lg peer"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label className="form-label">Contraseña</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg col-12 col-md-4" type="submit">
                            Iniciar sesión
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2">
                          ¿No tienes cuenta? <a href="/FutbolPrime/registro">Regístrate aquí</a>
                        </p>

                        <a href="/FutbolPrime/loginAdmin" className="small text-muted mt-4">
                          Iniciar como administrador
                        </a>
                      </form>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenedor Toastify */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};
