import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi } from "vitest"
import { Header } from "../components/Header"

<<<<<<< Updated upstream

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cart: [],
  }),
}))

=======
>>>>>>> Stashed changes
vi.mock("../context/ListaDeseosContext", () => ({
  useListaDeseos: () => ({
    listaDeseos: [],
  }),
}))

describe("Header", () => {
  it("logo y título correctos", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText(/Fútbol Prime/i)).toBeInTheDocument()
    const logo = screen.getByRole("img", { name: /Fútbol Prime Logo/i })
    expect(logo).toBeInTheDocument()
  })

  it("muestra enlaces", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText(/Inicio/i)).toBeInTheDocument()
    expect(screen.getByText(/Nosotros/i)).toBeInTheDocument()
    expect(screen.getByText(/Camisetas/i)).toBeInTheDocument()
  })
})
