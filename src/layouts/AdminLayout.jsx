import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <SideBar />
      <main className="content-admin">
        <Outlet />
      </main>
    </div>

  );
};
