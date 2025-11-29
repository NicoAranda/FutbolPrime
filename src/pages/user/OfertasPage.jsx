import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'

export const OfertasPage = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
      fetch(`http://98.92.165.178:8080/api/productos`)
        .then((res) => res.json())
        .then((data) => {
          const productosEnOferta = data.filter(p => p.oferta !== null);
          setProductos(productosEnOferta);
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    }, []);

  return (
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
  )
}
