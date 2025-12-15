import React, { useMemo } from "react"
import "../assets/carruselInfinito.css"
import { useNavigate } from "react-router-dom"

const CarruselInfinito = ({
  titulo = "Marcas y Destacados",
  imagenes = [],
  velocidad = 28,
  height = 180,
  gap = 22,
  to = "/FutbolPrime/catalogo",
}) => {
  const navigate = useNavigate()

  const lista = useMemo(() => {
    const base = Array.isArray(imagenes) ? imagenes : []
    return [...base, ...base, ...base]
  }, [imagenes])

  return (
    <section className="ci2-wrap">
      {titulo && <h3 className="ci2-title">{titulo}</h3>}

      <div
        className="ci2-marquee"
        style={{
          ["--ci2-speed"]: `${velocidad}s`,
          ["--ci2-h"]: `${height}px`,
          ["--ci2-gap"]: `${gap}px`,
        }}
      >
        <div className="ci2-track">
          {lista.map((src, i) => (
            <button
              key={`${src}-${i}`}
              className="ci2-item"
              type="button"
              onClick={() => navigate(to)}
              aria-label="Ir a catálogo"
            >
              <img
                src={`${import.meta.env.BASE_URL}img/${src}`}
                alt={src.replace(".svg", "")}
                className="ci2-img"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarruselInfinito
