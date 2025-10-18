import React from 'react'

export const Detalle = ({ producto }) => {

  const urlImagen = `${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, '')}`

  
  const formatoPrecio = (precio) => precio.toLocaleString('es-CL')

  const handleClic = () => {
    alert('Producto Comprado')
  }

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={urlImagen}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6 text-center">
          <h1 className="fs-2 fw-bold">{producto.nombre}</h1>

          <div className="d-flex flex-column align-items-center mt-3 mb-3">
            {producto.oferta && (
              <p className="fs-5 text-secondary text-decoration-line-through mb-1">
                ${formatoPrecio(producto.oferta)}
              </p>
            )}
            <p className="fs-3 text-primary fw-bold mb-0">
              ${formatoPrecio(producto.precio)}
            </p>
          </div>

          <ul className="list-unstyled mt-3 text-start d-inline-block">
            {producto.tipo && <li><span className="fw-bold">Tipo: </span>{producto.tipo}</li>}
            {producto.talla && <li><span className="fw-bold">Talla: </span>{producto.talla}</li>}
            <li><span className="fw-bold">Color: </span>{producto.color}</li>
          </ul>

          <p className="fw-bold text-success mt-2">
            Stock Disponible: {producto.stock} unidades
          </p>

          <div className="input-group justify-content-center mt-4">
            <button className="btn btn-primary" onClick={handleClic}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
