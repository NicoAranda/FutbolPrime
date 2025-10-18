import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
export const AccesoriosPage = () => {
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
