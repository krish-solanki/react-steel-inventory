import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewQuotation = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [quotationDate, setQuotationDate] = useState("");

  const [products, setProducts] = useState([]);

  const [rows, setRows] = useState([
    { productId: "", price: 0, quantity: 1 }
  ]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...rows];

    if (field === "productId") {
      const selectedProduct = products.find(p => p._id === value);

      updated[index].productId = value;
      updated[index].price = selectedProduct?.sellingPrice || 0;
    } else {
      updated[index][field] = Number(value);
    }

    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { productId: "", price: 0, quantity: 1 }]);
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
    setLoading(true);

    try {

      const quotationRes = await axios.post(
        "http://localhost:5000/api/quotations",
        {
          CustomerName: customerName,
          QuotationDate: quotationDate,
          TotalAmount: grandTotal,
          CreatedBy: "69a12394c48d62ce9d536b36"
        }
      );

      const quotationId = quotationRes.data.quotation._id;

      const itemRequests = rows.map(row =>
        axios.post("http://localhost:5000/api/quotation-items", {
          QuotationId: quotationId,
          ProductId: row.productId,
          Quantity: row.quantity,
          UnitPrice: row.price
        })
      );

      await Promise.all(itemRequests);

      alert("Quotation saved successfully");

      navigate("/quotations");

    } catch (err) {
      console.error(err);
      setError("Failed to save quotation");
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
                  <select
                    className="form-select"
                    value={row.productId}
                    onChange={(e) =>
                      handleChange(index, "productId", e.target.value)
                    }
                  >
                    <option value="">Select Product</option>

                    {products.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}

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