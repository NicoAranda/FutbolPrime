import { Link, NavLink } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

export const Header = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Marca */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/FutbolPrime">
          <img src="/img/futbolprimepng.png" alt="Fútbol Prime Logo" className="logo" />
          <h1 className="h4 m-0">Fútbol Prime</h1>
        </Link>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto text-center align-items-center">

            <li className="nav-item">
              <NavLink
                to="/FutbolPrime"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="carrito">
                Ver Carrito
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="nosotros">
                Nosotros
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="balones">
                Balones
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="camisetas">
                Camisetas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="accesorios">
                Accesorios
              </NavLink>
            </li>

            {/* ❤️ Lista de deseos */}
            <li className="nav-item position-relative mx-2">
              <NavLink className="nav-link" to="wishlist" title="Lista de deseos">
                <Heart size={22} />
                {wishlist.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
            </li>

            {/* 👤 Login / Cuenta */}
            <li className="nav-item">
              <NavLink className="nav-link" to="login">
                <img src="/img/cuenta.png" alt="Cuenta Logo" className="logo p-4" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
