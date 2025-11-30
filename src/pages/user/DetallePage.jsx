import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { NotificacionEmergente } from "../../components/NotificacionEmergente"
import "../../assets/detalle.css"

export const DetallePage = () => {
  const { sku } = useParams()
  const { addToCart } = useCart()
  const [producto, setProducto] = useState(null)
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false)

  useEffect(() => {
    fetch(`http://52.203.16.208:8080/api/productos`)
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find(p => p.sku == sku)
        setProducto(encontrado)
      })
      .catch(err => console.error("Error cargando producto:", err))
  }, [sku])

  if (!producto) {
    return (
      <div className="container text-center my-5">
        <h2 className="text-danger">Producto no encontrado</h2>
      </div>
    )
  }

  const manejarAgregarCarrito = () => {
    addToCart(producto)
    setMostrarNotificacion(true)
  }

  return (
    <div className="detalle-container container py-5">
      <div className="detalle-layout">
        <div className="detalle-imagen">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid shadow-lg rounded"
          />
        </div>

        <div className="detalle-info">
          <h2 className="fw-bold mb-2">{producto.nombre}</h2>
          <p className="text-muted mb-3">{producto.tipo}</p>

          {producto.descripcion && (
            <p className="descripcion mb-4">{producto.descripcion}</p>
          )}

          <ul className="list-unstyled mb-4">
            <li><strong>SKU:</strong> {producto.sku}</li>
            {producto.marcaNombre && <li><strong>Marca:</strong> {producto.marcaNombre}</li>}
            {producto.talla && <li><strong>Talla:</strong> {producto.talla}</li>}
            <li><strong>Color:</strong> {producto.color}</li>
            <li><strong>Stock:</strong> {producto.stock} unidades</li>
          </ul>

          <h3 className="text-primary fw-bold mb-4">
            ${producto.precio.toLocaleString("es-CL")}
          </h3>

          <button
            className="btn btn-primary w-100 fw-semibold"
            onClick={manejarAgregarCarrito}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <NotificacionEmergente
        mensaje="Producto agregado al carrito"
        mostrar={mostrarNotificacion}
        cerrar={() => setMostrarNotificacion(false)}
      />
    </div>
  )
}

export default DetallePage
