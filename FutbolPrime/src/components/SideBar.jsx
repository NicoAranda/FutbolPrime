import React from 'react'
import '../assets/sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'


export const SideBar = () => {

    const navigate = useNavigate()

    const handleCerrarSesion = (e) => {
        e.preventDefault();
        alert("Sesión Cerrada, hasta pronto..");
        navigate('/')
    }

    return (
        <>
            <div className="sidebar d-flex flex-column p-3 bg-primary text-white position-fixed top-0 start-0 vh-100">
                <h5 className="fw-bold mb-4">Menú</h5>

                <ul className="nav flex-column d-flex flex-column flex-grow-1">

                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/administrador">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/productos">Productos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/pedidos">Pedidos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/agregarProducto">Agregar Producto</NavLink>
                    </li>

                    <li className="nav-item mt-auto">
                        <NavLink className="nav-link text-white" to="/" onClick={handleCerrarSesion}>Cerrar Sesión</NavLink>
                    </li>
                </ul>
            </div>

        </>
    )
}
