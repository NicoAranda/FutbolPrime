import { useLocation } from "react-router-dom"
import { useCart } from "../../context/CartContext"

export const DetallePage = () => {
  const { state } = useLocation()
  const { addToCart } = useCart()
  const producto = state?.producto

  if (!producto) {
    return (
      <div className="container text-center py-5">
        <h4 className="text-muted">No se encontró el producto.</h4>
      </div>
    )
  }

  const urlImagen = `${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, '')}`

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={urlImagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="text-muted">{producto.tipo}</p>
          <h4 className="text-primary fw-bold mb-3">
            ${producto.precio.toLocaleString()}
          </h4>
          <p>{producto.descripcion || "Sin descripción disponible."}</p>

          <button
            className="btn btn-success w-100 fw-semibold mt-3"
            onClick={() => addToCart(producto)}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
