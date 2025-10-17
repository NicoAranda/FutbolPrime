import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Aquí se renderizan las páginas públicas */}
      </main>
      <Footer />
    </>
  );
};
