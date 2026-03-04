import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewSales = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [rows, setRows] = useState([
    { productId: "", warehouseId: "", price: 0, quantity: 1 }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] =
      field === "price" || field === "quantity"
        ? Number(value)
        : value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { productId: "", warehouseId: "", price: 0, quantity: 1 }
    ]);
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

    const formattedItems = rows.map((row) => ({
      ProductId: row.productId,
      WarehouseId: row.warehouseId,
      Quantity: row.quantity,
      UnitPrice: row.price
    }));

    const payload = {
      CustomerName: customerName,
      TotalAmount: grandTotal,
      items: formattedItems
    };

    try {
      const response = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sale Created Successfully");
        navigate("/sales");
      } else {
        alert(data.message || "Error creating sale");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">New Sales</h4>

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
            <input type="date" className="form-control" />
          </div>
        </div>

        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Product ID</th>
              <th>Warehouse ID</th>
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
                    value={row.productId}
                    onChange={(e) =>
                      handleChange(index, "productId", e.target.value)
                    }
                    required
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.warehouseId}
                    onChange={(e) =>
                      handleChange(index, "warehouseId", e.target.value)
                    }
                    required
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
            style={{
              background: "linear-gradient(135deg, #059669, #047857)",
              color: "#fff",
              padding: "8px 25px",
              borderRadius: "8px"
            }}
          >
            Save Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSales;