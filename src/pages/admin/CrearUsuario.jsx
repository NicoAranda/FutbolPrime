import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const CrearUsuario = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()

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

      // ✅ Tomamos los datos del formulario
      const formData = new FormData(form)
      const payload = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        password: formData.get('password'),
        rol: formData.get('rol'),
        habilitado: true       // el backend lo setea en true igual, pero lo mandamos por claridad
      }

      try {
        const res = await fetch('http://52.203.16.208:8080/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!res.ok) {
          const texto = await res.text()
          console.error('Error al crear usuario:', res.status, texto)
          alert(texto || 'No se pudo crear el usuario')
          return
        }

        alert('Usuario creado correctamente')
        form.reset()
        form.classList.remove('was-validated')

        navigate('/administrador/usuarios')
      } catch (err) {
        console.error('Error de red al crear usuario:', err)
        alert('Ocurrió un error de red al crear el usuario')
      }
    }

    form.addEventListener('submit', handleSubmit)

    return () => {
      form.removeEventListener('submit', handleSubmit)
    }
  }, [navigate])

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
                  placeholder="Se generará automáticamente"
                  disabled              
                />
              </div>

              <div className="col-md-8">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"                     
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
                  name="email"                       
                  placeholder="Ej: juan.perez@gmail.com"
                  required
                />
                <div className="invalid-feedback">Ingresa un correo válido.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"                  
                  placeholder="Mínimo 6 caracteres"
                  required
                />
                <div className="invalid-feedback">La contraseña es obligatoria.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select
                  className="form-select"
                  id="rol"
                  name="rol"                       
                  required
                >
                  <option value="">Seleccione un rol...</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="CLIENTE">Cliente</option>
                  <option value="VENDEDOR">Vendedor</option>
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
