import { createContext, useContext, useState, useEffect } from "react"

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Recuperar desde localStorage al cargar
    const stored = localStorage.getItem("wishlist")
    return stored ? JSON.parse(stored) : []
  })

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  // ✅ Agregar o quitar producto de favoritos
  const toggleWishlist = (producto) => {
    setWishlist((prev) => {
      const existe = prev.find((p) => p.sku === producto.sku)
      if (existe) {
        return prev.filter((p) => p.sku !== producto.sku)
      } else {
        return [...prev, producto]
      }
    })
  }

  const isInWishlist = (sku) => wishlist.some((p) => p.sku === sku)

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
