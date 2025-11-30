import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]) // Inicializar como array vacío

    useEffect(() => {
        fetch("http://52.203.16.208:8080/api/usuarios")
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error('Error cargando usuarios:', error));
    }, []);

    const handleEliminar = (id) => {
        if (window.confirm('¿Desea eliminar este usuario?')) {
            // Primero hacer la petición DELETE al servidor
            fetch(`http://52.203.16.208:8080/api/usuarios/${id}`, {
                method: 'DELETE'
            })
            .then(res => {
                if (res.ok) {
                    // Solo actualizar el estado si la petición fue exitosa
                    setUsuarios(usuarios.filter(u => u.id !== id))
                } else {
                    console.error('Error al eliminar usuario')
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }

    return (
        <>
            <div className="card-header bg-primary text-white">
                Lista de Usuarios
            </div>
            <div className="card-body table-responsive">
                <div className="mb-3 text-end">
                    <Link to="/administrador/crear-usuario" className="btn btn-success btn-sm">
                        Crear Usuario
                    </Link>
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
                        {usuarios && usuarios.length > 0 ? (
                            usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.correo}</td>
                                    <td>{usuario.rol}</td>
                                    <td>
                                        <Link 
                                            to={`/administrador/modificar-usuario/${usuario.id}`} 
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Modificar
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleEliminar(usuario.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    No hay usuarios disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}