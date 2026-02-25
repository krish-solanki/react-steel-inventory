const StockAdjustment = () => {
  const adjustments = [
    {
      id: 1,
      date: "24-Feb-2026 11:27",
      product: "Chair",
      warehouse: "Main Store",
      type: "OUT",
      qty: 2,
      reason: "Sale",
      remarks: "",
      by: "admin"
    },
    {
      id: 2,
      date: "24-Feb-2026 11:11",
      product: "Table",
      warehouse: "Ahmedabad Store",
      type: "OUT",
      qty: 2,
      reason: "Sale",
      remarks: "",
      by: "admin"
    },
    {
      id: 3,
      date: "24-Feb-2026 11:04",
      product: "Table",
      warehouse: "Main Store",
      type: "OUT",
      qty: 1,
      reason: "Sell",
      remarks: "Initial stock",
      by: "admin"
    }
  ];

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
              {adjustments.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.product}</td>
                  <td>{item.warehouse}</td>

                  <td>
                    <span
                      className={`badge ${
                        item.type === "OUT"
                          ? "bg-danger"
                          : "bg-success"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td>{item.qty}</td>
                  <td>{item.reason}</td>
                  <td>{item.remarks || "-"}</td>
                  <td>{item.by}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default StockAdjustment;