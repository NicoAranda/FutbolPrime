import React, { useEffect, useState } from 'react'
import { ProductosAgregados } from '../../components/ProductosAgregados'
import '../../assets/sidebar.css'

export const Productos = () => {

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
    <>
        <div className="card shadow content-admin">
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
    </>
  )
}
