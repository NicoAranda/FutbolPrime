import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const ModificarUsuario = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const formRef = useRef(null)
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        fetch('/data/usuarios.json')
            .then(res => res.json())
            .then(json => {
                const usuarioEncontrado = json.usuarios.find(u => u.id === parseInt(id))
                if (usuarioEncontrado) {
                    setUsuario(usuarioEncontrado)
                } else {
                    alert('Usuario no encontrado')
                }
            })
            .catch(err => console.error('Error cargando usuarios:', err))
    }, [id])

    useEffect(() => {
        const form = formRef.current
        if (!form) return

        const handleSubmit = (event) => {
            event.preventDefault()
            event.stopPropagation()

            if (!form.checkValidity()) {
                form.classList.add('was-validated')
            } else {
                alert('Usuario modificado correctamente')
                form.classList.remove('was-validated')
                navigate('/administrador/usuarios')
            }
        }

        form.addEventListener('submit', handleSubmit)
        return () => form.removeEventListener('submit', handleSubmit)
    }, [usuario, navigate])

    if (!usuario) {
        return (
            <div className="text-center mt-5">
                <h5>Cargando datos del usuario...</h5>
            </div>
        )
    }

    return (
        <div className="agregar-container d-flex justify-content-center align-items-center">
            <div className="card shadow-lg w-100">
                <div className="card-header bg-primary text-white fs-5 fw-bold text-center">
                    Modificar Usuario
                </div>
                <div className="card-body p-4">
                    <form
                        ref={formRef}
                        className="needs-validation"
                        noValidate
                        id="formModificarUsuario"
                    >
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="id" className="form-label">ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="id"
                                    value={usuario.id}
                                    disabled
                                />
                            </div>

                            <div className="col-md-8">
                                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    defaultValue={usuario.nombre}
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
                                    defaultValue={usuario.correo}
                                    required
                                />
                                <div className="invalid-feedback">Ingresa un correo válido.</div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="rol" className="form-label">Rol</label>
                                <select
                                    className="form-select"
                                    id="rol"
                                    defaultValue={usuario.rol}
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
                            <button type="submit" className="btn btn-primary">
                                Guardar Cambios
                            </button>
                            <button type="reset" className="btn btn-secondary ms-2">
                                Restablecer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
