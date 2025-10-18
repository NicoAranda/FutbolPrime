import { useEffect, useState } from 'react'
import { CardAdmin } from '../../components/CardAdmin'
import { ProductosAgregados } from '../../components/ProductosAgregados'
import { PedidosClientes } from '../../components/PedidosClientes'
import '../../assets/sidebar.css'

export const AdministradorPage = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('/data/productos.json')
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
    <div className="content-admin bg-whitesmoke p-4">
      <div className='row g-3 mb-4'>
        <CardAdmin color='primary' titulo='Productos' cantidad={productos.length}/>
        <CardAdmin color='success' titulo='Ganancias Mensuales' cantidad='$1.076.990'/>
        <CardAdmin color='warning' titulo='Usuarios' cantidad='110'/>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          Productos Agregados
        </div>

        <div className="card-body table-responsive">
          <table className="table table-striped table-hover">
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

      <div className="card shadow mt-5">
        <PedidosClientes />
      </div>
    </div>
  )
}
