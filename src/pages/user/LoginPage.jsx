import { Link, NavLink, useNavigate } from "react-router-dom";
import loginImg from '../../../public/img/login.jpg'
import { useEffect } from "react";


export const LoginPage = () => {

    const navigate = useNavigate();

  useEffect(() => {
    'use strict';

    const form = document.getElementById('loginForm');
    if (!form) return;

    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
      } else {
        alert('Inicio de sesión correcto');
        navigate('/FutbolPrime');
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => form.removeEventListener('submit', handleSubmit);
  }, [navigate]);

  return (
    <>
      <section className="vh-100 bg-smoke">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={loginImg} alt="login form" className="img-fluid" />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form id="loginForm" className="needs-validation" novalidate>
                        <h3 className="fw-normal mb-3">Inicia Sesión</h3>

                        <div className="form-outline mb-4 position-relative">
                          <input type="email" id="username" className="form-control form-control-lg peer"
                            placeholder=" " required />
                          <label className="form-label transition-all" htmlFor="username">Correo
                            electrónico</label>
                          <div className="invalid-feedback">Por favor ingresa un email válido.</div>
                        </div>

                        <div className="form-outline mb-4 position-relative">
                          <input type="password" id="password"
                            className="form-control form-control-lg peer" placeholder=" " required
                            minLength="6" />
                          <label className="form-label transition-all" htmlFor="password">Contraseña</label>
                          <div className="invalid-feedback">La contraseña debe tener al menos 6
                            caracteres.</div>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg col-12 col-md-4" type="submit">Iniciar
                            sesión</button>
                        </div>

                        <NavLink className="small text-muted mt-8" to="">¿Olvidaste tu contraseña?</NavLink>
                        <p className="mb-5 pb-lg-2">¿No tienes cuenta?
                          <NavLink to="/FutbolPrime/registro">Resgístrate aquí</NavLink>
                        </p>
                        <NavLink to="/FutbolPrime/loginAdmin" className="small text-muted mt-4">
                          Iniciar como administrador
                        </NavLink>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
