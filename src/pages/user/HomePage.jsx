import React from 'react'
import { Carrusel } from '../../components/Carrusel'
import { Card } from '../../components/Card'
import { useState, useEffect } from 'react'

export const HomePage = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => res.json())
      .then((data) => {
        // Combinar todos los productos de las categorías
        const todosLosProductos = [
          ...(data.balones || []),
          ...(data.camisetas || []),
          ...(data.guantes || []),
          ...(data.canilleras || []),
          ...(data.medias || [])
        ]

        // Guardar en el estado solo los productos en oferta
        setProductos(todosLosProductos.filter((p) => p.oferta >= 0))
      })
  }, [])


  return (
    <>
      <Carrusel />
      <div className="container my-5">
      <h2 className="text-center mb-4">Productos en Oferta</h2>
      <div className="row g-4 justify-content-center">
        {productos.length > 0 ? (
          productos.map((p) => <Card key={p.sku} producto={p} />)
        ) : (
          <p className="text-center">No hay productos en oferta actualmente.</p>
        )}
      </div>
    </div>
    </>
  )
}
