import { Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"
import { CamisetasPage } from "./pages/CamisetasPage"
import './App.css'
import { AccesoriosPage } from "./pages/AccesoriosPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { LoginAdmin } from "./pages/LoginAdmin"

import { NosotrosPage } from "./pages/NosotrosPage"


import { BalonesPage } from "./pages/BalonesPage"
import { DetallePage } from "./pages/DetallePage"
import { Footer } from "./components/Footer"

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
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
