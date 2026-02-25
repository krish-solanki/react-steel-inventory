import { useParams, useNavigate } from "react-router-dom";

const SalesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data (later we make dynamic)
  const quotation = {
    id: id,
    customer: "Taylor Furniture",
    date: "27/03/2024",
    products: [
      { name: "Metal Locker", price: 7500, qty: 1 },
      { name: "Steel Chair", price: 1500, qty: 5 }
    ],
    status: "Pending"
  };

  const subtotal = quotation.products.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;

  return (
    <div className="card shadow-sm p-4">

      <div className="d-flex justify-content-between mb-4">
        <h4>Customer Invoice</h4>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/sales")}
        >
          ← Back
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <strong>Customer:</strong> {quotation.customer}
        </div>
        <div className="col-md-6 text-end">
          <strong>Date:</strong> {quotation.date}
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
          {quotation.products.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.qty}</td>
              <td>₹{p.price * p.qty}</td>
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
                <th>Grand Total:</th>
                <td>₹{grandTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td>
                  <span className={`badge ${quotation.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}>
                    {quotation.status}
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

export default SalesDetails;