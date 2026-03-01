import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("products") && path.includes("add")) return "Add Product";
    if (path.includes("products")) return "Products";
    if (path.includes("warehouse")) return "Warehouses";
    if (path.includes("quotation")) return "Quotations";
    if (path.includes("stock_adj")) return "Adjust Stock";
    if (path.includes("low-stock")) return "Warehouse Stock";
    if (path.includes("sales")) return "Sales";

    return "Dashboard";
  };

  const adminName = "Admin";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Right Section */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Top Bar */}
        <div
          style={{
            height: "60px",
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 25px"
          }}
        >
          {/* Dynamic Page Title */}
          <h5 className="mb-0 fw-semibold">
            {getPageTitle()}
          </h5>

          {/* Right Side */}
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-user-circle fs-5 me-2"></i>
              <span style={{ fontWeight: "500" }}>{adminName}</span>
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px", background: "#f8f9fa" }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;