import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";

export const AdminLayout = () => {
  return (
    <div className="d-flex">
      <SideBar />
      <main className="flex-grow-1 p-4">
        <Outlet /> 
      </main>
    </div>
  );
};
