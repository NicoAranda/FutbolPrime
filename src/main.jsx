// main.jsx
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx' // ✅ Import correcto
import { ListaDeseosProvider } from './context/ListaDeseosContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <ListaDeseosProvider>
          <App />
        </ListaDeseosProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)
