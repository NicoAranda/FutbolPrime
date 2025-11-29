import { useEffect, useState } from 'react'
import { Card } from "../../components/Card"
export const BalonesPage = () => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch(`http://35.175.191.144:8080/api/productos`)
          .then((res) => res.json())
          .then((data) => {
            const balones = data.filter(p => p.tipo == 'BALON');
            setProductos(balones);
          })
          .catch((err) => console.error("Error al cargar productos:", err));
      }, []);

    return (
        <>
            <h2 className='mt-4'>Balones</h2>
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
