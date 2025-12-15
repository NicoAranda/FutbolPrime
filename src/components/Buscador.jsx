import React from "react";

export const Buscador = ({
  value,
  onChange,
  placeholder = "Buscar..."
}) => {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white">
        <i className="bi bi-search" />
      </span>

      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Buscador;
