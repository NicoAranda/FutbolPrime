import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  // 🛒 Agregar producto
  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.sku === producto.sku);
      if (existe) {
        return prevCart.map((item) =>
          item.sku === producto.sku
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  // ❌ Eliminar producto
  const removeFromCart = (sku) => {
    setCart((prevCart) => prevCart.filter((item) => item.sku !== sku));
  };

  // 🔢 Actualizar cantidad
  const updateQuantity = (sku, cantidad) => {
    if (cantidad <= 0) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.sku === sku ? { ...item, cantidad } : item
      )
    );
  };

  // 🧹 Vaciar carrito
  const clearCart = () => setCart([]);

  // 🎟️ Aplicar cupón
  const applyCoupon = (code) => {
    const coupons = { DESCUENTO10: 0.1, FUTBOL20: 0.2 };
    if (coupons[code]) {
      setDiscount(coupons[code]);
      alert(`Cupón "${code}" aplicado con éxito.`);
    } else {
      alert("Cupón no válido.");
    }
  };

  // 💰 Totales
  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const finalTotal = total - total * discount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        clearCart,
        total,
        discount: total * discount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
