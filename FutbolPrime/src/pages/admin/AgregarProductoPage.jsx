import React, { useEffect, useRef } from 'react'

export const AgregarProductoPage = () => {
  const formRef = useRef(null)

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const handleSubmit = (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!form.checkValidity()) {
        form.classList.add('was-validated')
      } else {
        alert('Producto agregado correctamente')
        form.reset()
        form.classList.remove('was-validated')
      }
    }

    form.addEventListener('submit', handleSubmit)

    return () => {
      form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return (
    <div className="content w-100">
      <div className="card shadow mt-5">
        <div className="card-header bg-primary text-white">
          Agregar Producto
        </div>
        <div className="card-body">
          <form
            ref={formRef}
            className="needs-validation"
            noValidate
            id="formAgregarProducto"
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="sku" className="form-label">SKU</label>
                <input
                  type="text"
                  className="form-control"
                  id="sku"
                  placeholder="Ej: PLT753159"
                  required
                />
                <div className="invalid-feedback">El SKU es obligatorio.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Ej: Camiseta Barcelona"
                  required
                />
                <div className="invalid-feedback">El nombre es obligatorio.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  id="stock"
                  placeholder="Ej: 50"
                  required
                />
                <div className="invalid-feedback">Ingresa el stock.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  placeholder="Ej: 39990"
                  required
                />
                <div className="invalid-feedback">Ingresa el precio.</div>
              </div>

              <div className="col-md-12">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  rows="3"
                  required
                ></textarea>
                <div className="invalid-feedback">La descripción es obligatoria.</div>
              </div>

              <div className="col-md-12">
                <label htmlFor="imagen" className="form-label">Imagen del Producto</label>
                <input
                  className="form-control"
                  type="file"
                  id="imagen"
                  required
                />
                <div className="invalid-feedback">Debes subir una imagen.</div>
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
