import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewQuotation = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { product: "Metal Locker", price: 7500, quantity: 1 }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = field === "product"
      ? value
      : Number(value);
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { product: "", price: 0, quantity: 1 }]);
  };

  const subtotal = rows.reduce(
    (sum, row) => sum + row.price * row.quantity,
    0
  );

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quotation Data:", rows);
    navigate("/quotation");
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">New Quotation</h4>

      <form onSubmit={handleSubmit}>

        {/* Customer + Date */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Customer</label>
            <select className="form-select">
              <option>Taylor Furniture</option>
              <option>Global Industries</option>
              <option>Eureka Furnishings</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" />
          </div>
        </div>

        {/* Products Table */}
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="form-select"
                    value={row.product}
                    onChange={(e) =>
                      handleChange(index, "product", e.target.value)
                    }
                  >
                    <option value="">Select Product</option>
                    <option value="Metal Locker">Metal Locker</option>
                    <option value="Steel Chair">Steel Chair</option>
                  </select>
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={row.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={row.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                  />
                </td>

                <td>
                  ₹{row.price * row.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row */}
        <button
          type="button"
          className="btn btn-outline-primary mb-4"
          onClick={addRow}
        >
          <i className="fa fa-plus me-2"></i>Add Row
        </button>

        {/* Totals Section */}
        <div className="row justify-content-end">
          <div className="col-md-4">

            <table className="table">
              <tbody>
                <tr>
                  <th>Subtotal:</th>
                  <td>₹{subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>CGST (9%):</th>
                  <td>₹{cgst.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>SGST (9%):</th>
                  <td>₹{sgst.toFixed(2)}</td>
                </tr>
                <tr className="fw-bold">
                  <th>Grand Total:</th>
                  <td>₹{grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        {/* Save Button */}
        <div className="text-end">
            <button
                type="submit"
                className="btn"
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  color: "#fff",
                  padding: "8px 25px",
                  borderRadius: "8px"
                }}
              >
                <i className="fa fa-save me-2"></i>
                Save Quotation
            </button>
        </div>

      </form>
    </div>
  );
};

export default NewQuotation;