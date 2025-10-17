import React from 'react'

export const AdministradorPage = () => {
  return (
    <>
      <>
        <div className="content w-100 bg-whitesmoke hola">
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card text-bg-primary shadow">
                <div className="card-body">
                  <h5 className="card-title">Productos</h5>
                  <p className="card-text fs-4">78</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-bg-success shadow">
                <div className="card-body">
                  <h5 className="card-title">Ganancias Mensuales</h5>
                  <p className="card-text fs-4">$1.076.990</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-bg-warning shadow">
                <div className="card-body">
                  <h5 className="card-title">Usuarios</h5>
                  <p className="card-text fs-4">110</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Productos Agregados
            </div>
            <div className="card-body table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SKU</th>
                    <th>Producto</th>
                    <th>Stok</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>PLT753159</td>
                    <td>Erling Haaland Academy</td>
                    <td><span className="badge bg-success">140</span></td>
                    <td>$32.990</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>CMT903321</td>
                    <td>Camiseta Marsella</td>
                    <td><span className="badge bg-warning">55</span></td>
                    <td>$65.990</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>M020132</td>
                    <td>Medias Poker Rojas Adulto</td>
                    <td><span className="badge bg-danger">10</span></td>
                    <td>$4.990  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card shadow mt-5">
            <div className="card-header bg-primary text-white">
              Pedidos de Clientes
            </div>
            <div className="card-body table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Carlos Pérez</td>
                    <td>Camiseta Colo-Colo</td>
                    <td><span className="badge bg-success">Completado</span></td>
                    <td>09-09-2025</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>María López</td>
                    <td>Balón Adidas</td>
                    <td><span className="badge bg-warning">Pendiente</span></td>
                    <td>08-09-2025</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Juan Torres</td>
                    <td>Guantes Nike</td>
                    <td><span className="badge bg-danger">Cancelado</span></td>
                    <td>07-09-2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </>
    </>
  )
}
