import { Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/user/HomePage"
import { CamisetasPage } from "./pages/user/CamisetasPage"
import './App.css'
import { AccesoriosPage } from "./pages/user/AccesoriosPage"
import { LoginPage } from "./pages/user/LoginPage"
import { RegisterPage } from "./pages/user/RegisterPage"
import { LoginAdmin } from "./pages/admin/LoginAdmin"
import { NosotrosPage } from "./pages/user/NosotrosPage"
import { BalonesPage } from "./pages/user/BalonesPage"
import { DetallePage } from "./pages/user/DetallePage"
import { OfertasPage } from "./pages/user/OfertasPage"
import { AdministradorPage } from "./pages/admin/AdministradorPage"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balones" element={<BalonesPage/>}/>
        <Route path="/camisetas" element={<CamisetasPage />}/>
        <Route path="/accesorios" element={<AccesoriosPage />}/>
        <Route path="/detalle-producto" element={<DetallePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/registro" element={<RegisterPage />}/>
        <Route path="/loginAdmin" element={<LoginAdmin />}/>
        <Route path="/nosotros" element={<NosotrosPage />}/>
        <Route path="/ofertas" element={<OfertasPage />}/>
        <Route path="/administrador" element={<AdministradorPage />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
