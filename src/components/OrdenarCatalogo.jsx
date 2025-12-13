import React from "react";

export const OrdenarCatalogo = ({ value, onChange }) => {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="relevancia">Ordenar: Relevancia</option>
      <option value="precio_asc">Precio: menor a mayor</option>
      <option value="precio_desc">Precio: mayor a menor</option>
      <option value="nombre_asc">Nombre: A → Z</option>
      <option value="nombre_desc">Nombre: Z → A</option>
    </select>
  );
};

export default OrdenarCatalogo;
