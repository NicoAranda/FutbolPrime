import { Link, NavLink } from "react-router-dom";
import logo from "../../public/img/futbolprimepng.png";
import cuenta from "../../public/img/cuenta.png";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Marca */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src={logo}
            alt="Fútbol Prime Logo"
            className="logo"
          />
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
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/balones">
                Balones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/camisetas">
                Camisetas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/accesorios">
                Accesorios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <img
                  src={cuenta}
                  alt="Cuenta Logo"
                  className="logo p-4"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
