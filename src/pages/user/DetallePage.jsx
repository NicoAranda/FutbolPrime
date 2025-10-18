import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Detalle } from '../../components/Detalle'

export const DetallePage = () => {
  const { sku } = useParams() 
  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => res.json())
      .then((data) => {
        const accesorios = [
          ...data.balones,
          ...data.camisetas,
          ...data.canilleras,
          ...data.guantes,
          ...data.medias
        ]
        setProductos(accesorios)

        const encontrado = accesorios.find((p) => p.sku === sku)
        setProducto(encontrado)
      })
  }, [sku])

  if (!producto) {
    return (
      <div className="container text-center my-5">
        <h2 className="text-danger">Producto no encontrado</h2>
      </div>
    )
  }

  const productoConFormato = {
    ...producto,
    precioFormateado: producto.precio.toLocaleString('es-CL'),
    ofertaFormateada: producto.oferta ? producto.oferta.toLocaleString('es-CL') : null
  }

  return (
    <div className="container my-5">
      <Detalle producto={productoConFormato} />
    </div>
  )
}
