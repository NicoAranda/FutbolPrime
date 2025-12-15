import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "../assets/carruselProductosGrande.css"

const CarruselProductosGrande = ({ titulo, productos }) => {
  const trackRef = useRef(null)
  const navigate = useNavigate()

  const scroll = (dir) => {
    if (!trackRef.current) return
    const ancho = trackRef.current.clientWidth
    trackRef.current.scrollBy({
      left: dir === "left" ? -ancho * 0.8 : ancho * 0.8,
      behavior: "smooth",
    })
  }

  return (
    <section className="cp-wrapper">
      <div className="cp-header">
        <h2>{titulo}</h2>
        <div className="cp-controls">
          <button onClick={() => scroll("left")}>‹</button>
          <button onClick={() => scroll("right")}>›</button>
        </div>
      </div>

      <div className="cp-track" ref={trackRef}>
        {[...productos, ...productos].map((p, i) => (
          <div
            className="cp-card"
            key={`${p.sku}-${i}`}
            onClick={() => navigate(`/FutbolPrime/detalle-producto/${p.sku}`)}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/${p.imagen}`}
              alt={p.nombre}
            />
            <div className="cp-info">
              <p className="cp-nombre">{p.nombre}</p>
              <p className="cp-precio">
                ${p.precio.toLocaleString("es-CL")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CarruselProductosGrande
