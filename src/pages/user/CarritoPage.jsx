import { useCart } from "../../context/CartContext";
import "../../assets/carrito.css";
import { useNavigate } from "react-router-dom"


export const CarritoPage = () => {
  const { cart, removeFromCart, updateQuantity, applyCoupon, total, discount, finalTotal } = useCart();
   const navigate = useNavigate()
  

  const envio = 5000;
  const iva = Math.round(total * 0.19);
  const subtotal = total;
  const totalConIvaYEnvio = finalTotal + iva + envio;

  return (
    <div className="container py-5 carrito-page">
      <h2 className="text-center mb-4">🛒 Tu Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">Tu carrito está vacío.</p>
      ) : (
        <div className="row g-4">
          {/* 🧾 Productos */}
          <div className="col-lg-8">
            {cart.map((item) => (
              <div key={item.sku} className="card shadow-sm mb-3 p-3 d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start">
                <div className="d-flex align-items-center flex-column flex-md-row">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    className="rounded mb-2 mb-md-0 me-md-3"
                  />
                  <div>
                    <h6 className="mb-1">{item.nombre}</h6>
                    <p className="mb-0 text-muted">${item.precio.toLocaleString("es-CL")}</p>
                  </div>
                </div>

                {/* ✅ Controles responsivos */}
                <div className="d-flex flex-column align-items-center mt-3 mt-md-0">
                  <div className="input-group input-group-sm mb-2" style={{ width: "100px" }}>
                    <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.sku, item.cantidad - 1)}>-</button>
                    <input
                      type="text"
                      readOnly
                      value={item.cantidad}
                      className="form-control text-center"
                    />
                    <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.sku, item.cantidad + 1)}>+</button>
                  </div>

                  {/* 🧹 Botón eliminar centrado en móvil */}
                  <button
                    className="btn btn-danger btn-sm w-100"
                    style={{ maxWidth: "90px" }}
                    onClick={() => removeFromCart(item.sku)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 Resumen del pedido */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-4">
              <h5 className="fw-bold mb-3 text-center">Resumen del pedido</h5>

              <p className="d-flex justify-content-between">
                <span>Subtotal</span> <strong>${subtotal.toLocaleString("es-CL")}</strong>
              </p>
              <p className="d-flex justify-content-between">
                <span>IVA (19%)</span> <strong>${iva.toLocaleString("es-CL")}</strong>
              </p>
              <p className="d-flex justify-content-between">
                <span>Envío</span> <strong>${envio.toLocaleString("es-CL")}</strong>
              </p>
              <hr />
              <p className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span> <span>${totalConIvaYEnvio.toLocaleString("es-CL")}</span>
              </p>

              <div className="mt-3 text-center">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  id="couponInput"
                  className="form-control mb-2"
                />
                <button
                  className="btn btn-outline-success w-100"
                  onClick={() => applyCoupon(document.getElementById("couponInput").value)}
                >
                  Aplicar cupón
                </button>

                <button
                  className="btn btn-primary w-100 mt-3 fw-semibold"
                  onClick={() => navigate("/FutbolPrime/checkout")}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CarritoPage;