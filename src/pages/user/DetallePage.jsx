import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { ToastNotification } from "../../components/ToastNotification"
import "../../assets/detalle.css"

export const DetallePage = () => {
  const { sku } = useParams()
  const { addToCart } = useCart()
  const [producto, setProducto] = useState(null)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => res.json())
      .then((data) => {
        const todos = [
          ...(data.balones || []),
          ...(data.camisetas || []),
          ...(data.canilleras || []),
          ...(data.guantes || []),
          ...(data.medias || [])
        ]
        setProducto(todos.find((p) => p.sku === sku) || null)
      })
  }, [sku])

  if (!producto) {
    return (
      <div className="container text-center my-5">
        <h2 className="text-danger">Producto no encontrado</h2>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(producto)
    setShowToast(true)
  }

  const urlImagen = `${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, "")}`

  return (
    <div className="detalle-container container py-5">
      <div className="detalle-layout">
        {/* Imagen del producto */}
        <div className="detalle-imagen">
          <img src={urlImagen} alt={producto.nombre} className="img-fluid shadow-lg" />
        </div>

        {/* Información del producto */}
        <div className="detalle-info">
          <h2 className="fw-bold mb-2">{producto.nombre}</h2>
          <p className="text-muted mb-3">{producto.tipo}</p>
          <p className="descripcion mb-4">{producto.descripcion}</p>

          <ul className="list-unstyled mb-4">
            <li><strong>SKU:</strong> {producto.sku}</li>
            {producto.marca && <li><strong>Marca:</strong> {producto.marca}</li>}
            {producto.talla && <li><strong>Talla:</strong> {producto.talla}</li>}
            <li><strong>Color:</strong> {producto.color}</li>
            <li><strong>Stock:</strong> {producto.stock} unidades</li>
          </ul>

          <h3 className="text-primary fw-bold mb-4">${producto.precio.toLocaleString("es-CL")}</h3>

          <button className="btn btn-primary w-100 fw-semibold" onClick={handleAddToCart}>
            🛒 Comprar
          </button>
        </div>
      </div>

      <ToastNotification
        message="Producto agregado al carrito 🛍️"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

export default DetallePage
