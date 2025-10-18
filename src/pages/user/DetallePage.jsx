import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { ToastNotification } from "../../components/ToastNotification"

export const DetallePage = () => {
  const { sku } = useParams()
  const { addToCart } = useCart()
  const [producto, setProducto] = useState(null)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => res.json())
      .then((data) => {
        const todosLosProductos = [
          ...(data.balones || []),
          ...(data.camisetas || []),
          ...(data.canilleras || []),
          ...(data.guantes || []),
          ...(data.medias || [])
        ]
        const encontrado = todosLosProductos.find((p) => p.sku === sku)
        setProducto(encontrado || null)
      })
  }, [sku])

  if (!producto) {
    return (
      <div className="container text-center my-5">
        <h2 className="text-danger">Producto no encontrado</h2>
      </div>
    )
  }

  const urlImagen = `${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, '')}`

  const handleAddToCart = () => {
    addToCart(producto)
    setShowToast(true)
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Imagen */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={urlImagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="text-muted">{producto.tipo}</p>
          <h4 className="text-primary fw-bold mb-3">
            ${producto.precio.toLocaleString("es-CL")}
          </h4>
          <p>{producto.descripcion || "Sin descripción disponible."}</p>

          <button
            className="btn btn-success w-100 fw-semibold mt-3"
            onClick={handleAddToCart}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>

      {/* 🔔 Notificación */}
      <ToastNotification
        message="Producto agregado al carrito 🛍️"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}
export default DetallePage