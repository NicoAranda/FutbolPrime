import { Link } from "react-router-dom"

export const ConfirmacionPage = () => {
  return (
    <div className="container text-center my-5">
      <h2 className="text-success fw-bold mb-3"> ¡Pago Aceptado!</h2>
      <p className="text-muted mb-4">
        Gracias por tu compra. Hemos recibido tu pedido correctamente.
      </p>

      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <p><strong>Tu pedido será procesado en las próximas 24 horas.</strong></p>
        <p>Te enviaremos un correo con el detalle de tu compra y el número de seguimiento.</p>
      </div>

      <Link to="/FutbolPrime" className="btn btn-primary mt-4">
         Volver al inicio
      </Link>
    </div>
  )
}

export default ConfirmacionPage
