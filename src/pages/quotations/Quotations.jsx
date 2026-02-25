import { useNavigate } from "react-router-dom";

const Quotations = () => {
  const navigate = useNavigate();

  const quotations = [
    {
      id: 1,
      date: "27/03/2024",
      customer: "Taylor Furniture",
      total: 15000,
      status: "Pending"
    },
    {
      id: 2,
      date: "30/03/2024",
      customer: "Global Industries",
      total: 32500,
      status: "Approved"
    }
  ];

  return (
    <div className="card shadow-sm p-4">

      {/* Header Section */}
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

      {/* Table */}
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
          {quotations.map((q) => (
            <tr
              key={q.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/quotation/${q.id}`)}
            >
              <td>{q.date}</td>
              <td>{q.customer}</td>
              <td>₹{q.total}</td>
              <td>
                <span
                  className={`badge ${
                    q.status === "Approved"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {q.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Quotations;
