import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi } from "vitest"
import { Card } from "../components/Card"


vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    addToCart: vi.fn(),
  }),
}))

vi.mock("../context/ListaDeseosContext", () => ({
  useListaDeseos: () => ({
    alternarListaDeseos: vi.fn(),
    estaEnListaDeseos: () => false,
  }),
}))


vi.mock("../components/ToastNotification", () => ({
  ToastNotification: () => <div data-testid="toast">Toast Mock</div>,
}))

describe("Card Component", () => {
  const producto = {
    sku: "ABC123",
    nombre: "Camiseta Barcelona",
    tipo: "Camiseta",
    precio: 39990,
    oferta: 49990,
    imagen: "/img/camiseta.png",
  }

  it("renderiza correctamente la información del producto", () => {
    render(
      <MemoryRouter>
        <Card producto={producto} />
      </MemoryRouter>
    )

    expect(screen.getByText("Camiseta Barcelona")).toBeInTheDocument()
    expect(screen.getByText("Camiseta")).toBeInTheDocument()
    expect(screen.getByText("$39.990")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: /Camiseta Barcelona/i })).toBeInTheDocument()
  })
})
