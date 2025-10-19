import { useCart } from "../../context/CartContext"
import { useState } from "react"

export const PagoPage = () => {
  const { cart, total, clearCart } = useCart()
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    ciudad: "",
    run: "",
  })

  const [alertaRun, setAlertaRun] = useState("")
  const [alertaCorreo, setAlertaCorreo] = useState("")
  const [costoEnvio, setCostoEnvio] = useState(0)
  const [envioListo, setEnvioListo] = useState(false)

  const iva = Math.round(total * 0.19)
  const totalFinal = total + iva + costoEnvio

  // ✅ Validar RUN chileno
  const validarRun = (runIngresado) => {
    setAlertaRun("")
    const run = runIngresado.toUpperCase().replace(/\s+/g, "")

    if (!/^[0-9]+-[0-9K]$/.test(run)) {
      setAlertaRun("⚠️ El RUN debe ir sin puntos y con guion (ej: 12345678-5).")
      return false
    }

    const [numero, dvIngresado] = run.split("-")
    if (numero.length > 8) {
      setAlertaRun("⚠️ El RUN no puede tener más de 8 dígitos antes del guion.")
      return false
    }

    let dv = dvIngresado
    if (dv === "K") {
      setAlertaRun("⚠️ El dígito verificador 'K' fue reemplazado automáticamente por '0'.")
      setDatosFormulario((prev) => ({ ...prev, run: `${numero}-0` }))
      dv = "0"
    }

    let suma = 0
    let multiplicador = 2
    for (let i = numero.length - 1; i >= 0; i--) {
      suma += parseInt(numero[i]) * multiplicador
      multiplicador = multiplicador < 7 ? multiplicador + 1 : 2
    }

    const resto = 11 - (suma % 11)
    const dvCalculado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString()

    if (dv !== dvCalculado && !(dv === "0" && dvCalculado === "K")) {
      setAlertaRun("❌ RUN inválido, revisa el dígito verificador.")
      return false
    }

    return true
  }

  // ✅ Validar correo electrónico
  const validarCorreo = (correo) => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!correoRegex.test(correo)) {
      setAlertaCorreo("⚠️ Ingresa un correo electrónico válido (ej: usuario@dominio.cl).")
      return false
    }
    setAlertaCorreo("")
    return true
  }

  // 🚚 Calcular envío cuando el usuario termina de escribir
  const calcularEnvio = () => {
    if (datosFormulario.direccion.trim() !== "" && datosFormulario.ciudad.trim() !== "") {
      const ciudad = datosFormulario.ciudad.toLowerCase()
      let costo = 0

      if (ciudad.includes("santiago")) costo = 5000
      else if (ciudad.includes("valparaíso") || ciudad.includes("viña")) costo = 7000
      else costo = 10000

      setCostoEnvio(costo)
      setEnvioListo(true)
    } else {
      setCostoEnvio(0)
      setEnvioListo(false)
    }
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target

    if (name === "run") {
      if (value.length > 11) return
      setDatosFormulario((prev) => ({ ...prev, run: value }))
      validarRun(value)
      return
    }

    if (name === "correo") {
      setDatosFormulario((prev) => ({ ...prev, correo: value }))
      validarCorreo(value)
      return
    }

    setDatosFormulario((prev) => ({ ...prev, [name]: value }))
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!datosFormulario.nombre || !datosFormulario.correo || !datosFormulario.direccion || !datosFormulario.run) {
      alert("Por favor, completa todos los campos obligatorios.")
      return
    }

    if (!validarCorreo(datosFormulario.correo) || !validarRun(datosFormulario.run)) {
      alert("Corrige los errores antes de continuar.")
      return
    }

    alert("✅ ¡Compra realizada con éxito!")
    clearCart()
    setDatosFormulario({ nombre: "", correo: "", direccion: "", ciudad: "", run: "" })
    setCostoEnvio(0)
    setEnvioListo(false)
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Detalle de Compra</h2>

      <div className="row g-4">
        {/* 🛍️ Productos */}
        <div className="col-md-7">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Productos en tu carrito</h4>
            {cart.length === 0 ? (
              <p className="text-muted">Tu carrito está vacío.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {cart.map((item) => (
                  <li
                    key={item.sku}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
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

            {costoEnvio > 0 ? (
              <div className="d-flex justify-content-between fade-in">
                <span>Envío</span>
                <strong>${costoEnvio.toLocaleString("es-CL")}</strong>
              </div>
            ) : (
              <div className="text-muted small mt-2">
                Ingresa tu dirección y ciudad, luego sal del campo para calcular envío 🚚
              </div>
            )}

            <hr />
            <div className="d-flex justify-content-between fs-5">
              <span>Total a pagar</span>
              <strong>${totalFinal.toLocaleString("es-CL")}</strong>
            </div>

            {envioListo && (
              <div className="text-success small mt-2 fade-in">
                ✅ Envío calculado correctamente
              </div>
            )}
          </div>

          {/* 📦 Formulario */}
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Datos del Envío</h5>
            <form onSubmit={manejarEnvio}>
              {/* Campos... */}
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

export default PagoPage
