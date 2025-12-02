import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ConfirmacionPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const registrarPago = async () => {
      try {
        setLoading(true)
        setError(null)

        const baseUrl = "http://52.203.16.208:8080"

        // 1) Obtener datos del pedido desde localStorage
        const pedidoId = localStorage.getItem("ultimoPedidoId")
        const totalStr = localStorage.getItem("ultimoPedidoTotal")

        if (!pedidoId || !totalStr) {
          throw new Error("No se encontraron 'ultimoPedidoId' o 'ultimoPedidoTotal' en localStorage.")
        }

        const monto = Number(totalStr)
        if (Number.isNaN(monto)) {
          throw new Error("El monto guardado en localStorage no es válido.")
        }

        // 2) Armar RegistrarPagoDTO
        const transaccionRef = `FP-${pedidoId}-${Date.now()}` // referencia única
        const pagoBody = {
          proveedor: "WebPay",      // o "MERCADO_PAGO", etc.
          metodo: "Crédito",        // o "Débito", etc.
          monto: monto,             // DEBE ser igual a pedido.total
          transaccionRef: transaccionRef,
          estado: "APROBADO"        // backend pone el pedido en PAGADO
        }

        console.log("POST pago:", `${baseUrl}/api/pedidos/${pedidoId}/pagos`, pagoBody)

        // 3) Registrar el pago en el backend
        const respPago = await fetch(`${baseUrl}/api/pedidos/${pedidoId}/pagos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pagoBody)
        })

        if (!respPago.ok) {
          const text = await respPago.text()
          throw new Error(`Error registrando pago: ${respPago.status} - ${text}`)
        }

        // Opcional: limpiar
        // localStorage.removeItem("ultimoPedidoId")
        // localStorage.removeItem("ultimoPedidoTotal")
        // localStorage.removeItem("carrito")

      } catch (err) {
        console.error(err)
        setError(err.message || "Ocurrió un error al registrar el pago")
      } finally {
        setLoading(false)
      }
    }

    registrarPago()
  }, [])

  return (
    <div className="container text-center my-5">
      <h2 className="text-success fw-bold mb-3">¡Pago Aceptado!</h2>

      <p className="text-muted mb-4">
        Gracias por tu compra. Hemos recibido tu pedido correctamente.
      </p>

      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
        {loading && <p>Registrando pago en el sistema...</p>}

        {error && (
          <p className="text-danger">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <p>
              <strong>Tu pedido será procesado en las próximas 24 horas.</strong>
            </p>
            <p>
              Te enviaremos un correo con el detalle de tu compra y el número de seguimiento.</p>
          </>
        )}
      </div>

      <Link to="/FutbolPrime" className="btn btn-primary mt-4">
        Volver al inicio
      </Link>
    </div>
  )
}

export default ConfirmacionPage
