import { useEffect, useState } from 'react'
import { CardAdmin } from '../../components/CardAdmin'
import { ProductosAgregados } from '../../components/ProductosAgregados'
import { PedidosClientes } from '../../components/PedidosClientes'
import '../../assets/sidebar.css'

export const AdministradorPage = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => res.json())
      .then((data) => {
        const todosLosProductos = [
          ...(data.balones || []),
          ...(data.camisetas || []),
          ...(data.guantes || []),
          ...(data.canilleras || []),
          ...(data.medias || [])
        ]
        setProductos(todosLosProductos)
      })
  }, [])

  return (
    <div className="content-admin d-flex flex-column align-items-center p-4">
      <div className="dashboard-container w-100" style={{ maxWidth: "1200px" }}>
        {/* Tarjetas superiores */}
        <div className="dashboard-cards">
          <div className="dashboard-card blue">
            <h5>Productos</h5>
            <p>{productos.length}</p>
          </div>
          <div className="dashboard-card green">
            <h5>Ganancias Mensuales</h5>
            <p>$1.076.990</p>
          </div>
          <div className="dashboard-card yellow">
            <h5>Usuarios</h5>
            <p>110</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="card shadow mb-5">
          <div className="card-header bg-primary text-white">
            Productos Agregados
          </div>

          <div className="card-body table-responsive">
            <table className="table table-striped table-hover align-middle text-center">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Producto</th>
                  <th>Stock</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((p) => (
                    <ProductosAgregados
                      key={p.sku}
                      sku={p.sku}
                      nombre={p.nombre}
                      stock={p.stock}
                      precio={p.precio}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No hay productos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pedidos de clientes */}
        <div className="card shadow mt-4">
          <PedidosClientes />
        </div>
      </div>
    </div>
  )
}
