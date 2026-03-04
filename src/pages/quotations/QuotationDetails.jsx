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
    const fetchData = async () => {
      try {

        const quotationRes = await axios.get(
          `http://localhost:5000/api/quotations/${id}`
        );

        const itemsRes = await axios.get(
          `http://localhost:5000/api/quotation-items/quotation/${id}`
        );

        setQuotation(quotationRes.data);
        setItems(itemsRes.data);

      } catch (err) {
        console.error("Failed to load quotation", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
          onClick={() => navigate("/quotations")}
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
          {items.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            items.map((p) => (
              <tr key={p._id}>
                <td>{p.ProductId?.name}</td>
                <td>₹{p.UnitPrice}</td>
                <td>{p.Quantity}</td>
                <td>₹{p.UnitPrice * p.Quantity}</td>
              </tr>
            ))
          )}
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
                <th>Grand Total:</th>
                <td>₹{grandTotal.toFixed(2)}</td>
              </tr>

              <tr>
                <th>Status:</th>
                <td>
                  <span
                    className={`badge ${
                      quotation.Status === "Approved"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {quotation.Status}
                  </span>
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