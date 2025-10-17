import React from 'react'

export const PedidosClientes = () => {
    return (
        <>
            <div className="card-header bg-primary text-white">
                Pedidos de Clientes
            </div>
            <div className="card-body table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Carlos Pérez</td>
                            <td>Camiseta Colo-Colo</td>
                            <td><span className="badge bg-success">Completado</span></td>
                            <td>09-09-2025</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>María López</td>
                            <td>Balón Adidas</td>
                            <td><span className="badge bg-warning">Pendiente</span></td>
                            <td>08-09-2025</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Juan Torres</td>
                            <td>Guantes Nike</td>
                            <td><span className="badge bg-danger">Cancelado</span></td>
                            <td>07-09-2025</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
