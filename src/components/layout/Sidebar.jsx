import { NavLink } from "react-router-dom";

const Sidebar = () => {
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

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-white bg-primary"
              : "nav-link text-light"
          }
        >
          Dashboard
        </NavLink>
<NavLink
  to="/products"
  className={({ isActive }) =>
    isActive
      ? "nav-link rounded mb-2 px-3 py-2 bg-primary text-white"
      : "nav-link text-light rounded mb-2 px-3 py-2"
  }
>
  <i className="fa-solid fa-box-open me-2"></i>
  Products
</NavLink>

        <NavLink
          to="/warehouses"
          className="nav-link text-light"
        >
          Warehouses
        </NavLink>

        <NavLink
          to="/quotations"
          className="nav-link text-light"
        >
          Quotations
        </NavLink>

      </nav>
    </div>
  );
};
export default Sidebar;