import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
export const CamisetasPage = () => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch(`http://52.203.16.208:8080/api/productos`)
          .then((res) => res.json())
          .then((data) => {
            const camisetas = data.filter(p => p.tipo == 'CAMISETA');
            setProductos(camisetas);
          })
          .catch((err) => console.error("Error al cargar productos:", err));
      }, []);

    return (
        <>
            <h2 className='mt-4'>Camisetas</h2>
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
