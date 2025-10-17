import React from 'react'

export const ProductosAgregados = (props) => {
    return (
        <>
            <tr>
                <td>{props.sku}</td>
                <td>{props.nombre}</td>
                <td><span
                    className={`badge bg-${props.stock < 30
                            ? 'danger'
                            : props.stock <= 80
                                ? 'warning'
                                : 'success'
                        }`}
                >
                    {props.stock}
                </span></td>
                <td>${props.precio}</td>
            </tr>
        </>
    )
}
