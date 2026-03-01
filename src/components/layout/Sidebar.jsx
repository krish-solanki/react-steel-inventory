import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "nav-link rounded mb-2 px-3 py-2 bg-primary text-white"
      : "nav-link text-light rounded mb-2 px-3 py-2";

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#1f2937",
        color: "white",
        minHeight: "100vh",
      }}
      className="d-flex flex-column"
    >
      <div className="p-4 fs-5 fw-bold border-bottom">
        SteelInventory
      </div>

      <nav className="nav flex-column mt-3">

        <NavLink to="/dashboard" className={linkClass}>
          <i className="fa-solid fa-house me-2"></i>
          Dashboard
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          <i className="fa-solid fa-box me-2"></i>
          Products
        </NavLink>

        <NavLink to="/warehouse" className={linkClass}>
          <i className="fa-solid fa-warehouse me-2"></i>
          Warehouses
        </NavLink>

        <NavLink to="/quotation" className={linkClass}>
          <i className="fa-solid fa-file-lines me-2"></i>
          Quotations
        </NavLink>

        <NavLink to="/stock_adj" className={linkClass}>
          <i className="fa-solid fa-right-left me-2"></i>
          Adjust Stock
        </NavLink>

        <NavLink to="/low-stock" className={linkClass}>
          <i className="fa-solid fa-arrow-right-arrow-left me-2"></i>
          Warehouse Stock
        </NavLink>

        <NavLink to="/sales" className={linkClass}>
          <i className="fa-solid fa-chart-line me-2"></i>
          Sales
        </NavLink>

        <NavLink to="login" className="nav-link text-light rounded mb-2 px-3 py-2">
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          Logout
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;