import React from 'react'
import { PedidosClientes } from '../../components/PedidosClientes'
import '../../assets/sidebar.css'

export const PedidosPage = () => {
    return (
        <>
            <div className="content-admin bg-whitesmoke p-4">
                <div className="card shadow">
                    <PedidosClientes />
                </div>
            </div>
        </>
    )
}
    