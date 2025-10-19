import React, { useState } from 'react'
import '../assets/sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'


export const SideBar = () => {

  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    alert("Sesión Cerrada, hasta pronto..");
    navigate('/FutbolPrime');
  }

  return (
    <>
      {/* Botón hamburguesa visible solo en móviles */}
      <button
        className="btn-toggle-sidebar"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>

      {/* Sidebar (fijo en desktop / offcanvas en mobile) */}
      <div
        className={`sidebar d-flex flex-column p-3 text-white bg-primary position-fixed top-0 start-0 vh-100 
        ${showSidebar ? 'show' : ''}`}
      >
        <h5 className="fw-bold mb-4">Menú</h5>

        <ul className="nav flex-column d-flex flex-column flex-grow-1">
          <li className="nav-item">
            <NavLink
              to="/administrador"
              end
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active-link' : ''}`
              }
              onClick={() => setShowSidebar(false)}
            >
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/administrador/productos"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active-link' : ''}`
              }
              onClick={() => setShowSidebar(false)}
            >
              Productos
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/administrador/pedidos"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active-link' : ''}`
              }
              onClick={() => setShowSidebar(false)}
            >
              Pedidos
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/administrador/usuarios"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active-link' : ''}`
              }
              onClick={() => setShowSidebar(false)}
            >
              Usuarios
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/administrador/agregar-producto"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active-link' : ''}`
              }
              onClick={() => setShowSidebar(false)}
            >
              Agregar Producto
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/administrador/agregar-categoria"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active-link' : ''}`
              }
              onClick={() => setShowSidebar(false)}
            >
              Agregar Categoria
            </NavLink>
          </li>

          <li className="nav-item mt-auto">
            <NavLink
              onClick={(e) => {
                setShowSidebar(false)
                handleCerrarSesion(e)
              }}
              className="nav-link text-white"
            >
              Cerrar Sesión
            </NavLink>
          </li>
        </ul>
      </div>
      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </>
  )
}
