import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "../assets/categoriasCarrusel.css"

export const CategoriasCarrusel = () => {
  const trackRef = useRef(null)

  const categorias = [
    { nombre: "Camisetas", img: "modelos-de-camisetas-de-futbol.webp", link: "/FutbolPrime/camisetas" },
    { nombre: "Balones", img: "pelotaOferta.webp", link: "/FutbolPrime/balones" },
    { nombre: "Accesorios", img: "canillerasOferta.webp", link: "/FutbolPrime/accesorios" },
    { nombre: "Zapatillas", img: "guantesOferta.webp", link: "/FutbolPrime/zapatillas" },
  ]

  const scrollByAmount = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.85) // mueve casi “una pantalla”
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <div className="cat-wrap position-relative">
      {/* Flecha izquierda (solo desktop) */}
      <button
        type="button"
        className="cat-arrow cat-arrow-left d-none d-md-flex"
        onClick={() => scrollByAmount(-1)}
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Track */}
      <div ref={trackRef} className="cat-track">
        {categorias.map((cat) => (
          <Link key={cat.nombre} to={cat.link} className="cat-card text-decoration-none">
            <div className="cat-img-wrap">
              <img
                src={`${import.meta.env.BASE_URL}img/${cat.img}`}
                alt={cat.nombre}
                className="cat-img"
              />
            </div>
            <div className="cat-body">
              <div className="cat-title">{cat.nombre}</div>
              <div className="cat-sub">Ver productos</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Flecha derecha (solo desktop) */}
      <button
        type="button"
        className="cat-arrow cat-arrow-right d-none d-md-flex"
        onClick={() => scrollByAmount(1)}
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  )
}
