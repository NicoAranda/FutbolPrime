import React from 'react'

export const Detalle = ({producto}) => {

    const handleClic = () => {
        alert('Producto Comprado')
    }

    return (
        <>
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <img src={producto.imagen} alt="Pelota Final League del Mundial de Clubes FIFA"
                            className="img-fluid rounded" />
                    </div>
                    <div className="col-md-6">
                        <h1 className="fs-2 fw-bold">{producto.nombre}</h1>
                        <p className="fs-4 text-primary fw-semibold">${producto.precio}</p>
                        <ul className="list-unstyled">
                            <li><span className="fw-bold">Tipo: </span>{producto.tipo}</li>
                            <li><span className="fw-bold">Talla: </span> {producto.talla}</li>
                            <li><span className="fw-bold">Color: </span>{producto.color}</li>
                        </ul>
                        <p className="fw-bold text-success">Stock Disponible: {producto.stock} unidades</p>

                        <div className="input-group mt-4">

                            <button className="btn btn-primary" onClick={handleClic}>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
