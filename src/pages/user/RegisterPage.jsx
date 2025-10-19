import React, { useEffect } from 'react'
import loginImg from '../../../public/img/login.jpg'
import { NavLink, useNavigate } from 'react-router-dom'

export const RegisterPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    'use strict';

    const form = document.getElementById('registerForm');
    if (!form) return;

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    form.addEventListener('submit', function (event) {
      // Validación de contraseñas iguales
      if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Las contraseñas no coinciden');
      } else {
        confirmPassword.setCustomValidity('');
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        event.preventDefault();
        alert('Registro exitoso');
        navigate('/FutbolPrime');
      }
    });

    return () => form.removeEventListener('submit', () => {});
  }, [navigate]);

  return (
    <>
      <section className="min-vh-100 bg-light d-flex align-items-center">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-10">
              <div className="card shadow">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-6 d-none d-md-flex align-items-center">
                    <img src={loginImg} className="img-fluid" alt="Registro" />
                  </div>
                  <div className="col-md-6 col-lg-6 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form id="registerForm" className="needs-validation" novalidate>
                        <h3 className="fw-normal mb-4 text-center">Crear cuenta</h3>

                        <div className="form-outline mb-4 position-relative">
                          <input type="text" id="name" className="form-control form-control-lg peer" placeholder=" " required />
                          <label className="form-label" htmlFor="name">Nombre</label>
                          <div className="invalid-feedback">Por favor ingresa tu nombre.</div>
                        </div>

                        <div className="form-outline mb-4 position-relative">
                          <input type="email" id="email" className="form-control form-control-lg peer" placeholder=" " required />
                          <label className="form-label" htmlFor="email">Correo electrónico</label>
                          <div className="invalid-feedback">Por favor ingresa un email válido.</div>
                        </div>

                        <div className="form-outline mb-4 position-relative">
                          <input type="password" id="password" className="form-control form-control-lg peer" placeholder=" " required minLength="6" />
                          <label className="form-label" htmlFor="password">Contraseña</label>
                          <div className="invalid-feedback">La contraseña debe tener al menos 6 caracteres.</div>
                        </div>

                        <div className="form-outline mb-4 position-relative">
                          <input type="password" id="confirmPassword" className="form-control form-control-lg peer" placeholder=" " required minLength="6" />
                          <label className="form-label" htmlFor="confirmPassword">Repite tu contraseña</label>
                          <div className="invalid-feedback">Por favor repite tu contraseña.</div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4">
                          <input className="form-check-input me-2" type="checkbox" value="" id="terms" required />
                          <label className="form-check-label" htmlFor="terms">
                            Acepto los <NavLink to="">Términos de servicio</NavLink>
                          </label>
                          <div className="invalid-feedback">Debes aceptar los términos.</div>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg col-12" type="submit">Registrarse</button>
                        </div>

                        <p className="mb-5 pb-lg-2 text-center" >¿Ya tienes cuenta?
                          <NavLink to="/FutbolPrime/login" >Inicia sesión aquí</NavLink>
                        </p>
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
