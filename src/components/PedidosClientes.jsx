import React, { useEffect, useState } from 'react'

export const PedidosClientes = ({ userId = 1 }) => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    fetch(`http://52.203.16.208:8080/api/pedidos/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        // Si el endpoint devuelve un solo pedido u array de pedidos, normalizamos a array
        const pedidosArray = Array.isArray(data) ? data : [data]
        setPedidos(pedidosArray)
      })
      .catch(err => {
        console.error('Error cargando pedidos:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [userId])

  const formatearFecha = (fecha) => {
    if (!fecha) return "—"
    const d = new Date(fecha)
    return d.toLocaleDateString("es-CL")
  }

  const badgeColor = (estado) => {
    switch (estado) {
      case "ENTREGADO": return "bg-success"
      case "PENDIENTE": return "bg-warning text-dark"
      case "CANCELADO": return "bg-danger"
      default: return "bg-secondary"
    }
  }

  return (
    <>
      <div className="card-header bg-primary text-white">
        Pedidos de Cliente {userId}
      </div>

      <div className="card-body table-responsive">
        {loading && <p>Cargando...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        {!loading && !error && (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr><td colSpan="6" className="text-center">No hay pedidos</td></tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.dirNombre}</td>
                    <td>{p.items.map(i => i.producto.nombre).join(", ")}</td>
                    <td><span className={`badge ${badgeColor(p.estado)}`}>{p.estado}</span></td>
                    <td>${p.total.toLocaleString("es-CL")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
