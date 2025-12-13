import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, X } from "lucide-react"

const BASE_URL = "http://52.203.16.208:8080"

const BuscadorHeader = ({ variant = "desktop", onClose }) => {
  const [query, setQuery] = useState("")
  const [resultados, setResultados] = useState([])
  const [mostrar, setMostrar] = useState(false)
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const wrapperRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMostrar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (query.trim().length < 2) {
      setResultados([])
      return
    }

    timerRef.current = setTimeout(async () => {
      try {
        setCargando(true)
        const res = await fetch(`${BASE_URL}/api/productos`)
        const data = await res.json()

        const q = query.toLowerCase()
        const filtrados = data.filter(
          (p) =>
            p.nombre?.toLowerCase().includes(q) ||
            p.marcaNombre?.toLowerCase().includes(q) ||
            p.sku?.toLowerCase().includes(q)
        )

        setResultados(filtrados.slice(0, 6))
      } catch (e) {
        setResultados([])
      } finally {
        setCargando(false)
      }
    }, 250) // debounce

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  const seleccionarProducto = (sku) => {
    setQuery("")
    setMostrar(false)
    if (onClose) onClose()
    navigate(`/FutbolPrime/detalle-producto/${sku}`)
  }

  const buscarTodo = () => {
    const q = query.trim()
    if (!q) return
    setMostrar(false)
    if (onClose) onClose()
    navigate(`/FutbolPrime/catalogo?search=${encodeURIComponent(q)}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      buscarTodo()
    }
    if (e.key === "Escape") {
      setMostrar(false)
      if (onClose) onClose()
    }
  }

  // estilos según variante
  const containerStyle =
    variant === "desktop"
      ? { width: "380px" }
      : { width: "100%" }

  return (
    <div ref={wrapperRef} className="position-relative w-100" style={containerStyle}>
      <div className="input-group input-group-sm">
        <span className="input-group-text">
          <Search size={16} />
        </span>

        <input
          type="search"
          className="form-control"
          placeholder="Buscar productos..."
          value={query}
          onFocus={() => setMostrar(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            setMostrar(true)
          }}
          onKeyDown={handleKeyDown}
        />

        {variant === "mobile" && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setMostrar(false)
              setQuery("")
              if (onClose) onClose()
            }}
            aria-label="Cerrar buscador"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {(mostrar && (resultados.length > 0 || cargando || query.trim().length >= 2)) && (
        <div
          className="bg-white shadow rounded mt-1 w-100 buscador-dropdown"
          style={{
            position: "absolute",
            zIndex: 2000,
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          {cargando && (
            <div className="p-2 text-center text-muted">
              Buscando...
            </div>
          )}

          {!cargando && resultados.length === 0 && query.trim().length >= 2 && (
            <div className="p-2 text-center text-muted">
              No hay resultados
            </div>
          )}

          {!cargando &&
            resultados.map((p) => (
              <div
                key={p.id}
                className="d-flex align-items-center gap-2 p-2 buscador-item"
                style={{ cursor: "pointer" }}
                onClick={() => seleccionarProducto(p.sku)}
              >
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="buscador-img"
                />
                <div className="flex-grow-1">
                  <div className="fw-semibold buscador-title">{p.nombre}</div>
                  <small className="text-muted">{p.marcaNombre}</small>
                </div>
              </div>
            ))}

          {!cargando && resultados.length > 0 && (
            <div
              className="text-center text-primary fw-semibold py-2 border-top buscador-ver-todo"
              style={{ cursor: "pointer" }}
              onClick={buscarTodo}
            >
              Ver todos los resultados
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BuscadorHeader
