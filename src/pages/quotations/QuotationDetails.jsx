import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const QuotationDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [quotation, setQuotation] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [quotationRes, itemsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/quotations/${id}`),
        axios.get(`http://localhost:5000/api/quotation-items/quotation/${id}`)
      ]);

      setQuotation(quotationRes.data);
      setItems(itemsRes.data);

    } catch{
      console.error("API failed, using fallback data");

      setQuotation({
        _id: id,
        CustomerName: "Demo Customer",
        QuotationDate: new Date(),
        Status: "Draft"
      });

      setItems([
        {
          _id: "1",
          ProductId: { name: "Chair" },
          Quantity: 2,
          UnitPrice: 2000
        },
        {
          _id: "2",
          ProductId: { name: "Table" },
          Quantity: 1,
          UnitPrice: 8000
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/quotations/${id}`,
        { Status: status }
      );

      setQuotation(res.data);

    } catch{
      console.warn("API update failed → updating locally");

      setQuotation(prev => ({
        ...prev,
        Status: status
      }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quotation) return <p>Quotation not found</p>;

  const subtotal = items.reduce(
    (sum, p) => sum + p.UnitPrice * p.Quantity,
    0
  );

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div className="card shadow-sm p-4">

      <div className="d-flex justify-content-between mb-4">
        <h4>Quotation Details</h4>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/quotation")}
        >
          ← Back
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <strong>Customer:</strong> {quotation.CustomerName}
        </div>

        <div className="col-md-6 text-end">
          <strong>Date:</strong> {formatDate(quotation.QuotationDate)}
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((p) => (
            <tr key={p._id}>
              <td>{p.ProductId?.name || "-"}</td>
              <td>₹{p.UnitPrice}</td>
              <td>{p.Quantity}</td>
              <td>₹{p.UnitPrice * p.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row justify-content-end mt-4">
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
                <th>Total:</th>
                <td>₹{grandTotal.toFixed(2)}</td>
              </tr>

              <tr>
                <th>Status:</th>
                <td>
                  <span className={`badge ${
                    quotation.Status === "Approved"
                      ? "bg-success"
                      : quotation.Status === "Rejected"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}>
                    {quotation.Status}
                  </span>
                </td>
              </tr>

              <tr>
                <th>Update:</th>
                <td>
                  <select
                    className="form-select"
                    value={quotation.Status}
                    onChange={(e) => updateStatus(e.target.value)}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
};

export default QuotationDetails;