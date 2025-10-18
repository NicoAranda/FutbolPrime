import React from "react"
import { NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "../assets/card.css"

export const Card = ({ producto }) => {
  const { addToCart } = useCart()
  const urlImagen = `${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, "")}`

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center g-md-5 g-lg-5">
      <div className="card product-card h-100 d-flex flex-column">
        {/* 🔗 Enlace que envía el producto al DetallePage */}
        <NavLink
          to="/FutbolPrime/detalle-producto"
          state={{ producto }}   // 👈 Aquí está la magia
          className="text-decoration-none text-dark flex-grow-1"
        >
          <img
            src={urlImagen}
            className="card-img-top product-img"
            alt={producto.nombre}
          />
          <div className="card-body d-flex flex-column text-center mt-auto">
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">{producto.tipo}</p>

            <div className="mt-auto d-flex justify-content-center gap-4">
              {producto.oferta && (
                <p className="text-primary text-decoration-line-through">
                  ${producto.oferta}
                </p>
              )}
              <p className="fw-bold text-primary">${producto.precio}</p>
            </div>
          </div>
        </NavLink>

        {/* 🛒 Botón Agregar al carrito */}
        <div className="p-3 border-top">
          <button
            className="btn btn-success w-100 fw-semibold"
            onClick={() => addToCart(producto)}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
