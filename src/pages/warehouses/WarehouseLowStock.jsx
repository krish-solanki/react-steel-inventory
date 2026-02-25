const LowStock = () => {
  const data = [
    {
      warehouse: "Ahmedabad Store",
      sku: "ch",
      product: "Chair",
      minStock: 10,
      currentStock: 4,
    },
    {
      warehouse: "Ahmedabad Store",
      sku: "tab",
      product: "Table",
      minStock: 15,
      currentStock: 14,
    },
    {
      warehouse: "Main Store",
      sku: "tab",
      product: "Table",
      minStock: 15,
      currentStock: 1,
    },
    {
      warehouse: "Main Store",
      sku: "ch",
      product: "Chair",
      minStock: 10,
      currentStock: 10,
    },
  ];

  return (
    <div className="card border-0 shadow-sm p-4">

      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-semibold mb-1">
          Warehouse-Level Low Stock
        </h4>
        <div className="text-muted small">
          Products below minimum stock in specific warehouses
        </div>
      </div>

      {/* Table */}
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
                  <span
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}
                  >
                    LOW STOCK
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default LowStock;