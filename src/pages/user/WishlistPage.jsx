import React from "react"
import { useWishlist } from "../../context/WishlistContext"
import { NavLink } from "react-router-dom"

export const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="container text-center my-5">
        <h3> Tu lista de deseos está vacía</h3>
        <p className="text-muted">
          Marca la estrella en los productos que te gusten para guardarlos aquí.
        </p>
        <NavLink to="/FutbolPrime" className="btn btn-primary mt-3">
          🔙 Volver a la tienda
        </NavLink>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4"> Mis Favoritos</h2>
      <div className="row g-4">
        {wishlist.map((p) => (
          <div key={p.sku} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100 text-center product-card position-relative">
              <NavLink
                to={`/FutbolPrime/detalle-producto/${p.sku}`}
                state={{ producto: p }}
                className="text-decoration-none text-dark"
              >
                <img
                  src={`${import.meta.env.BASE_URL}${p.imagen.replace(/^\//, "")}`}
                  className="card-img-top p-3"
                  alt={p.nombre}
                  style={{ height: "220px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5>{p.nombre}</h5>
                  <p className="text-muted">{p.tipo}</p>
                  <p className="fw-bold text-primary mb-0">
                    ${p.precio.toLocaleString("es-CL")}
                  </p>
                </div>
              </NavLink>

              <div className="p-3 border-top">
                <button
                  className="btn btn-outline-danger w-100 fw-semibold"
                  onClick={() => toggleWishlist(p)}
                >
                  ❌ Quitar de favoritos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
