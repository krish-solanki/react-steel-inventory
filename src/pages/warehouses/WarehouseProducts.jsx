import { useParams, useNavigate } from "react-router-dom";

const WarehouseProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Steel Chair", stock: 20, price: 1200, warehouseId: 1 },
    { id: 2, name: "Steel Table", stock: 25, price: 2500, warehouseId: 1 },
    { id: 3, name: "Iron Rack", stock: 10, price: 1800, warehouseId: 2 }
  ];

  const filteredProducts = products.filter(
    (product) => product.warehouseId === parseInt(id)
  );

  const handleEdit = (productId) => {
    navigate(`/warehouses/${id}/product/${productId}`);
  };

  const handleAddProduct = () => {
    navigate(`/warehouses/${id}/add-product`);
  };

  return (
    <div className="container-fluid">

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Warehouse Products</h4>

        <button
          className="btn btn-primary"
          onClick={handleAddProduct}
        >
          <i className="fa fa-plus me-2"></i>
          Add Product
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

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
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/warehouses")}
          >
            Back to Warehouses
          </button>

        </div>
      </div>
    </div>
  );
};

export default WarehouseProducts;