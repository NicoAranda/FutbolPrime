import React from 'react'
import { Carrusel } from '../components/Carrusel'
import { Card } from '../components/Card'
import { useState, useEffect } from 'react'

export const HomePage = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('/data/productos.json')
      .then((res) => res.json())
      .then((data) => setProductos(data.balones));

  }, [])


  return (
    <>
      <Carrusel />
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {productos.map((p) => (
            <Card key={p.sku} producto={p} />
          ))}
        </div>
      </div>
    </>
  )
}
