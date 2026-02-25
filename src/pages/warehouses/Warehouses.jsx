import { useNavigate } from "react-router-dom";

const Warehouses = () => {
  const navigate = useNavigate();

  const warehouses = [
    { id: 1, name: "Main Warehouse", location: "Bangalore", items: 45 }
  ];

  const handleClick = (id) => {
    navigate(`/warehouse/product/${id}`);
  };

  return (
    <div className="card shadow-sm border-0 p-4">

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Warehouses</h4>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/warehouse/add")}
        >
          <i className="fa fa-plus me-2"></i>
          Add Warehouse
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr
                key={warehouse.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(warehouse.id)}
              >
                <td>{warehouse.name}</td>
                <td>{warehouse.location}</td>
                <td>{warehouse.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Warehouses;