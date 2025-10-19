// main.jsx
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx' // ✅ Import correcto
import { WishlistProvider } from './context/WishlistContext.jsx' // ✅ Import correcto

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
      <App />
      </WishlistProvider>
    </CartProvider> 
  </BrowserRouter>
)
