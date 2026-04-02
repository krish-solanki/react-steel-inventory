import { useEffect, useState } from "react";
import axios from "axios";

const StockAdjustment = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [error, setError] = useState("");

useEffect(() => {

  const loadData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/stock-adjustments"
      );
      setAdjustments(res.data);
    } catch {
      setError("Failed to load stock adjustments");
    }
  };

  loadData();

  const interval = setInterval(loadData, 5000);

  return () => clearInterval(interval);

}, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN");
  };

  const getStatus = (type) => {
    if (type === "OUT") {
      return { label: "Decrease", class: "bg-danger" };
    }
    return { label: "Increase", class: "bg-success" };
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">

        <div className="mb-4">
          <h4 className="fw-bold mb-1">
            Stock Adjustment History
          </h4>
          <p className="text-muted mb-0">
            Track all inventory corrections
          </p>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {!error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Warehouse</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Reason</th>
                  <th>Adjusted By</th>
                </tr>
              </thead>

              <tbody>
                {adjustments.map((item) => {
                  const status = getStatus(item.adjustmentType);

                  return (
                    <tr key={item._id}>
                      <td>{formatDate(item.adjustedAt)}</td>
                      <td>{item.productId?.name}</td>
                      <td>{item.warehouseId?.name}</td>

                      <td>
                        <span className={`badge ${status.class}`}>
                          {status.label}
                        </span>
                      </td>

                      <td>{item.quantity}</td>
                      <td>{item.reason}</td>
                      <td>{item.adjustedBy?.name}</td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default StockAdjustment;