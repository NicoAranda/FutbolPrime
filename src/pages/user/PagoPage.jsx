import { useCart } from "../../context/CartContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const PagoPage = () => {
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    ciudad: "",
    run: "",
  })

  const [tarjeta, setTarjeta] = useState({
    titular: "",
    numero: "",
    expiracion: "",
    cvv: "",
  })

  const [warningRun, setWarningRun] = useState("")
  const [warningCorreo, setWarningCorreo] = useState("")
  const [warningTarjeta, setWarningTarjeta] = useState("")
  const [envio, setEnvio] = useState(0)
  const [envioCalculado, setEnvioCalculado] = useState(false)
  const [resultadoPago, setResultadoPago] = useState(null)
  const [procesando, setProcesando] = useState(false)

  const iva = Math.round(total * 0.19)
  const totalFinal = total + iva + envio

  //  Validaciones
  const validarRun = (runInput) => {
    setWarningRun("")
    const run = runInput.toUpperCase().replace(/\s+/g, "")
    if (!/^[0-9]+-[0-9K]$/.test(run)) {
      setWarningRun(" El RUN debe ir sin puntos y con guion (ej: 12345678-5).")
      return false
    }
    const [numero, dvIngresado] = run.split("-")
    let suma = 0
    let multiplicador = 2
    for (let i = numero.length - 1; i >= 0; i--) {
      suma += parseInt(numero[i]) * multiplicador
      multiplicador = multiplicador < 7 ? multiplicador + 1 : 2
    }
    const resto = 11 - (suma % 11)
    const dvCalculado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString()
    if (dvIngresado !== dvCalculado) {
      setWarningRun(" RUN inválido.")
      return false
    }
    return true
  }

  const validarCorreo = (correo) => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!correoRegex.test(correo)) {
      setWarningCorreo(" Correo electrónico inválido.")
      return false
    }
    setWarningCorreo("")
    return true
  }

  const validarTarjeta = () => {
    const { titular, numero, expiracion, cvv } = tarjeta
    if (!titular || !numero || !expiracion || !cvv) {
      setWarningTarjeta(" Completa todos los datos de la tarjeta.")
      return false
    }
    if (!/^[0-9]{16}$/.test(numero.replace(/\s+/g, ""))) {
      setWarningTarjeta(" Número de tarjeta inválido (16 dígitos).")
      return false
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiracion)) {
      setWarningTarjeta("Fecha inválida (usa MM/AA).")
      return false
    }
    if (!/^[0-9]{3,4}$/.test(cvv)) {
      setWarningTarjeta(" CVV inválido.")
      return false
    }
    setWarningTarjeta("")
    return true
  }

  const calcularEnvio = () => {
    if (formData.direccion && formData.ciudad) {
      const ciudad = formData.ciudad.toLowerCase()
      if (ciudad.includes("santiago")) setEnvio(5000)
      else if (ciudad.includes("valparaíso") || ciudad.includes("viña")) setEnvio(7000)
      else setEnvio(10000)
      setEnvioCalculado(true)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "run") validarRun(value)
    if (name === "correo") validarCorreo(value)
  }

  const handleTarjetaChange = (e) => {
    const { name, value } = e.target
    setTarjeta((prev) => ({ ...prev, [name]: value }))
  }

  //  Simular pago
  const procesarPago = (e) => {
    e.preventDefault()
    if (!validarRun(formData.run) || !validarCorreo(formData.correo) || !validarTarjeta()) {
      return
    }

    setProcesando(true)

    setTimeout(() => {
      setProcesando(false)

      const exito = Math.random() < 0.7
      const datosCompra = {
        comprador: formData,
        productos: cart,
        total: totalFinal,
        envio,
        iva,
        tarjeta,
        fecha: new Date().toLocaleString("es-CL"),
      }

      if (exito) {
        clearCart()
        setResultadoPago({ exito: true, datos: datosCompra })
      } else {
        const motivos = [
          "Fondos insuficientes ",
          "Error en el banco ",
          "Tarjeta vencida",
          "Transacción sospechosa ",
        ]
        const motivo = motivos[Math.floor(Math.random() * motivos.length)]
        setResultadoPago({ exito: false, motivo, datos: datosCompra })
      }
    }, 2000)
  }

  //  Pantalla de carga
  if (procesando) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}></div>
        <h4 className="mt-4">Procesando pago...</h4>
        <p className="text-muted">Por favor, no cierres esta ventana.</p>
      </div>
    )
  }

  // Resultado del pago (aceptado o rechazado)
  if (resultadoPago) {
    return (
      <div className="container my-5 text-center">
        {resultadoPago.exito ? (
          <>
            <h2 className="text-success fw-bold mb-3"> ¡Pago Aceptado!</h2>
            <p className="text-muted mb-4">
              Gracias por tu compra, <strong>{resultadoPago.datos.comprador.nombre}</strong>.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-danger fw-bold mb-3"> Pago Rechazado</h2>
            <p className="fs-5">Motivo: <strong>{resultadoPago.motivo}</strong></p>
          </>
        )}

        {/*  Detalles comunes a ambos casos */}
        <div className="card shadow-sm p-4 text-start mx-auto" style={{ maxWidth: "700px" }}>
          <h5 className="fw-bold mb-3"> Detalles de la Compra</h5>
          <p><strong>Fecha:</strong> {resultadoPago.datos.fecha}</p>
          <p><strong>Correo:</strong> {resultadoPago.datos.comprador.correo}</p>
          <p><strong>Dirección:</strong> {resultadoPago.datos.comprador.direccion}, {resultadoPago.datos.comprador.ciudad}</p>
          <p><strong>Tarjeta:</strong> **** **** **** {resultadoPago.datos.tarjeta.numero.slice(-4)}</p>

          <hr />
          <h6 className="fw-bold">Productos:</h6>
          <ul className="list-group mb-3">
            {resultadoPago.datos.productos.map((item) => (
              <li key={item.sku} className="list-group-item d-flex justify-content-between">
                <span>{item.nombre} (x{item.cantidad})</span>
                <strong>${(item.precio * item.cantidad).toLocaleString("es-CL")}</strong>
              </li>
            ))}
          </ul>

          <p><strong>Subtotal:</strong> ${total.toLocaleString("es-CL")}</p>
          <p><strong>IVA (19%):</strong> ${iva.toLocaleString("es-CL")}</p>
          <p><strong>Envío:</strong> ${envio.toLocaleString("es-CL")}</p>
          <h5 className="text-primary fw-bold">Total: ${totalFinal.toLocaleString("es-CL")}</h5>
        </div>

        {resultadoPago.exito ? (
          <button className="btn btn-primary mt-4" onClick={() => navigate("/FutbolPrime/pedidos")}>
             Ver mis pedidos
          </button>
        ) : (
          <button className="btn btn-secondary mt-4" onClick={() => setResultadoPago(null)}>
             Intentar nuevamente
          </button>
        )}
      </div>
    )
  }

  //  Formulario con resumen
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4"> Finalizar Compra</h2>

      <div className="row g-4">
        {/*  Resumen de compra siempre visible */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h5 className="fw-bold mb-3 text-center">Resumen de la Compra</h5>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item.sku} className="list-group-item d-flex justify-content-between">
                  <span>{item.nombre} (x{item.cantidad})</span>
                  <strong>${(item.precio * item.cantidad).toLocaleString("es-CL")}</strong>
                </li>
              ))}
            </ul>
            <p><strong>Subtotal:</strong> ${total.toLocaleString("es-CL")}</p>
            <p><strong>IVA (19%):</strong> ${iva.toLocaleString("es-CL")}</p>
            <p><strong>Envío:</strong> {envioCalculado ? `$${envio.toLocaleString("es-CL")}` : "Por calcular "}</p>
            <h5 className="fw-bold text-primary">Total: ${totalFinal.toLocaleString("es-CL")}</h5>
          </div>
        </div>

        {/* Formulario */}
        <div className="col-md-7">
          <div className="card shadow-sm p-4">
            <form onSubmit={procesarPago}>
              <h5 className="fw-bold mb-3">Datos del Envío</h5>
              <input name="nombre" className="form-control mb-2" placeholder="Nombre completo" onChange={handleChange} required />
              <input name="run" className="form-control mb-2" placeholder="RUN (ej: 12345678-5)" onChange={handleChange} required />
              {warningRun && <small className="text-danger">{warningRun}</small>}
              <input name="correo" type="email" className="form-control mb-2" placeholder="Correo electrónico" onChange={handleChange} required />
              {warningCorreo && <small className="text-danger">{warningCorreo}</small>}
              <input name="direccion" className="form-control mb-2" placeholder="Dirección" onChange={handleChange} onBlur={calcularEnvio} required />
              <input name="ciudad" className="form-control mb-3" placeholder="Ciudad" onChange={handleChange} onBlur={calcularEnvio} required />

              <h5 className="fw-bold mb-3 mt-4"> Datos de la Tarjeta</h5>
              <input name="titular" className="form-control mb-2" placeholder="Titular de la tarjeta" onChange={handleTarjetaChange} required />
              <input name="numero" className="form-control mb-2" placeholder="Número de tarjeta (16 dígitos)" onChange={handleTarjetaChange} required />
              <div className="row">
                <div className="col-6">
                  <input name="expiracion" className="form-control mb-2" placeholder="MM/AA" onChange={handleTarjetaChange} required />
                </div>
                <div className="col-6">
                  <input name="cvv" className="form-control mb-2" placeholder="CVV" onChange={handleTarjetaChange} required />
                </div>
              </div>
              {warningTarjeta && <small className="text-danger">{warningTarjeta}</small>}

              <button type="submit" className="btn btn-primary w-100 mt-3 fw-semibold">
                 Finalizar Compra
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PagoPage
