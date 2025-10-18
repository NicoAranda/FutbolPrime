import React from 'react'
import { useState, useEffect } from 'react'
import { Detalle } from '../../components/Detalle'

export const DetallePage = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => res.json())
      .then((data) => {
        // Unimos los tres arrays en uno solo
        const accesorios = [
          ...data.canilleras,
          ...data.guantes,
          ...data.medias
        ]
        setProductos(accesorios)
      })
  }, [])


  return (
    <>
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {productos.map((p) => (
            <Detalle key={p.sku} producto={p} />
          ))}
        </div>
      </div>
    </>
  )
}
