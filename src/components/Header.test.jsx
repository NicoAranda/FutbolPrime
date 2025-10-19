import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import { Header } from "../components/Header"

// 🧠 Mock del hook personalizado (para evitar error)
vi.mock("../context/WishlistContext", () => ({
  useWishlist: () => ({
    wishlist: [], // simulamos una lista vacía
  }),
}))

describe("Header", () => {
  it("logo y título correctos", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // Verifica texto y logo
    expect(screen.getByText(/Fútbol Prime/i)).toBeInTheDocument()
    const logo = screen.getByRole("img", { name: /Fútbol Prime/i })
    expect(logo).toBeInTheDocument()
  })

  it("muestra enlaces de navegación", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const links = ["Inicio", "Balones", "Camisetas", "Accesorios"]
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })
})
