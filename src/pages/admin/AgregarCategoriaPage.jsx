import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const AgregarCategoriaPage = () => {
  const formRef = useRef(null);
  const [slug, setSlug] = useState("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const nombreValue = document.getElementById("nombre").value.trim();
      const slugValue = document.getElementById("slug").value.trim();

      const categoriaData = {
        nombre: nombreValue,
        slug: slugValue,
        padreId: null,
      };

      try {
        const response = await fetch("http://52.203.16.208:8080/api/categorias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoriaData),
        });

        if (!response.ok) {
          const error = await response.json();
          toast.error("Error al agregar categoría: " + error.message);
          return;
        }

        toast.success("Categoría agregada correctamente");
        form.reset();
        form.classList.remove("was-validated");
        setNombre("");
        setSlug("");
      } catch (err) {
        toast.error("Error de conexión: " + err.message);
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  const generarSlug = (nombre) => {
    return nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleNombreChange = (e) => {
    const nuevoNombre = e.target.value;
    setNombre(nuevoNombre);
    
    // Generar slug automáticamente solo si el campo slug está vacío o coincide con el slug generado anteriormente
    if (!slug || slug === generarSlug(nombre)) {
      setSlug(generarSlug(nuevoNombre));
    }
  };

  // Manejar cambio en el campo slug
  const handleSlugChange = (e) => {
    setSlug(e.target.value);
  };

  return (
    <div className="agregar-container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg w-100">
        <div className="card-header bg-primary text-white fs-5 fw-bold text-center">
          Agregar Categoría
        </div>

        <div className="card-body p-4">
          <form ref={formRef} className="needs-validation" noValidate>
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="nombre" className="form-label">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={handleNombreChange}
                  placeholder="Ej: Chaquetas"
                  required
                />
                <div className="invalid-feedback">El nombre es obligatorio.</div>
              </div>

              <div className="col-md-12">
                <label htmlFor="slug" className="form-label">
                  Slug
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="slug"
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="Ej: chaquetas"
                  required
                />
                <div className="form-text">
                  El slug se genera automáticamente desde el nombre, pero puedes editarlo manualmente.
                </div>
                <div className="invalid-feedback">El slug es obligatorio.</div>
              </div>
            </div>

            <div className="mt-3 text-end">
              <button type="submit" className="btn btn-success">
                Guardar Categoría
              </button>
              <button 
                type="reset" 
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setNombre("");
                  setSlug("");
                }}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};