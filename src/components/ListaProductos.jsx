import React, { useEffect, useMemo, useState } from "react";
import ProductoCardCatalogo from "./ProductoCardCatalogo";
import Buscador from "./Buscador";
import OrdenarCatalogo from "./OrdenarCatalogo";
import SeparadorMarca from "./SeparadorMarca";

const BASE_URL = "http://52.203.16.208:8080";

const normalizar = (v) =>
  String(v || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const inferirGenero = (p) => {
  // Esto es “heurístico” (porque tu BD no tiene género).
  // Busca palabras claves en nombre/descripcion/tipo.
  const texto = normalizar(
    `${p.nombre} ${p.descripcion || ""} ${p.tipo || ""}`
  );

  const esHombre =
    texto.includes("hombre") || texto.includes("men") || texto.includes("man");
  const esMujer =
    texto.includes("mujer") ||
    texto.includes("women") ||
    texto.includes("woman") ||
    texto.includes("dama");

  if (esHombre && !esMujer) return "HOMBRE";
  if (esMujer && !esHombre) return "MUJER";
  if (esHombre && esMujer) return "UNISEX";

  // si no dice nada, lo tomamos como UNISEX para no ocultar productos
  return "UNISEX";
};

export const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const [marca, setMarca] = useState("TODAS");
  const [genero, setGenero] = useState("TODOS"); // TODOS | HOMBRE | MUJER | UNISEX

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${BASE_URL}/api/productos`);
        if (!res.ok) throw new Error("No se pudieron cargar los productos.");

        const data = await res.json();
        setProductos(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Error cargando catálogo.");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const marcasDisponibles = useMemo(() => {
    const set = new Set();
    productos.forEach((p) => {
      if (p.marcaNombre) set.add(p.marcaNombre);
    });
    return ["TODAS", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [productos]);

  const filtrados = useMemo(() => {
    const query = normalizar(q);

    return productos.filter((p) => {
      // buscador
      const texto = normalizar(`${p.nombre} ${p.descripcion || ""} ${p.tipo || ""} ${p.marcaNombre || ""}`);
      const matchQ = query.length === 0 ? true : texto.includes(query);

      // marca
      const matchMarca = marca === "TODAS" ? true : p.marcaNombre === marca;

      // género (inferido)
      const gen = inferirGenero(p);
      const matchGenero = genero === "TODOS" ? true : gen === genero;

      return matchQ && matchMarca && matchGenero;
    });
  }, [productos, q, marca, genero]);

  const ordenados = useMemo(() => {
    const arr = [...filtrados];

    if (orden === "precio_asc") {
      arr.sort((a, b) => (a.precio || 0) - (b.precio || 0));
    } else if (orden === "precio_desc") {
      arr.sort((a, b) => (b.precio || 0) - (a.precio || 0));
    } else if (orden === "nombre_asc") {
      arr.sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || "")));
    } else if (orden === "nombre_desc") {
      arr.sort((a, b) => String(b.nombre || "").localeCompare(String(a.nombre || "")));
    }
    // relevancia = deja el orden del backend
    return arr;
  }, [filtrados, orden]);

  // agrupar por marca para separadores
  const porMarca = useMemo(() => {
    const map = new Map();
    ordenados.forEach((p) => {
      const key = p.marcaNombre || "OTROS";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    });
    // orden de marcas alfabético
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [ordenados]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {/* Toolbar */}
      <div className="row g-3 align-items-end mb-3">
        <div className="col-12 col-md-5">
          <Buscador value={q} onChange={setQ} placeholder="Buscar producto, marca, tipo..." />
        </div>

        <div className="col-6 col-md-3">
          <label className="form-label mb-1">Género</label>
          <select
            className="form-select"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="HOMBRE">Hombre</option>
            <option value="MUJER">Mujer</option>
            <option value="UNISEX">Unisex</option>
          </select>
        </div>

        <div className="col-6 col-md-2">
          <label className="form-label mb-1">Marca</label>
          <select
            className="form-select"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          >
            {marcasDisponibles.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-2">
          <label className="form-label mb-1">Orden</label>
          <OrdenarCatalogo value={orden} onChange={setOrden} />
        </div>
      </div>

      {/* Resultados */}
      {ordenados.length === 0 ? (
        <div className="alert alert-warning text-center">
          No hay productos con esos filtros.
        </div>
      ) : (
        porMarca.map(([marcaTitulo, lista]) => (
          <div key={marcaTitulo}>
            <SeparadorMarca titulo={marcaTitulo} />

            <div className="row g-3">
              {lista.map((p) => (
                <div key={p.id || p.sku} className="col-6 col-md-4 col-lg-3">
                  <ProductoCardCatalogo producto={p} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaProducto;
