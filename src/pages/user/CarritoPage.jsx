import { useCart } from "../../context/CartContext";
import "../../assets/carrito.css";

export const CarritoPage = () => {
  const { cartItems = [], removeFromCart, updateQuantity, applyCoupon, total = 0, discount = 0, finalTotal = 0 } = useCart();

  return (
    <div className="carrito-wrapper d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <div className="carrito-container container py-5">
          <h2 className="text-center mb-4">🛍️ Tu Carrito de Compras</h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-muted">Tu carrito está vacío.</p>
          ) : (
            <>
              <table className="table table-hover align-middle text-center shadow-sm rounded">
                <thead className="table-primary">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toLocaleString()}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="form-control form-control-sm text-center"
                          style={{ width: "80px", margin: "auto" }}
                        />
                      </td>
                      <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="coupon-section text-center my-4">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  className="form-control d-inline w-auto"
                  id="couponInput"
                />
                <button
                  className="btn btn-success ms-2"
                  onClick={() => {
                    const code = document.getElementById("couponInput").value;
                    applyCoupon(code);
                  }}
                >
                  Aplicar Cupón
                </button>
              </div>

              <div className="resumen-compra text-center mt-4">
                <p>
                  Subtotal: <strong>${total.toLocaleString()}</strong>
                </p>
                {discount > 0 && (
                  <p>
                    Descuento:{" "}
                    <span className="text-success">
                      -${discount.toLocaleString()}
                    </span>
                  </p>
                )}
                <h4>
                  Total a pagar: <strong>${finalTotal.toLocaleString()}</strong>
                </h4>

                <button className="btn btn-primary mt-3">
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
