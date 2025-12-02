import React, { useEffect, useState } from 'react'

export const PedidosClientes = () => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarPedidosDeTodos = async () => {
      setLoading(true)
      try {
        // 1. Obtener todos los usuarios
        const resUsuarios = await fetch("http://52.203.16.208:8080/api/usuarios")
        const usuarios = await resUsuarios.json()

        let pedidosGlobal = []

        // 2. Iterar usuarios → traer pedidos por usuario
        for (const user of usuarios) {
          try {
            // Ajusta este endpoint a como lo tengas en tu backend:
            // si usas @GetMapping("/usuario/{usuarioId}") -> /api/pedidos/usuario/{id}
            const res = await fetch(`http://52.203.16.208:8080/api/pedidos/usuario/${user.id}`)
            if (!res.ok) continue

            const dataPedidos = await res.json()
            const pedidosArray = Array.isArray(dataPedidos) ? dataPedidos : [dataPedidos]

            // Agregar usuario a cada pedido para mostrar el cliente
            pedidosArray.forEach(p => {
              pedidosGlobal.push({
                ...p,
                usuarioNombre: user.nombre
              })
            })

          } catch (error) {
            console.error("Error cargando pedidos del usuario:", user.id, error)
          }
        }

        setPedidos(pedidosGlobal)

      } catch (e) {
        console.error(e)
        setError("No se pudo cargar la lista de pedidos")
      } finally {
        setLoading(false)
      }
    }

    cargarPedidosDeTodos()
  }, [])

  const badgeColor = (estado) => {
    switch (estado) {
      case "PAGADO":
        return "bg-success"
      case "ENVIADO":
        return "bg-info"
      case "COMPLETADO":
      case "ENTREGADO":
        return "bg-primary"
      case "PENDIENTE":
        return "bg-warning text-dark"
      case "CANCELADO":
      case "RECHAZADO":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  return (
    <>
      <div className="card-header bg-primary text-white">
        Pedidos de Clientes
      </div>

      <div className="card-body table-responsive">

        {loading && <p>Cargando...</p>}
        {error && <p className="text-danger">{error}</p>}

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
                <tr><td colSpan="5" className="text-center">No hay pedidos</td></tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.usuarioNombre}</td>
                    <td>{p.items?.map(i => i.producto.nombre).join(", ")}</td>
                    <td>
                      <span className={`badge ${badgeColor(p.estado)}`}>
                        {p.estado}
                      </span>
                    </td>
                    <td>${p.total?.toLocaleString("es-CL")}</td>
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
