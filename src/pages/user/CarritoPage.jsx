import { useCart } from "../../context/CartContext"
import { useNavigate } from "react-router-dom"
import "../../assets/cart.css"

export const CarritoPage = () => {
  const { cart, total, removeFromCart, updateQuantity, applyCoupon } = useCart()
  const navigate = useNavigate()

  const iva = Math.round(total * 0.19)
  const envio = total > 0 ? 5000 : 0
  const totalFinal = total + iva + envio

  const handleCheckout = () => {
    navigate("/FutbolPrime/checkout")
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Tu Carrito de Compras</h2>

      <div className="row g-4">
        {/* 🛍️ Lista de productos */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted fs-5 mb-0">
                Tu carrito está vacío.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.sku}
                  className="d-flex align-items-center justify-content-between border-bottom py-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={`${import.meta.env.BASE_URL}${item.imagen.replace(/^\//, "")}`}
                      alt={item.nombre}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      className="rounded"
                    />
                    <div>
                      <h6 className="mb-0">{item.nombre}</h6>
                      <small className="text-muted">${item.precio.toLocaleString("es-CL")}</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(item.sku, item.cantidad - 1)}
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(item.sku, item.cantidad + 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.sku)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 🧾 Resumen del pedido */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3 text-center">Resumen del pedido</h5>

            {cart.length > 0 ? (
              <>
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>${total.toLocaleString("es-CL")}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>IVA (19%)</span>
                  <strong>${iva.toLocaleString("es-CL")}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Envío</span>
                  <strong>${envio.toLocaleString("es-CL")}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5">
                  <span>Total</span>
                  <strong>${totalFinal.toLocaleString("es-CL")}</strong>
                </div>
              </>
            ) : (
              <p className="text-center text-muted">No hay productos agregados.</p>
            )}

            <hr />

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Código de descuento"
                id="cupon"
              />
              <button
                className="btn btn-outline-success w-100 mt-2"
                onClick={() => {
                  const code = document.getElementById("cupon").value
                  applyCoupon(code)
                }}
                disabled={cart.length === 0}
              >
                Aplicar cupón
              </button>
            </div>

            <button
              className="btn btn-primary w-100 fw-semibold"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
