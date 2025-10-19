import React, { useEffect, useRef } from 'react'

export const CrearUsuario = () => {
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
        alert('Usuario creado correctamente')
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
    <div className="agregar-container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg w-100">
        <div className="card-header bg-primary text-white fs-5 fw-bold text-center">
          Crear Nuevo Usuario
        </div>
        <div className="card-body p-4">
          <form
            ref={formRef}
            className="needs-validation"
            noValidate
            id="formCrearUsuario"
          >
            <div className="row g-3">
              
              <div className="col-md-4">
                <label htmlFor="id" className="form-label">ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  placeholder="Ej: 1"
                  required
                />
                <div className="invalid-feedback">El ID es obligatorio.</div>
              </div>

              <div className="col-md-8">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Ej: Juan Pérez"
                  required
                />
                <div className="invalid-feedback">El nombre es obligatorio.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  placeholder="Ej: juan.perez@gmail.com"
                  required
                />
                <div className="invalid-feedback">Ingresa un correo válido.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select
                  className="form-select"
                  id="rol"
                  required
                >
                  <option value="">Seleccione un rol...</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Vendedor">Vendedor</option>
                </select>
                <div className="invalid-feedback">Selecciona un rol.</div>
              </div>
            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-success">
                Guardar Usuario
              </button>
              <button type="reset" className="btn btn-secondary ms-2">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
