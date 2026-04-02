import { useEffect, useState } from "react";
import axios from "axios";

const LowStock = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/product-warehouse-stock/low-stock"
        );
        setData(res.data);
      } catch {
        setError("Failed to load low stock");
      }
    };

    fetchLowStock();
  }, []);

  return (
    <div className="card border-0 shadow-sm p-4">
      <div className="mb-4">
        <h4 className="fw-semibold mb-1">
          Warehouse-Level Low Stock
        </h4>
        <div className="text-muted small">
          Products below minimum stock in specific warehouses
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {!error && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>Warehouse</th>
                <th>SKU</th>
                <th>Product</th>
                <th>Minimum Stock</th>
                <th>Current Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.warehouse}</td>
                  <td>{item.sku}</td>
                  <td>{item.product}</td>
                  <td>{item.minStock}</td>
                  <td>{item.currentStock}</td>
                  <td>
                    <span className="badge bg-danger">
                      LOW STOCK
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default LowStock;