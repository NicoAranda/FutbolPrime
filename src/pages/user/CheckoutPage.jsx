import { useCart } from "../../context/CartContext"
import { useState } from "react"

export const CheckoutPage = () => {
  const { cart, total } = useCart()

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    ciudad: "",
    run: "",
  })

  const [warningRun, setWarningRun] = useState("")

  const iva = Math.round(total * 0.19)
  const envio = 5000
  const totalFinal = total + iva + envio

  // ✅ Validar RUN chileno
  const validarRun = (runInput) => {
    setWarningRun("") // Limpia mensaje anterior

    // Quitar espacios y convertir a mayúsculas
    const run = runInput.toUpperCase().replace(/\s+/g, "")

    // Mensaje guía
    if (!/^[0-9]+-[0-9K]$/.test(run)) {
      setWarningRun("⚠️ El RUN debe ir sin puntos y con guion (ej: 12345678-5).")
      return false
    }

    const [numero, dvIngresado] = run.split("-")
    if (numero.length > 8) {
      setWarningRun("⚠️ El RUN no puede tener más de 8 dígitos antes del guion.")
      return false
    }

    // Reemplazar DV K por 0
    let dv = dvIngresado
    if (dv === "K") {
      setWarningRun("⚠️ El dígito verificador 'K' fue reemplazado automáticamente por '0'.")
      setFormData((prev) => ({ ...prev, run: `${numero}-0` }))
      dv = "0"
    }

    // Validar DV real
    let suma = 0
    let multiplicador = 2
    for (let i = numero.length - 1; i >= 0; i--) {
      suma += parseInt(numero[i]) * multiplicador
      multiplicador = multiplicador < 7 ? multiplicador + 1 : 2
    }
    const resto = 11 - (suma % 11)
    const dvCalculado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString()

    if (dv !== dvCalculado && !(dv === "0" && dvCalculado === "K")) {
      setWarningRun("❌ RUN inválido, revisa el dígito verificador.")
      return false
    }

    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "run") {
      if (value.length > 11) return // Máximo 11 caracteres
      setFormData((prev) => ({ ...prev, run: value }))
      validarRun(value)
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.correo || !formData.direccion || !formData.run) {
      alert("Por favor, completa todos los campos obligatorios.")
      return
    }       

    alert("✅ ¡Compra realizada con éxito!")
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🧾 Detalle de Compra</h2>

      <div className="row g-4">
        {/* 🛍️ Resumen de Productos */}
        <div className="col-md-7">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Productos en tu carrito</h4>
            {cart.length === 0 ? (
              <p className="text-muted">Tu carrito está vacío.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {cart.map((item) => (
                  <li key={item.sku} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={`${import.meta.env.BASE_URL}${item.imagen.replace(/^\//, "")}`}
                        alt={item.nombre}
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        className="rounded"
                      />
                      <div>
                        <p className="mb-0 fw-semibold">{item.nombre}</p>
                        <small className="text-muted">x{item.cantidad}</small>
                      </div>
                    </div>
                    <strong>${(item.precio * item.cantidad).toLocaleString("es-CL")}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 💳 Resumen del Pedido */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="mb-3">Resumen del Pedido</h5>
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
              <span>Total a pagar</span>
              <strong>${totalFinal.toLocaleString("es-CL")}</strong>
            </div>
          </div>

          {/* 📦 Datos del comprador */}
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Datos del Envío</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">RUN</label>
                <input
                  type="text"
                  className="form-control"
                  name="run"
                  value={formData.run}
                  onChange={handleChange}
                  required
                />
                {warningRun && (
                  <small className="text-danger d-block mt-1">{warningRun}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                Confirmar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
