import { useEffect, useState } from 'react'
import { CardAdmin } from '../../components/CardAdmin'
import { ProductosAgregados } from '../../components/ProductosAgregados'
import { PedidosClientes } from '../../components/PedidosClientes'
import '../../assets/sidebar.css'

export const AdministradorPage = () => {

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [gananciasTotales, setGananciasTotales] = useState(0);

  // --- Cargar productos ---
  useEffect(() => {
    fetch("http://52.203.16.208:8080/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  // --- Cargar usuarios y luego calcular ganancias ---
  useEffect(() => {
    fetch("http://52.203.16.208:8080/api/usuarios")
      .then(res => res.json())
      .then(async (dataUsuarios) => {
        setUsuarios(dataUsuarios);

        // Aquí calculamos las ganancias recorriendo todos los usuarios
        let total = 0;

        for (const user of dataUsuarios) {
          try {
            const res = await fetch(`http://52.203.16.208:8080/api/pedidos/${user.id}`);
            if (!res.ok) continue;

            const dataPedidos = await res.json();
            const pedidosArray = Array.isArray(dataPedidos) ? dataPedidos : [dataPedidos];

            // Sumar el total de cada pedido del usuario
            pedidosArray.forEach(p => {
              if (p.total) total += p.total;
            });

          } catch (error) {
            console.error(`Error cargando pedidos del usuario ${user.id}`, error);
          }
        }

        setGananciasTotales(total);
      })
      .catch(error => console.error("Error cargando usuarios:", error));
  }, []);

  return (
    <div className="content-admin d-flex flex-column align-items-center p-4">
      <div className="dashboard-container w-100" style={{ maxWidth: "1200px" }}>

        {/* Tarjetas superiores */}
        <div className="dashboard-cards">
          <div className="dashboard-card blue">
            <h5>Productos</h5>
            <p>{productos.length}</p>
          </div>

          <div className="dashboard-card green">
            <h5>Ganancias Totales</h5>
            <p>${gananciasTotales}</p>
          </div>

          <div className="dashboard-card yellow">
            <h5>Usuarios</h5>
            <p>{usuarios.length}</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="card shadow mb-5">
          <div className="card-header bg-primary text-white">
            Productos Agregados
          </div>

          <div className="card-body table-responsive">
            <table className="table table-striped table-hover align-middle text-center">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Producto</th>
                  <th>Stock</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((p) => (
                    <ProductosAgregados
                      key={p.sku}
                      sku={p.sku}
                      nombre={p.nombre}
                      stock={p.stock}
                      precio={p.precio}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No hay productos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pedidos de clientes */}
        <div className="card shadow mt-4">
          <PedidosClientes />
        </div>

      </div>
    </div>
  )
}
