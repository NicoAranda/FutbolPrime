import { useEffect } from "react"

export const ToastNotification = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000) // se oculta en 2 segundos
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!show) return null

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
          <div className="toast-body fw-semibold">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  )
}
