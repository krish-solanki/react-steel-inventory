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
    <div className="card p-4">
      <h4>Warehouses</h4>

      <table className="table">
        <thead>
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
  );
};

export default Warehouses;
