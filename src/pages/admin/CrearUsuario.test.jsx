import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { CrearUsuario } from "./CrearUsuario"

describe("CrearUsuario", () => {
  it("renderiza correctamente el formulario y sus campos principales", () => {
    render(<CrearUsuario />)

    expect(screen.getByText("Crear Nuevo Usuario")).toBeInTheDocument()
    expect(screen.getByLabelText("ID")).toBeInTheDocument()
    expect(screen.getByLabelText("Nombre Completo")).toBeInTheDocument()
    expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument()
    expect(screen.getByLabelText("Rol")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Guardar Usuario/i })).toBeInTheDocument()
  })

  it("muestra un alert al enviar un formulario válido", () => {
    const mockAlert = vi.spyOn(window, "alert").mockImplementation(() => {})

    render(<CrearUsuario />)

    fireEvent.change(screen.getByLabelText("ID"), { target: { value: "1" } })
    fireEvent.change(screen.getByLabelText("Nombre Completo"), { target: { value: "Juan Pérez" } })
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), { target: { value: "juan@example.com" } })
    fireEvent.change(screen.getByLabelText("Rol"), { target: { value: "Administrador" } })

    const form = document.getElementById("formCrearUsuario")
    form.checkValidity = vi.fn(() => true)

    fireEvent.submit(form)

    expect(mockAlert).toHaveBeenCalledWith("Usuario creado correctamente")
    mockAlert.mockRestore()
  })
})
