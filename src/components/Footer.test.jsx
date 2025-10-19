import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import { Footer } from "../components/Footer"

describe("Footer Component", () => {

  it("muestra los enlaces de productos y ayuda", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    const links = ["Iniciar Sesión", "Camisetas", "Balones", "Accesorios"]
    links.forEach((link) => {
      expect(screen.getByText(new RegExp(link, "i"))).toBeInTheDocument()
    })
  })

  it("muestra íconos de redes sociales y derechos reservados", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/Facebook/i)).toBeInTheDocument()
    expect(screen.getByAltText(/Instagram/i)).toBeInTheDocument()
    expect(screen.getByAltText(/TikTok/i)).toBeInTheDocument()
    expect(
      screen.getByText(/© 2025 Fútbol Prime - Todos los derechos reservados/i)
    ).toBeInTheDocument()
  })
})
