import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { AgregarProductoPage } from "./AgregarProductoPage"

describe("AgregarProductoPage", () => {
  it("renderiza correctamente el formulario con sus campos principales", () => {
    render(<AgregarProductoPage />)

    expect(screen.getByText("Agregar Producto")).toBeInTheDocument()
    expect(screen.getByLabelText("SKU")).toBeInTheDocument()
    expect(screen.getByLabelText("Nombre del Producto")).toBeInTheDocument()
    expect(screen.getByLabelText("Precio")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Guardar Producto/i })).toBeInTheDocument()
  })

  it("muestra un alert al enviar un formulario válido", () => {
    const mockAlert = vi.spyOn(window, "alert").mockImplementation(() => {})

    render(<AgregarProductoPage />)

    // Rellenar campos requeridos
    fireEvent.change(screen.getByLabelText("SKU"), { target: { value: "PLT123" } })
    fireEvent.change(screen.getByLabelText("Nombre del Producto"), { target: { value: "Balón Adidas" } })
    fireEvent.change(screen.getByLabelText("Stock"), { target: { value: "10" } })
    fireEvent.change(screen.getByLabelText("Precio"), { target: { value: "19990" } })
    fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: "Balón oficial del mundial" } })

    const fileInput = screen.getByLabelText("Imagen del Producto")
    const fakeFile = new File(["foto"], "balon.png", { type: "image/png" })
    fireEvent.change(fileInput, { target: { files: [fakeFile] } })

    // Simular envío del formulario directamente
    const form = document.getElementById("formAgregarProducto")
    form.checkValidity = vi.fn(() => true) // fuerza formulario válido
    fireEvent.submit(form)

    expect(mockAlert).toHaveBeenCalledWith("Producto agregado correctamente")
    mockAlert.mockRestore()
  })
})
