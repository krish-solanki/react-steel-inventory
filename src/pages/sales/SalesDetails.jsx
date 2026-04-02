import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SalesDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [sale, setSale] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const saleRes = await axios.get(`http://localhost:5000/api/sales/${id}`);
      const itemsRes = await axios.get(`http://localhost:5000/api/sale-items/sale/${id}`);

      setSale(saleRes.data);
      setItems(itemsRes.data);

    };

    fetchData();

  }, [id]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.UnitPrice * item.Quantity,
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
          <strong>Customer:</strong> {sale.CustomerName}
        </div>

        <div className="col-md-6 text-end">
          <strong>Date:</strong> {formatDate(sale.SaleDate)}
        </div>

      </div>

      <table className="table table-bordered">

        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>Warehouse</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          {items.map((item) => (

            <tr key={item._id}>

              <td>{item.ProductId?.name}</td>

              <td>{item.WarehouseId?.name}</td>

              <td>₹{item.UnitPrice}</td>

              <td>{item.Quantity}</td>

              <td>₹{item.UnitPrice * item.Quantity}</td>

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
                <th>Payment Method:</th>
                <td>{sale.PaymentMethod}</td>
              </tr>

              {sale.TransactionId && (
                <tr>
                  <th>Transaction ID:</th>
                  <td>{sale.TransactionId}</td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );

};

export default SalesDetails;