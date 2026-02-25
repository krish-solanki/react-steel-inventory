import { useParams, useNavigate } from "react-router-dom";

const WarehouseProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Steel Chair", stock: 20, price: 1200, warehouseId: 1 },
    { id: 2, name: "Steel Table", stock: 25, price: 2500, warehouseId: 1 },
    { id: 3, name: "Iron Rack", stock: 10, price: 1800, warehouseId: 2 }
  ];

  const filtered = products.filter(
    (p) => p.warehouseId === parseInt(id)
  );

  return (
    <div className="card shadow-sm p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Warehouse Products</h4>

        <button
          className="btn btn-primary px-4"
          onClick={() => navigate(`/warehouse/${id}/add-product`)}
        >
          <i className="fa fa-plus me-2"></i>
          Add Product
        </button>
      </div>

      {/* Table */}
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>₹{p.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    navigate(`/warehouse/${id}/product/${p.id}`)
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Back Button Right Side */}
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-outline-secondary px-4"
          onClick={() => navigate("/warehouse")}
        >
          <i className="fa fa-arrow-left me-2"></i>
          Back
        </button>
      </div>

    </div>
  );
};

export default WarehouseProducts;