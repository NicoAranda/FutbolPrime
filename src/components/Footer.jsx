import React from 'react'
import tiktok from '../../public/img/tik-tok.png'
import instagram from '../../public/img/instagram.png'
import facebook from '../../public/img/facebook.png'
import { NavLink } from 'react-router-dom'


export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5 w-100">
    <div className="container">
      <div className="row text-center text-md-start">

        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-3">Ayuda</h6>
          <p><NavLink to="/login" className="text-white text-decoration-none">Iniciar Sesión</NavLink></p>
          <p><NavLink to="" className="text-white text-decoration-none">Contáctanos</NavLink></p>
        </div>

        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-3">Productos</h6>
          <p><NavLink to="/camisetas" className="text-white text-decoration-none">Camisetas</NavLink></p>
          <p><NavLink to="/balones" className="text-white text-decoration-none">Balones</NavLink></p>
          <p><NavLink to="/accesorios" className="text-white text-decoration-none">Accesorios</NavLink></p>
        </div>

        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-3">Síguenos</h6>
          <p>Conéctate con la pasión del fútbol</p>
          <NavLink to="" className="text-white me-3 fs-4">
            <img src={facebook} alt="Facebook" className="logo-footer"/>
          </NavLink>
          <NavLink to="" className="text-white me-3 fs-4">
            <img src={instagram} alt="Instagram" className="logo-footer"/>
          </NavLink>
          <NavLink to="" className="text-white me-3 fs-4">
            <img src={tiktok} alt="TikTok" className="logo-footer"/>
          </NavLink>
        </div> 
      </div>

      <div className="row align-items-center text-center text-md-start mt-4"> 
        <div className="col-md-7 col-lg-8">
          <p className="mb-0">© 2025 Fútbol Prime - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  </footer>

  )
}
