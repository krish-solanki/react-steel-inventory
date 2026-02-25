import { useNavigate } from "react-router-dom";

const Sales = () => {
  const navigate = useNavigate();

  const salesData = [
    {
      id: 3,
      customer: "ayush",
      date: "24-02-2026 11:27:47 AM",
      total: 5000,
    },
    {
      id: 2,
      customer: "ayush 2",
      date: "24-02-2026 11:11:36 AM",
      total: 8000,
    },
    {
      id: 1,
      customer: "ayush",
      date: "24-02-2026 11:02:36 AM",
      total: 4000,
    },
  ];

  return (
    <div className="card border-0 shadow-sm p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold mb-0">Sales</h4>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/sales/add")}
        >
          <i className="fa fa-plus me-2"></i>
          Create Sale
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">

          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>

          <tbody>
            {salesData.map((sale) => (
              <tr
                key={sale.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/sales/${sale.id}`)}
              >
                <td>#{sale.id}</td>
                <td>{sale.customer}</td>
                <td>{sale.date}</td>
                <td className="text-end fw-semibold">
                  ₹ {sale.total.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Sales;