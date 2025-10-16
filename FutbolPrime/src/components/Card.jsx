import React from 'react'
import { NavLink } from "react-router-dom"
import '../assets/card.css'

export const Card = ({ producto }) => {
	return (
		<>
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center g-md-5 g-lg-5">
				<NavLink to="/detalle-producto" className="text-decoration-none text-dark">
					<div className="card product-card h-100 d-flex flex-column">
						<img
							src={producto.imagen}
							className="card-img-top product-img"
							alt={producto.nombre}
						/>
						<div className="card-body d-flex flex-column text-center mt-auto">
							<h5 className="card-title">{producto.nombre}</h5>
							<p className="card-text">{producto.tipo}</p>
							{/* Este div empuja el precio hacia abajo */}
							<div className="mt-auto d-flex justify-content-center gap-4">
								{producto.oferta
									? <p className=" text-primary text-decoration-line-through">
										${producto.oferta}
									</p>
									: null}

								<p className="fw-bold text-primary">
									${producto.precio}
								</p>
							</div>
						</div>
					</div>
				</NavLink>
			</div>
		</>

	)
}
