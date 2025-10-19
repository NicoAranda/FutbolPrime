import { createContext, useContext, useState, useEffect } from "react"

const ListaDeseosContext = createContext()

export const ListaDeseosProvider = ({ children }) => {
  const [listaDeseos, setListaDeseos] = useState(() => {
    const guardado = localStorage.getItem("listaDeseos")
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem("listaDeseos", JSON.stringify(listaDeseos))
  }, [listaDeseos])

  const alternarListaDeseos = (producto) => {
    setListaDeseos((prev) => {
      const existe = prev.find((p) => p.sku === producto.sku)
      if (existe) {
        return prev.filter((p) => p.sku !== producto.sku)
      } else {
        return [...prev, producto]
      }
    })
  }

  const estaEnListaDeseos = (sku) => listaDeseos.some((p) => p.sku === sku)

  return (
    <ListaDeseosContext.Provider
      value={{ listaDeseos, alternarListaDeseos, estaEnListaDeseos }}
    >
      {children}
    </ListaDeseosContext.Provider>
  )
}

export const useListaDeseos = () => useContext(ListaDeseosContext)
