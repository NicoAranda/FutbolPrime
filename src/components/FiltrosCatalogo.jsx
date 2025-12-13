import React from "react"

export const FiltrosCatalogo = ({
  search,
  setSearch,
  marca,
  setMarca,
  tipo,
  setTipo,
  talla,
  setTalla,
  color,
  setColor,
  precioMin,
  setPrecioMin,
  precioMax,
  setPrecioMax,
  soloStock,
  setSoloStock,
  soloOferta,
  setSoloOferta,
  ordenar,
  setOrdenar,
  marcasDisponibles,
  tiposDisponibles,
  tallasDisponibles,
  coloresDisponibles,
  limpiarFiltros
}) => {
  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3">Buscar y filtrar</h5>

      {/* Buscador */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Buscar por nombre, SKU o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Marca */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Marca</label>
        <select className="form-select" value={marca} onChange={(e) => setMarca(e.target.value)}>
          <option value="">Todas</option>
          {marcasDisponibles.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Tipo */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Tipo</label>
        <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Todos</option>
          {tiposDisponibles.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Talla */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Talla</label>
        <select className="form-select" value={talla} onChange={(e) => setTalla(e.target.value)}>
          <option value="">Todas</option>
          {tallasDisponibles.map((ta) => (
            <option key={ta} value={ta}>{ta}</option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Color</label>
        <select className="form-select" value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Todos</option>
          {coloresDisponibles.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Precio */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Rango de precio</label>
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
      </div>

      {/* Checks */}
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={soloStock}
          onChange={(e) => setSoloStock(e.target.checked)}
          id="soloStock"
        />
        <label className="form-check-label" htmlFor="soloStock">
          Solo con stock
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={soloOferta}
          onChange={(e) => setSoloOferta(e.target.checked)}
          id="soloOferta"
        />
        <label className="form-check-label" htmlFor="soloOferta">
          Solo con oferta
        </label>
      </div>

      {/* Orden */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Ordenar</label>
        <select className="form-select" value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
          <option value="relevancia">Relevancia</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
          <option value="nombre_asc">Nombre: A-Z</option>
          <option value="oferta_desc">Mayor oferta</option>
        </select>
      </div>

      <button className="btn btn-outline-secondary w-100" onClick={limpiarFiltros}>
        Limpiar filtros
      </button>
    </div>
  )
}

export default FiltrosCatalogo
