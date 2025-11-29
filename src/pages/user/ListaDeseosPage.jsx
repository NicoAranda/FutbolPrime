import React from "react"
import { useListaDeseos } from "../../context/ListaDeseosContext"
import { NavLink } from "react-router-dom"

export const ListaDeseosPage = () => {
  const { listaDeseos, alternarListaDeseos } = useListaDeseos()

  if (listaDeseos.length === 0) {
    return (
      <div className="container text-center my-5">
        <h3>Tu lista de deseos está vacía</h3>
        <p className="text-muted">
          Marca la estrella en los productos que te gusten para guardarlos aquí.
        </p>
        <NavLink to="/FutbolPrime" className="btn btn-primary mt-3">
           Volver a la tienda
        </NavLink>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Mis Favoritos</h2>
      <div className="row g-4">
        {listaDeseos.map((producto) => (
          <div key={producto.sku} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100 text-center product-card position-relative">
              <NavLink
                to={`/FutbolPrime/detalle-producto/${producto.sku}`}
                state={{ producto }}
                className="text-decoration-none text-dark"
              >
                <img
                  src={producto.imagen}
                  className="card-img-top p-3"
                  alt={producto.nombre}
                  style={{ height: "220px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5>{producto.nombre}</h5>
                  <p className="text-muted">{producto.tipo}</p>
                  <p className="fw-bold text-primary mb-0">
                    ${producto.precio.toLocaleString("es-CL")}
                  </p>
                </div>
              </NavLink>

              <div className="p-3 border-top">
                <button
                  className="btn btn-outline-danger w-100 fw-semibold"
                  onClick={() => alternarListaDeseos(producto)}
                >
                   Quitar de favoritos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListaDeseosPage
