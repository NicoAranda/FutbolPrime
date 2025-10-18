import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/user/HomePage"
import { CamisetasPage } from "./pages/user/CamisetasPage"
import { AccesoriosPage } from "./pages/user/AccesoriosPage"
import { LoginPage } from "./pages/user/LoginPage"
import { RegisterPage } from "./pages/user/RegisterPage"
import { LoginAdmin } from "./pages/admin/LoginAdmin"
import { NosotrosPage } from "./pages/user/NosotrosPage"
import { BalonesPage } from "./pages/user/BalonesPage"
import { DetallePage } from "./pages/user/DetallePage"
import { OfertasPage } from "./pages/user/OfertasPage"
import { AdministradorPage } from "./pages/admin/AdministradorPage"
import { UserLayout } from "./layouts/UserLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { Productos } from "./pages/admin/ProductosPage"
import { PedidosPage } from "./pages/admin/PedidosPage"
import { AgregarProductoPage } from "./pages/admin/AgregarProductoPage"
import './App.css'

function App() {
  return (
    <>
      <Routes>
        {/* RUTAS DEL USUARIO */}
        <Route path="/FutbolPrime" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="balones" element={<BalonesPage />} />
          <Route path="camisetas" element={<CamisetasPage />} />
          <Route path="accesorios" element={<AccesoriosPage />} />
          <Route path="detalle-producto" element={<DetallePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegisterPage />} />
          <Route path="loginAdmin" element={<LoginAdmin />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="ofertas" element={<OfertasPage />} />
        </Route>

        {/* RUTAS DEL ADMIN */}
        <Route path="/administrador" element={<AdminLayout />}>
          <Route index element={<AdministradorPage />} />
          <Route path="productos" element={<Productos />} />
          <Route path="pedidos" element={<PedidosPage />} />
          <Route path="agregar-producto" element={<AgregarProductoPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
