import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'

export const ZapatillasPage = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
      fetch(`http://52.203.16.208:8080/api/productos`)
        .then((res) => res.json())
        .then((data) => {
          const zapatillas = data.filter(p => p.tipo == 'ZAPATILLAS' || p.tipo == 'BOTINES');
          setProductos(zapatillas);
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    }, []);

  return (
    <>
      <h2 className='mt-4 text-center'>Zapatillas y Botines</h2>
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
