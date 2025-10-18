// src/components/CartItem.jsx
import { useCart } from "../context/CartContext"

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h6>{item.nombre}</h6>
        <p className="text-muted mb-0">Precio: ${item.precio.toLocaleString()}</p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          className="form-control"
          style={{ width: "70px" }}
          onChange={(e) => updateQuantity(item.sku, Number(e.target.value))}
        />
        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.sku)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}
