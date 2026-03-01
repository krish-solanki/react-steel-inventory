import { useEffect, useState } from "react";
import axios from "axios";

const StockAdjustment = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdjustments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/stock-adjustments"
        );
        setAdjustments(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stock adjustments");
      } finally {
        setLoading(false);
      }
    };

    fetchAdjustments();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-GB");
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

        {loading && <p>Loading adjustments...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
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
                  <th>Remarks</th>
                  <th>Adjusted By</th>
                </tr>
              </thead>

              <tbody>
                {adjustments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No stock adjustments found
                    </td>
                  </tr>
                ) : (
                  adjustments.map((item) => (
                    <tr key={item._id}>
                      <td>{formatDate(item.adjustedAt)}</td>
                      <td>{item.productId?.name}</td>
                      <td>{item.warehouseId?.name}</td>

                      <td>
                        <span
                          className={`badge ${
                            item.adjustmentType === "Decrease"
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {item.adjustmentType}
                        </span>
                      </td>

                      <td>{item.quantity}</td>
                      <td>{item.reason}</td>
                      <td>{item.remarks || "-"}</td>
                      <td>{item.adjustedBy?.name}</td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAdjustment;