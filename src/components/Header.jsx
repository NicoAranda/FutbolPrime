
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useListaDeseos } from "../context/ListaDeseosContext"
import { Heart, ShoppingCart } from "lucide-react"
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const { cart } = useCart()
  const { listaDeseos } = useListaDeseos()
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [cargando, setCargando] = useState(false);
  const buscadorRef = useRef(null);

  const cantidadCarrito = cart.reduce((acc, item) => acc + item.cantidad, 0)

  // Cargar todos los productos una vez
  useEffect(() => {
    setCargando(true);
    fetch("http://52.203.16.208:8080/api/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setCargando(false);
      });
  }, []);

  // Filtrar productos en tiempo real
  useEffect(() => {
    if (busqueda.trim().length > 0) {
      const termino = busqueda.toLowerCase().trim();
      const resultadosFiltrados = productos.filter(producto => {
        const nombre = producto.nombre?.toLowerCase() || '';
        const marca = producto.marcaNombre?.toLowerCase() || '';
        const tipo = producto.tipo?.toLowerCase() || '';
        const color = producto.color?.toLowerCase() || '';
        
        return (
          nombre.includes(termino) ||
          marca.includes(termino) ||
          tipo.includes(termino) ||
          color.includes(termino)
        );
      });
      setResultados(resultadosFiltrados.slice(0, 8)); // Limitar a 8 resultados
    } else {
      setResultados([]);
    }
  }, [busqueda, productos]);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buscadorRef.current && !buscadorRef.current.contains(event.target)) {
        setMostrarResultados(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
    if (e.target.value.trim().length > 0) {
      setMostrarResultados(true);
    } else {
      setMostrarResultados(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(busqueda.trim())}`);
      setBusqueda("");
      setMostrarResultados(false);
    }
  }

  const handleSeleccionarProducto = (producto) => {
    navigate(`/FutbolPrime/detalle-producto/${producto.sku}`);
    setBusqueda("");
    setMostrarResultados(false);
  }

  const handleVerTodosResultados = () => {
    if (busqueda.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(busqueda.trim())}`);
      setBusqueda("");
      setMostrarResultados(false);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/FutbolPrime">
          <img
            src={`${import.meta.env.BASE_URL}img/futbolprimepng.png`}
            alt="Fútbol Prime Logo"
            className="logo"
          />
          <h1 className="h4 m-0">Fútbol Prime</h1>
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarColor01">
          {/* BUSCADOR CON RESULTADOS EN TIEMPO REAL */}
          <div className="d-flex mx-3 my-2 my-lg-0 flex-grow-1 position-relative" ref={buscadorRef}>
            <form className="w-100" onSubmit={handleSubmit}>
              <div className="input-group w-100">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Buscar productos, marcas (Nike, Adidas)..."
                  value={busqueda}
                  onChange={handleInputChange}
                  onFocus={() => busqueda.length > 0 && setMostrarResultados(true)}
                  style={{ 
                    borderRadius: "25px 0 0 25px",
                    height: "45px",
                    fontSize: "16px"
                  }}
                />
                <button
                  className="btn btn-light d-flex align-items-center justify-content-center"
                  type="submit"
                  style={{ 
                    borderRadius: "0 25px 25px 0",
                    width: "60px",
                    height: "45px"
                  }}
                >
                  🔍
                </button>
              </div>
            </form>

            {/* FUNCIONAMIENTO CON UN MAP */}
            {mostrarResultados && busqueda.trim().length > 0 && (
              <div className="position-absolute top-100 start-0 end-0 mt-1 z-3 shadow-lg rounded-3 overflow-hidden">
                <div className="bg-white">
                  {cargando ? (
                    <div className="p-3 text-center">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                      <span className="ms-2">Buscando...</span>
                    </div>
                  ) : resultados.length > 0 ? (
                    <>
                      {resultados.map((producto) => (
                        <button
                          key={producto.sku}
                          type="button"
                          className="btn d-flex align-items-center w-100 text-start p-3 border-bottom"
                          onClick={() => handleSeleccionarProducto(producto)}
                          style={{ 
                            background: "transparent",
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <img 
                            src={producto.imagen} 
                            alt={producto.nombre}
                            className="rounded me-3"
                            style={{ 
                              width: "50px", 
                              height: "50px", 
                              objectFit: "cover",
                              border: "1px solid #dee2e6"
                            }}
                          />
                          <div className="flex-grow-1">
                            <div className="fw-semibold text-dark">{producto.nombre}</div>
                            <div className="text-muted small">
                              {producto.marcaNombre && `${producto.marcaNombre} • `}
                              {producto.tipo}
                              {producto.color && ` • ${producto.color}`}
                            </div>
                          </div>
                          <div className="text-primary fw-bold">
                            ${producto.precio.toLocaleString("es-CL")}
                          </div>
                        </button>
                      ))}
                      
                      <div className="p-3 bg-light text-center border-top">
                        <button 
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={handleVerTodosResultados}
                        >
                          Ver todos los resultados ({resultados.length})
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="text-muted mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </div>
                      <p className="text-muted mb-0">
                        No se encontraron resultados para "<strong>{busqueda}</strong>"
                      </p>
                      <p className="text-muted small mt-1">
                        Prueba con otras palabras como "Nike", "Adidas", "Zapatillas", etc.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

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
              <NavLink className="nav-link" to="nosotros">
                Nosotros
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="blog">
                Blog
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

            <li className="nav-item">
              <NavLink className="nav-link" to="zapatillas">
                Zapatillas
              </NavLink>
            </li>

            <li className="nav-item position-relative mx-2">
              <NavLink className="nav-link" to="listadeseos" title="Lista de deseos">
                <Heart size={22} />
                {listaDeseos.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {listaDeseos.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item position-relative mx-2">
              <NavLink className="nav-link" to="carrito" title="Ver carrito">
                <ShoppingCart size={22} />
                {cantidadCarrito > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cantidadCarrito}
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              {usuario ? (
                <>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {usuario.nombre}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink className="dropdown-item" to="perfil">
                        Mi perfil
                      </NavLink>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={logout}>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <NavLink className="nav-link" to="login">
                  <img
                    src={`${import.meta.env.BASE_URL}img/cuenta.png`}
                    alt="Cuenta"
                    className="icono-cuenta"
                  />
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
