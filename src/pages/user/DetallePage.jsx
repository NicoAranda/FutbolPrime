import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { NotificacionEmergente } from "../../components/NotificacionEmergente"
import "../../assets/detalle.css"

export const DetallePage = () => {
  const { sku } = useParams()
  const { addToCart } = useCart()
  const [producto, setProducto] = useState(null)
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false)
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null)

  useEffect(() => {
    fetch(`http://52.203.16.208:8080/api/productos`)
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find(p => p.sku == sku)
        setProducto(encontrado)
        
        if (encontrado) {
          // Detectar si es calzado
          const esCalzado = esProductoCalzado(encontrado)
          const esCamiseta = esProductoCamiseta(encontrado)
          
          if (esCalzado) {
            setTallaSeleccionada("40")
          } else if (esCamiseta) {
            setTallaSeleccionada('M')
          }
        }
      })
      .catch(err => console.error("Error cargando producto:", err))
  }, [sku])

  // Función para detectar calzado
  const esProductoCalzado = (producto) => {
    if (!producto) return false
    
    const tipo = producto.tipo?.toLowerCase() || ''
    const nombre = producto.nombre?.toLowerCase() || ''
    const categoria = producto.categoria?.toLowerCase() || ''
    
    const palabrasCalzado = [
      'zapatillas', 'zapatilla', 
      'botines', 'botín', 'botin',
      'tenis', 'calzado',
      'botas', 'bota',
      'zapatos', 'zapato',
      'sneakers', 'sneaker'
    ]
    
    return palabrasCalzado.some(palabra => 
      tipo.includes(palabra) || 
      nombre.includes(palabra) || 
      categoria.includes(palabra)
    )
  }

  const esProductoCamiseta = (producto) => {
    if (!producto) return false
    const tipo = producto.tipo?.toLowerCase() || ''
    const nombre = producto.nombre?.toLowerCase() || ''
    const categoria = producto.categoria?.toLowerCase() || ''
    
    return tipo.includes('camiseta') || 
           nombre.includes('camiseta') ||
           categoria.includes('camiseta') ||
           tipo.includes('polera') ||
           nombre.includes('polera') ||
           categoria.includes('polera') ||
           tipo.includes('remera') ||
           nombre.includes('remera') ||
           categoria.includes('remera')
  }

  const obtenerTallasDisponibles = () => {
    if (!producto) return []
    
    if (esProductoCalzado(producto)) {
      return ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
    } else if (esProductoCamiseta(producto)) {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    }
    return producto.tallas || []
  }

  const manejarSeleccionTalla = (talla) => {
    setTallaSeleccionada(talla)
  }

  const manejarAgregarCarrito = () => {
    const esCalzado = esProductoCalzado(producto)
    const esCamiseta = esProductoCamiseta(producto)
    
    if ((esCalzado || esCamiseta) && !tallaSeleccionada) {
      alert("Por favor selecciona una talla")
      return
    }
    
    const productoConTalla = { ...producto, tallaSeleccionada }
    addToCart(productoConTalla)
    setMostrarNotificacion(true)
  }

  if (!producto) {
    return <div className="container text-center my-5">
      <h2 className="text-danger">Producto no encontrado</h2>
    </div>
  }

  const esCalzado = esProductoCalzado(producto)
  const esCamiseta = esProductoCamiseta(producto)
  const mostrarTallas = esCalzado || esCamiseta
  const tallasDisponibles = obtenerTallasDisponibles()

  return (
    <div className="detalle-container container py-5">
      <div className="detalle-layout">
        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid shadow-lg rounded" />
        </div>

        <div className="detalle-info">
          <h2 className="fw-bold mb-2">{producto.nombre}</h2>
          <p className="text-muted mb-3">{producto.tipo}</p>

          {producto.descripcion && (
            <p className="descripcion mb-4">{producto.descripcion}</p>
          )}

          <ul className="list-unstyled mb-4">
            <li><strong>SKU:</strong> {producto.sku}</li>
            {producto.marcaNombre && <li><strong>Marca:</strong> {producto.marcaNombre}</li>}
            <li><strong>Color:</strong> {producto.color}</li>
            {tallaSeleccionada && mostrarTallas && (
              <li><strong>Talla seleccionada:</strong> {tallaSeleccionada}</li>
            )}
            <li><strong>Stock disponible:</strong> {producto.stock} unidades</li>
          </ul>

          {mostrarTallas && tallasDisponibles.length > 0 && (
            <div className="tallas-container mb-4">
              <h5 className="fw-bold mb-3">Selecciona tu talla:</h5>
              <div className="tallas-bar d-flex flex-wrap gap-2">
                {tallasDisponibles.map((talla) => (
                  <button
                    key={talla}
                    type="button"
                    className={`btn ${tallaSeleccionada === talla ? 'btn-primary' : 'btn-outline-primary'} fw-semibold`}
                    style={{ 
                      minWidth: '60px',
                      height: '45px',
                      padding: '8px 4px',
                      fontSize: '16px'
                    }}
                    onClick={() => manejarSeleccionTalla(talla)}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>
          )}

          <h3 className="text-primary fw-bold mb-4">
            ${producto.precio.toLocaleString("es-CL")}
          </h3>

          <button
            className="btn btn-primary w-100 fw-semibold py-3"
            onClick={manejarAgregarCarrito}
            disabled={mostrarTallas && !tallaSeleccionada}
            style={{ fontSize: '18px' }}
          >
            {mostrarTallas && !tallaSeleccionada 
              ? "Selecciona una talla primero" 
              : "Agregar al carrito"}
          </button>
        </div>
      </div>

      <NotificacionEmergente
        mensaje={`${producto.nombre} ${tallaSeleccionada ? `(Talla: ${tallaSeleccionada})` : ''} agregado al carrito`}
        mostrar={mostrarNotificacion}
        cerrar={() => setMostrarNotificacion(false)}
      />
    </div>
  )
}

export default DetallePage