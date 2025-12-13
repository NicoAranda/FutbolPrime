import { useEffect, useMemo, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const PerfilPage = () => {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const baseUrl = "http://52.203.16.208:8080"

  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ✅ nuevos estados
  const [tab, setTab] = useState("PEDIDOS") // PEDIDOS | NOTIS
  const [pedidos, setPedidos] = useState([])
  const [notis, setNotis] = useState([])
  const [loadingExtra, setLoadingExtra] = useState(false)
  const [errorExtra, setErrorExtra] = useState("")

  useEffect(() => {
    if (!usuario) {
      navigate("/login")
      return
    }

    const token = localStorage.getItem("token")

    fetch(`${baseUrl}/api/usuarios/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            logout()
            navigate("/login")
          }
          throw new Error()
        }
        return res.json()
      })
      .then(setPerfil)
      .catch(() => setError("No se pudo cargar el perfil"))
      .finally(() => setLoading(false))
  }, [])

  // ✅ Cargar pedidos y notificaciones (con perfil listo)
  useEffect(() => {
    if (!perfil?.id) return

    const token = localStorage.getItem("token")

    const cargar = async () => {
      setLoadingExtra(true)
      setErrorExtra("")
      try {
        // Pedidos del usuario (según tu controller: /api/pedidos/usuario/{usuarioId})
        const resPedidos = await fetch(`${baseUrl}/api/pedidos/usuario/${perfil.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        // Notificaciones (si implementaste /api/notificaciones/usuario/{usuarioId})
        const resNotis = await fetch(`${baseUrl}/api/notificaciones/usuario/${perfil.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        // pedidos
        if (resPedidos.ok) {
          const dataPedidos = await resPedidos.json()
          setPedidos(Array.isArray(dataPedidos) ? dataPedidos : [])
        } else {
          setPedidos([])
        }

        // notis
        if (resNotis.ok) {
          const dataNotis = await resNotis.json()
          setNotis(Array.isArray(dataNotis) ? dataNotis : [])
        } else {
          setNotis([])
        }
      } catch (e) {
        setErrorExtra("No se pudo cargar pedidos/notificaciones")
      } finally {
        setLoadingExtra(false)
      }
    }

    cargar()

    // ✅ auto refresh simple (cada 10s)
    const i = setInterval(cargar, 10000)
    return () => clearInterval(i)
  }, [perfil?.id])

  const unreadCount = useMemo(() => notis.filter((n) => !n.leida).length, [notis])

  const badgeColorPedido = (estado) => {
    switch ((estado || "").toUpperCase()) {
      case "PAGADO": return "bg-success"
      case "PREPARANDO": return "bg-warning text-dark"
      case "LISTO_PARA_ENVIO": return "bg-info text-dark"
      case "ENVIADO": return "bg-primary"
      case "EN_CAMINO": return "bg-secondary"
      case "ENTREGADO": return "bg-success"
      case "CANCELADO": return "bg-danger"
      default: return "bg-dark"
    }
  }

  const marcarLeida = async (notiId) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${baseUrl}/api/notificaciones/${notiId}/leida`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setNotis((prev) => prev.map((n) => (n.id === notiId ? { ...n, leida: true } : n)))
      }
    } catch {}
  }

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Cargando perfil...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Card principal */}
          <div className="card shadow border-0">

            {/* Header con fondo */}
            <div className="bg-primary rounded-top position-relative" style={{ height: "140px" }}>
              <div
                className="rounded-circle bg-white d-flex justify-content-center align-items-center shadow position-absolute top-100 start-50 translate-middle"
                style={{ width: "120px", height: "120px" }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}img/cuenta.png`}
                  alt="Avatar"
                  style={{ width: "90px", height: "90px" }}
                />
              </div>
            </div>

            {/* Body */}
            <div className="card-body text-center pt-5 mt-4">
              <h4 className="mb-1">{perfil.nombre}</h4>
              <p className="text-muted mb-3">{perfil.email}</p>

              <span className="badge bg-secondary mb-4">{perfil.rol}</span>

              <div className="d-flex justify-content-center gap-3 mt-2">
                <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
                  Volver al inicio
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    logout()
                    navigate("/login")
                  }}
                >
                  Cerrar sesión
                </button>
              </div>

              {/* ✅ Tabs nuevos */}
              <div className="d-flex justify-content-center gap-2 mt-4">
                <button
                  className={`btn ${tab === "PEDIDOS" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setTab("PEDIDOS")}
                >
                  Mis pedidos
                </button>

                <button
                  className={`btn ${tab === "NOTIS" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setTab("NOTIS")}
                >
                  Notificaciones {unreadCount > 0 ? `(${unreadCount})` : ""}
                </button>
              </div>

              {/* ✅ Contenido tabs */}
              <div className="mt-4 text-start">
                {loadingExtra && <p className="text-center text-muted">Cargando...</p>}
                {errorExtra && <div className="alert alert-warning text-center">{errorExtra}</div>}

                {!loadingExtra && !errorExtra && tab === "PEDIDOS" && (
                  <div className="table-responsive">
                    <table className="table table-striped align-middle">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Estado</th>
                          <th>Total</th>
                          <th>Productos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidos.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center text-muted">
                              No tienes pedidos aún
                            </td>
                          </tr>
                        ) : (
                          pedidos.map((p) => (
                            <tr key={p.id}>
                              <td>{p.id}</td>
                              <td>
                                <span className={`badge ${badgeColorPedido(p.estado)}`}>
                                  {p.estado}
                                </span>
                              </td>
                              <td>${(p.total || 0).toLocaleString("es-CL")}</td>
                              <td>{p.items?.map((i) => i.producto?.nombre).join(", ")}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {!loadingExtra && !errorExtra && tab === "NOTIS" && (
                  <div>
                    {notis.length === 0 ? (
                      <p className="text-center text-muted">No tienes notificaciones</p>
                    ) : (
                      <ul className="list-group">
                        {notis.map((n) => (
                          <li
                            key={n.id}
                            className={`list-group-item d-flex justify-content-between align-items-start ${
                              n.leida ? "" : "fw-semibold"
                            }`}
                          >
                            <div>
                              <div>{n.mensaje}</div>
                              <small className="text-muted">
                                {n.creadaEn ? new Date(n.creadaEn).toLocaleString("es-CL") : ""}
                                {n.pedidoId ? ` • Pedido #${n.pedidoId}` : ""}
                              </small>
                            </div>

                            {!n.leida && (
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => marcarLeida(n.id)}
                              >
                                Marcar leída
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
