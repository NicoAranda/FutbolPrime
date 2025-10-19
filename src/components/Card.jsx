import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useListaDeseos } from "../context/ListaDeseosContext" 
import { NotificacionEmergente } from "./NotificacionEmergente"
import { Star } from "lucide-react" 
import "../assets/card.css"

export const Card = ({ producto }) => {
  const { addToCart } = useCart()
  const { alternarListaDeseos, estaEnListaDeseos } = useListaDeseos() 
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false)

  const urlImagen = `${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, "")}`

  const formatoPrecio = (precio) => precio.toLocaleString("es-CL")

  //  Agregar producto al carrito
  const agregarAlCarrito = () => {
    addToCart(producto)
    setMostrarNotificacion(true)
  }

  // Verificar si está en la lista de deseos
  const esFavorito = estaEnListaDeseos(producto.sku)

  //  Alternar lista de deseos
  const manejarAlternarFavorito = (e) => {
    e.preventDefault() // Evita que se abra el detalle
    alternarListaDeseos(producto)
  }

  return (
    <>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center g-md-5 g-lg-5">
        <div className="card product-card h-100 d-flex flex-column position-relative">

          {/* Botón de favoritos */}
          <button
            className="wishlist-btn"
            onClick={manejarAlternarFavorito}
            title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Star
              size={22}
              fill={esFavorito ? "#FFD700" : "transparent"}
              stroke={esFavorito ? "#FFD700" : "#666"}
            />
          </button>

          {/* Enlace al detalle */}
          <NavLink
            to={`/FutbolPrime/detalle-producto/${producto.sku}`}
            state={{ producto }}
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
                    ${formatoPrecio(producto.oferta)}
                  </p>
                )}
                <p className="fw-bold text-primary">
                  ${formatoPrecio(producto.precio)}
                </p>
              </div>
            </div>
          </NavLink>

          {/* 🛒 Botón agregar al carrito */}
          <div className="p-3 border-top">
            <button
              className="btn btn-success w-100 fw-semibold"
              onClick={agregarAlCarrito}
            >
               Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      
      <NotificacionEmergente
        mensaje="Producto agregado al carrito correctamente "
        mostrar={mostrarNotificacion}
        cerrar={() => setMostrarNotificacion(false)}
      />
    </>
  )
}

export default Card
