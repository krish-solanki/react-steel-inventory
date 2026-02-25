import { useNavigate } from "react-router-dom";

const Warehouses = () => {
  const navigate = useNavigate();

  const warehouses = [
    { id: 1, name: "Main Warehouse", location: "Bangalore", items: 45 },
    { id: 2, name: "Secondary Warehouse", location: "Mumbai", items: 20 }
  ];

  return (
    <div className="card shadow-sm p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Warehouses</h4>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/warehouse/add")}
        >
          <i className="fa fa-plus me-2"></i>
          Add Warehouse
        </button>
      </div>

      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((w) => (
            <tr
              key={w.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/warehouse/${w.id}`)}
            >
              <td>{w.name}</td>
              <td>{w.location}</td>
              <td>{w.items}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Warehouses;