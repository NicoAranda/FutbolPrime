import React, { useEffect, useRef } from 'react'

export const AgregarProductoPage = () => {
  const formRef = useRef(null)

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const handleSubmit = async (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!form.checkValidity()) {
        form.classList.add('was-validated')
        return
      }

      // Obtener valores del formulario
      const sku = document.getElementById("sku").value
      const nombre = document.getElementById("nombre").value
      const stock = parseInt(document.getElementById("stock").value)
      const precio = parseInt(document.getElementById("precio").value)
      const descripcion = document.getElementById("descripcion").value
      const imagen = document.getElementById("imagen").value
      const tipo = document.getElementById("tipo").value.toUpperCase()
      const marcaId = parseInt(document.getElementById("marcaId").value)

      const nuevoProducto = {
        sku,
        nombre,
        precio,
        stock,
        descripcion,
        marcaId,
        imagen,
        tipo
      }

      try {
        const response = await fetch("http://52.203.16.208:8080/api/productos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nuevoProducto)
        })

        if (!response.ok) {
          throw new Error("Error al agregar el producto")
        }

        const data = await response.json()
        alert("Producto agregado correctamente! ID: " + data.id)

        form.reset()
        form.classList.remove('was-validated')

      } catch (error) {
        alert("Error: " + error.message)
      }
    }

    form.addEventListener('submit', handleSubmit)

    return () => {
      form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return (
    <div className="agregar-container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg w-100">
        <div className="card-header bg-primary text-white fs-5 fw-bold text-center">
          Agregar Producto
        </div>
        <div className="card-body p-4">
          <form ref={formRef} className="needs-validation" noValidate id="formAgregarProducto">
            <div className="row g-3">

              {/* SKU */}
              <div className="col-md-6">
                <label htmlFor="sku" className="form-label">SKU</label>
                <input type="text" className="form-control" id="sku" required />
              </div>

              {/* Nombre */}
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
                <input type="text" className="form-control" id="nombre" required />
              </div>

              {/* Stock */}
              <div className="col-md-6">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input type="number" className="form-control" id="stock" required />
              </div>

              {/* Precio */}
              <div className="col-md-6">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input type="number" className="form-control" id="precio" required />
              </div>

              {/* Descripción */}
              <div className="col-md-12">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea className="form-control" id="descripcion" rows="3" required></textarea>
              </div>

              {/* Imagen */}
              <div className="col-md-12">
                <label htmlFor="imagen" className="form-label">Imagen (URL)</label>
                <input type="text" className="form-control" id="imagen" required />
              </div>

              {/* Tipo */}
              <div className="col-md-12">
                <label htmlFor="tipo" className="form-label">Tipo de Producto</label>
                <select className="form-control" id="tipo" required>
                  <option value="">Seleccionar tipo...</option>
                  <option value="BALON">Balón</option>
                  <option value="CAMISETA">Camiseta</option>
                  <option value="ZAPATILLA">Zapatilla</option>
                  <option value="ACCESORIO">Accesorio</option>
                </select>
              </div>

              {/*Marca*/}
              <div className="col-md-12">
                <label htmlFor="marcaId" className="form-label">Marca</label>
                <select className="form-control" id="marcaId" required>
                  <option value="">Seleccionar marca...</option>
                  <option value="1">Adidas</option>
                  <option value="2">Nike</option>
                  <option value="3">Puma</option>
                  <option value="4">Under Armour</option>
                </select>
              </div>
            </div>

            <div className="mt-3 text-end">
              <button type="submit" className="btn btn-success">Guardar Producto</button>
              <button type="reset" className="btn btn-secondary ms-2">Limpiar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
