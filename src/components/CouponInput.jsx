// src/components/CouponInput.jsx
import { useState } from "react"
import { useCart } from "../context/CartContext"

export const CouponInput = () => {
  const [code, setCode] = useState("")
  const { applyCoupon, coupon, discount } = useCart()

  const handleApply = () => {
    applyCoupon(code.toUpperCase())
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Código de descuento"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleApply}>
        Aplicar
      </button>
      {coupon && (
        <p className="ms-3 text-success mb-0">Cupón "{coupon}" aplicado ({discount}%)</p>
      )}
    </div>
  )
}
