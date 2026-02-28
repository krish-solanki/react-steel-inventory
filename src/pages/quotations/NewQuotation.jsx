import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewQuotation = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [quotationDate, setQuotationDate] = useState("");
  const [rows, setRows] = useState([
    { product: "Metal Locker", price: 7500, quantity: 1 }
  ]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] =
      field === "product" ? value : Number(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!customerName) {
      setError("Customer name is required");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/quotations", {
        customerName,
        totalAmount: grandTotal,
        createdBy: "69a12394c48d62ce9d536b36"
      });

      alert("Quotation saved successfully");
      navigate("/quotation");

    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">New Quotation</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Customer</label>
            <input
              type="text"
              className="form-control"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={quotationDate}
              onChange={(e) => setQuotationDate(e.target.value)}
            />
          </div>
        </div>

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
                  <input
                    type="text"
                    className="form-control"
                    value={row.product}
                    onChange={(e) =>
                      handleChange(index, "product", e.target.value)
                    }
                  />
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

                <td>₹{row.price * row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          className="btn btn-outline-primary mb-4"
          onClick={addRow}
        >
          Add Row
        </button>

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

        <div className="text-end">
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #059669, #047857)",
              color: "#fff",
              padding: "8px 25px",
              borderRadius: "8px"
            }}
          >
            {loading ? "Saving..." : "Save Quotation"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewQuotation;