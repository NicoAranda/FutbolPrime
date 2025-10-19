import React from 'react'
import { ListaUsuarios } from '../../components/ListaUsuarios'

export const Usuario = () => {
    return (
        <>
            <div className="container my-5">
                <div className="card shadow">
                    <ListaUsuarios />
                </div>
            </div>
        </>
    )
}
