import { useEffect } from "react"

export const NotificacionEmergente = ({ mensaje, mostrar, cerrar }) => {
  useEffect(() => {
    if (mostrar) {
      const temporizador = setTimeout(cerrar, 2000)
      return () => clearTimeout(temporizador)
    }
  }, [mostrar])

  if (!mostrar) return null

  return (
    <div
      className="toast-notification position-fixed top-0 end-0 p-3"
      style={{ zIndex: 2000 }}
    >
      <div
        className="toast align-items-center text-bg-success border-0 show shadow-lg"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body fw-semibold">{mensaje}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Cerrar"
            onClick={cerrar}
          ></button>
        </div>
      </div>
    </div>
  )
}
