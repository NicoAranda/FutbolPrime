import React from 'react'
import { PedidosClientes } from '../../components/PedidosClientes'
import '../../assets/sidebar.css'

export const PedidosPage = () => {
    return (
        <>
            <div className="content-admin card shadow mt-5">
                <PedidosClientes />
            </div>
        </>
    )
}
    