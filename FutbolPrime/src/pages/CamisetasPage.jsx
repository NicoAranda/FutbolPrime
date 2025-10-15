import { useEffect, useState } from 'react'
import { Card } from '../components/Card'

export const CamisetasPage = () => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch('/data/productos.json')
            .then((res) => res.json())
            .then((data) => setProductos(data.camisetas));

    }, [])

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
