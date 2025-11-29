import React from 'react'
import { Carrusel } from '../../components/Carrusel'
import { Card } from "../../components/Card"
import { useState, useEffect } from 'react'

export const HomePage = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch(`http://35.175.191.144:8080/api/productos`)
      .then((res) => res.json())
      .then((data) => {
        const productosEnOferta = data.filter(p => p.oferta !== null);
        setProductos(productosEnOferta);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);


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
