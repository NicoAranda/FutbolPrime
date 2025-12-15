import React, { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card } from "../../components/Card"
import CarruselInfinito from "../../components/CarruselInfinito"

export const HomePage = () => {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch("http://52.203.16.208:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error al cargar productos:", err))
  }, [])

  const camisetas = useMemo(
    () =>
      productos
        .filter(
          (p) =>
            p?.tipo === "CAMISETA" &&
            p?.oferta !== null &&
            p?.oferta !== undefined &&
            Number(p?.oferta) > 0
        )
        .slice(0, 5),
    [productos]
  )
  const balones = useMemo(
    () => productos.filter((p) => p?.tipo === "balon").slice(0, 5),
    [productos]
  )
  const zapatillas = useMemo(
    () => productos.filter((p) => p?.tipo === "zapatilla").slice(0, 5),
    [productos]
  )
  const ofertas = useMemo(
    () =>
      productos.filter(
        (p) => p?.oferta !== null && p?.oferta !== undefined && Number(p?.oferta) > 0
      ),
    [productos]
  )

  const irDetalle = (sku) => {
    if (!sku) return
    navigate(`/FutbolPrime/detalle-producto/${sku}`)
  }

  return (
    <>
      {/* ✅ HERO COLO COLO (sin carrusel arriba) */}
      <section
        className="position-relative"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}img/colo_colo.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "62vh",
        }}
      >
        {/* ✅ overlay más suave para que se vea más la imagen */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.25)" }}
        ></div>

        <div className="container position-relative h-100 d-flex flex-column justify-content-center text-white">
          <h1 className="display-4 fw-bold">Colección Colo-Colo</h1>
          <p className="fs-5 mb-3">Vístete como los grandes</p>

          {/* ✅ Descubrir cuadrado y más abajo */}
          <div className="hero-descubrir-wrapper">
            <Link
              to="/FutbolPrime/catalogo"
              className="btn btn-light btn-sm fw-semibold px-3 btn-descubrir-puma"
              style={{ width: "fit-content" }}
            >
              Descubrir
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ CAMISETAS */}
      <section className="container my-5">
        <h2 className="text-center mb-5 display-6">Camisetas Destacadas</h2>

        <div className="container my-5">
          <div className="row g-4 justify-content-center">
            {camisetas.map((p) => (
              <Card key={p.sku} producto={p} />
            ))}
          </div>
        </div>
        <div className="hero-descubrir-wrapper">
          <Link
            to="/FutbolPrime/camisetas"
            className="btn btn-primary btn-sm fw-semibold px-3 btn-descubrir-puma"
            style={{ width: "fit-content" }}
          >
            Ver Más
          </Link>
        </div>
      </section>

      {/* ✅ OFERTAS (separador La U) */}
      <section
        className="position-relative"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}img/la_U.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "62vh",
        }}
      >
        {/* ✅ overlay más suave */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.25)" }}
        ></div>

        <div className="container position-relative h-100 d-flex flex-column justify-content-center text-white">
          <h1 className="display-4 fw-bold">Colección La U</h1>
          <p className="fs-5 mb-3">Vístete como los grandes</p>

          {/* ✅ Descubrir cuadrado y más abajo */}
          <div className="hero-descubrir-wrapper">
            <Link
              to="/FutbolPrime/catalogo"
              className="btn btn-light btn-sm fw-semibold px-3 btn-descubrir-puma"
              style={{ width: "fit-content" }}
            >
              Descubrir
            </Link>
          </div>
        </div>
      </section>


      <section className="py-5" style={{ background: "#f6f7fb" }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="m-0">Explora en Oferta</h2>
            <Link to="/FutbolPrime/ofertas" className="btn btn-outline-primary btn-sm">
              Ver todo
            </Link>
          </div>

          {ofertas.length === 0 ? (
            <p className="text-muted">No hay productos en oferta por ahora.</p>
          ) : (
            <div className="container my-5">
              <div className="row g-4 justify-content-center">
                {ofertas.slice(0, 4).map((p) => (
                  <Card key={p.sku} producto={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        className="position-relative"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}img/Banners_Football_Puma.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "62vh",
        }}
      >
        {/* ✅ overlay más suave */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.25)" }}
        ></div>

        <div className="container position-relative h-100 d-flex flex-column justify-content-center text-white">
          <h1 className="display-4 fw-bold"></h1>
          <p className="fs-5 mb-3"></p>

          {/* ✅ Descubrir cuadrado y más abajo */}
          <div className="hero-descubrir-wrapper">
            <Link
              to="/FutbolPrime/catalogo"
              className="btn btn-light btn-sm fw-semibold px-3 btn-descubrir-puma"
              style={{ width: "fit-content" }}
            >
              Descubrir
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ CARRUSEL INFINITO (más grande vía CSS) */}
      <CarruselInfinito
        titulo="Marcas y Destacados"
        velocidad={30}
        imagenes={[
          "nikeLogo.svg",
          "pumaLogo.svg",
          "adidasLogo.svg"
        ]}
      />

    </>
  )
}

export default HomePage
