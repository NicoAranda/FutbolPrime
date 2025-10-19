import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SideBar } from '../components/SideBar'

describe('SideBar', () => {
    it('se ven los links correctamente', () => {
        render(
            <MemoryRouter>
                <SideBar />
            </MemoryRouter>
        )
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Productos')).toBeInTheDocument()
        expect(screen.getByText('Pedidos')).toBeInTheDocument()
    })
})