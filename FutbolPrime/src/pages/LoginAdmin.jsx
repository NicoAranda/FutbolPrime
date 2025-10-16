import React, { useEffect } from 'react'
import loginAdminImg from '../../public/img/loginAdmin.png'
import { NavLink, useNavigate } from 'react-router-dom'

export const LoginAdmin = () => {

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
                navigate('/');
            }
        };

        form.addEventListener('submit', handleSubmit);
        return () => form.removeEventListener('submit', handleSubmit);
    }, [navigate]);

    return (
        <>
            <div className='bg-light d-flex align-items-center justify-content-center vh-100'>
                <div className="card shadow p-4 rounded-4">
                    <div className="text-center mb-4">
                        <img src={loginAdminImg} alt="Admin Icon" width="70" />
                        <h3 className="mt-2">Administrador</h3>
                        <p className="text-muted">Inicia sesión para continuar</p>
                    </div>

                    <form id="loginFormAdmin" novalidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Usuario / Correo</label>
                            <input type="email" className="form-control" id="email" placeholder="admin@ejemplo.com" required />
                            <div className="invalid-feedback">Ingresa un correo válido</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" placeholder="********" required minLength="6" />
                            <div className="invalid-feedback">La contraseña debe tener al menos 6 caracteres.</div>
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
                            <NavLink to="/login" className="text-decoration-none">Volver</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
