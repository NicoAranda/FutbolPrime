import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const ModificarUsuario = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        rol: ''
    })
    const [cargando, setCargando] = useState(true)

    // Cargar usuario desde backend
    useEffect(() => {
        fetch(`http://52.203.16.208:8080/api/usuarios/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('No se pudo cargar el usuario')
                }
                return res.json()
            })
            .then(data => {
                setFormData({
                    nombre: data.nombre || '',
                    email: data.email || '',
                    rol: data.rol || ''
                })
            })
            .catch(err => {
                console.error('Error cargando usuario:', err)
                alert('No se pudo cargar el usuario')
            })
            .finally(() => setCargando(false))
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()        
        event.stopPropagation()
        if (!formData.nombre || !formData.rol) {
            alert('Completa nombre y rol')
            return
        }
        const payload = {
            nombre: formData.nombre,
            rol: formData.rol
        }
        try {
            const res = await fetch(`http://52.203.16.208:8080/api/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!res.ok) {
                const texto = await res.text()
                console.error('Error al actualizar usuario:', res.status, texto)
                alert(texto || 'No se pudo actualizar el usuario')
                return
            }

            alert('Usuario modificado correctamente')
            navigate('/administrador/usuarios')
        } catch (err) {
            console.error('Error de red al actualizar usuario:', err)
            alert('Ocurrió un error de red al actualizar el usuario')
        }
    }

    if (cargando) {
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
                        onSubmit={handleSubmit}       
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
                                    value={id}
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
                                    value={formData.nombre}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback">Ingresa un correo válido.</div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="rol" className="form-label">Rol</label>
                                <select
                                    className="form-select"
                                    id="rol"
                                    name="rol"
                                    value={formData.rol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un rol...</option>
                                    <option value="ADMIN">Administrador</option>
                                    <option value="CLIENTE">Cliente</option>
                                </select>
                                <div className="invalid-feedback">Selecciona un rol.</div>
                            </div>
                        </div>

                        <div className="mt-4 text-end">
                            <button type="submit" className="btn btn-primary">
                                Guardar Cambios
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => navigate('/administrador/usuarios')}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
