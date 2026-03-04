import { useEffect, useState } from "react";
import axios from "axios";

const LowStock = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/product-warehouse-stock/low-stock"
        );
        setData(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load low stock"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLowStock();
  }, []);

  const getStatus = (minStock, currentStock) => {
    if (currentStock === 0) {
      return { label: "CRITICAL", class: "bg-dark" };
    }

    const percentage = (currentStock / minStock) * 100;

    if (percentage <= 50) {
      return { label: "LOW STOCK", class: "bg-danger" };
    }

    return { label: "WARNING", class: "bg-warning text-dark" };
  };

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

      {loading && <p>Loading low stock...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Low Stock Found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => {
                  const status = getStatus(
                    item.minStock,
                    item.currentStock
                  );

                  return (
                    <tr key={index}>
                      <td>{item.warehouse}</td>
                      <td>{item.sku}</td>
                      <td>{item.product}</td>
                      <td>{item.minStock}</td>
                      <td>{item.currentStock}</td>
                      <td>
                        <span
                          className={`badge ${status.class}`}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LowStock;