import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
export const AccesoriosPage = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
      fetch(`http://98.92.165.178:8080/api/productos`)
        .then((res) => res.json())
        .then((data) => {
          const accesorios = data.filter(p => p.tipo == 'CANILLERAS' || p.tipo == 'MEDIAS' || p.tipo == 'GUANTES' || p.tipo == 'BOLSO');
          setProductos(accesorios);
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    }, []);

  return (
    <>
      <h2 className='mt-4 text-center'>Accesorios</h2>
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
