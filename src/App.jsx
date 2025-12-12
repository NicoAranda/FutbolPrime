import { Routes, Route, Navigate } from "react-router-dom"
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
import { AgregarCategoriaPage } from "./pages/admin/AgregarCategoriaPage"
import { CarritoPage } from "./pages/user/CarritoPage"
import { PagoPage } from "./pages/user/PagoPage"
import { ListaDeseosPage } from "./pages/user/ListaDeseosPage"
import { ConfirmacionPage } from "./pages/user/ConfirmacionPage"
import './App.css'
import { Usuario } from "./pages/admin/Usuarios"
import { CrearUsuario } from "./pages/admin/CrearUsuario"
import { ModificarUsuario } from "./pages/admin/ModificarUsuario"
import { ZapatillasPage } from "./pages/user/ZapatillasPage"
import { BlogPage } from "./pages/user/BlogPage"
import { PerfilPage } from "./pages/user/PerfilPage"

function App() {
  return (
    <>
      <Routes>
        {/* Redirección automática al inicio */}
        <Route path="/" element={<Navigate to="/FutbolPrime" />} />

        {/* RUTAS DEL USUARIO */}
        <Route path="/FutbolPrime" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="balones" element={<BalonesPage />} />
          <Route path="camisetas" element={<CamisetasPage />} />
          <Route path="accesorios" element={<AccesoriosPage />} />
          <Route path="zapatillas" element={<ZapatillasPage />} />
          <Route path="/FutbolPrime/detalle-producto/:sku" element={<DetallePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegisterPage />} />
          <Route path="loginAdmin" element={<LoginAdmin />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="ofertas" element={<OfertasPage />} />
          <Route path="carrito" element={<CarritoPage />} />
          <Route path="pago" element={<PagoPage />} />
          <Route path="listadeseos" element={<ListaDeseosPage />} />
          <Route path="confirmacion" element={<ConfirmacionPage />} />
          <Route path="blog" element={<BlogPage/>} />
          <Route path="perfil" element={<PerfilPage/>} />        
        </Route>

        {/* RUTAS DEL ADMINISTRADOR */}
        <Route path="/administrador" element={<AdminLayout />}>
          <Route index element={<AdministradorPage />} />
          <Route path="productos" element={<Productos />} />
          <Route path="pedidos" element={<PedidosPage />} />
          <Route path="usuarios" element={<Usuario />} />
          <Route path="crear-usuario" element={<CrearUsuario />} />
          <Route path="modificar-usuario/:id" element={<ModificarUsuario />} />
          <Route path="agregar-producto" element={<AgregarProductoPage />} />
          <Route path="agregar-categoria" element={<AgregarCategoriaPage/>} />
        </Route>

        {/* Redirección por defecto si la ruta no existe */}
        <Route path="*" element={<Navigate to="/FutbolPrime" />} />
      </Routes>
    </>
  )
}

export default App
