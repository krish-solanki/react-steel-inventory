import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1 bg-light">
        <Topbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Layout;