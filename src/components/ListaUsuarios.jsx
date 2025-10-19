import React, { useState } from 'react'
import data from '../../public/data/usuarios.json' 

export const ListaUsuarios = () => {

    const [usuarios, setUsuarios] = useState(data.usuarios)

    const handleCrear = () => {
        const nombre = prompt('Ingrese el nombre del nuevo usuario:')
        const correo = prompt('Ingrese el correo del usuario:')
        const rol = prompt('Ingrese el rol (Administrador / Cliente / Vendedor):')
        if (nombre && correo && rol) {
            const nuevoUsuario = {
                id: usuarios.length + 1,
                nombre,
                correo,
                rol
            }
            setUsuarios([...usuarios, nuevoUsuario])
        }
    }

    const handleModificar = (id) => {
        const usuario = usuarios.find(u => u.id === id)
        const nombre = prompt('Nuevo nombre:', usuario.nombre)
        const correo = prompt('Nuevo correo:', usuario.correo)
        const rol = prompt('Nuevo rol:', usuario.rol)
        if (nombre && correo && rol) {
            const actualizados = usuarios.map(u =>
                u.id === id ? { ...u, nombre, correo, rol } : u
            )
            setUsuarios(actualizados)
        }
    }

    const handleEliminar = (id) => {
        if (window.confirm('¿Desea eliminar este usuario?')) {
            setUsuarios(usuarios.filter(u => u.id !== id))
        }
    }

    return (
        <>
            <div className="card-header bg-primary text-white">
                Lista de Usuarios
            </div>
            <div className="card-body table-responsive">
                <div className="mb-3 text-end">
                    <button onClick={handleCrear} className="btn btn-success btn-sm">
                        Crear Usuario
                    </button>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rol}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleModificar(usuario.id)}
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminar(usuario.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
