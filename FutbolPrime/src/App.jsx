import { Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"
import { Carrusel } from "./components/Carrusel"
import { CamisetasPage } from "./pages/CamisetasPage"
import './App.css'
import { AccesoriosPage } from "./pages/AccesoriosPage"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/camisetas" element={<CamisetasPage />}/>
        <Route path="/accesorios" element={<AccesoriosPage />}/>
      </Routes>
    </>
  )
}

export default App
