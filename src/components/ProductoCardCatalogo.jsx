import React from "react";
import { useCart } from "../context/CartContext";

const ProductoCardCatalogo = ({ producto }) => {
  const { addToCart } = useCart();

  if (!producto) return null;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={producto.imagen}
        className="card-img-top"
        alt={producto.nombre}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold">{producto.nombre}</h6>

        <p className="text-muted mb-1">{producto.marcaNombre}</p>

        <p className="fw-bold text-primary mb-2">
          ${producto.precio.toLocaleString("es-CL")}
        </p>

        <button
          className="btn btn-primary mt-auto"
          onClick={() => addToCart(producto)}
          disabled={producto.stock === 0}
        >
          {producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
};

export default ProductoCardCatalogo;
