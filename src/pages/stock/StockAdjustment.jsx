import { useEffect, useState } from "react";
import axios from "axios";

const StockAdjustment = () => {

  const [adjustments, setAdjustments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdjustments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/stock-adjustments"
        );

        console.log("DATA:", res.data); // debug

        setAdjustments(res.data);

      } catch {
        setError("Failed to load stock adjustments");
      }
    };

    fetchAdjustments();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-GB");
  };

  return (
    <div className="card shadow-sm border-0 p-4">

      <h4 className="mb-4">Stock Adjustment History</h4>

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

              {adjustments.map((item) => (
                <tr key={item._id}>

                  <td>{formatDate(item.adjustedAt)}</td>

                  <td>{item.productId?.name}</td>

                  <td>{item.warehouseId?.name}</td>

                  <td>
                    <span className={`badge ${
                      item.adjustmentType === "OUT"
                        ? "bg-danger"
                        : "bg-success"
                    }`}>
                      {item.adjustmentType}
                    </span>
                  </td>

                  <td>{item.quantity}</td>

                  <td>{item.reason}</td>

                  <td>
                    {item.adjustedBy?.fullName || "Unknown"}
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

export default StockAdjustment;