import React from 'react'

export const CardAdmin = (props) => {
  return (
    <>
            <div className="col-md-4">
              <div className={`card text-bg-${props.color} shadow`}>
                <div className="card-body">
                  <h5 className="card-title">{props.titulo}</h5>
                  <p className="card-text fs-4">{props.cantidad}</p>
                </div>
              </div>
            </div>
    </>
  )
}
