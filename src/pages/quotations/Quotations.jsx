import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Quotations = () => {
  const navigate = useNavigate();

  const [quotations, setQuotations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quotations");
        setQuotations(res.data);
      } catch {
        setError("Failed to load quotations");
      }
    };

    fetchQuotations();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div className="card shadow-sm p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Quotations</h4>

        <button
          className="btn"
          style={{
            background: "linear-gradient(135deg, #059669, #047857)",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: "8px"
          }}
          onClick={() => navigate("/quotation/add")}
        >
          <i className="fa fa-plus me-2"></i>
          New Quotation
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {!error && (
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {quotations.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Quotations not found
                </td>
              </tr>
            ) : (
              quotations.map((q) => (
                <tr
                  key={q._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/quotation/${q._id}`)}
                >
                  <td>{formatDate(q.QuotationDate)}</td>
                  <td>{q.CustomerName}</td>
                  <td>₹{q.TotalAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        q.Status === "Approved"
                          ? "bg-success"
                          : q.Status === "Draft"
                          ? "bg-secondary"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {q.Status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

    </div>
  );
};

export default Quotations;