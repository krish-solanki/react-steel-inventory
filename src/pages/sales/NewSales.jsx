import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewSales = () => {

  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");

  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [rows, setRows] = useState([
    { productId: "", warehouseId: "", price: 0, quantity: 1 }
  ]);

  useEffect(() => {

    const fetchProducts = async () => {

      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      setProducts(data);

    };

    const fetchWarehouses = async () => {

      const res = await fetch("http://localhost:5000/api/warehouses");
      const data = await res.json();

      setWarehouses(data);

    };

    fetchProducts();
    fetchWarehouses();

  }, []);

  const handleChange = (index, field, value) => {

    const updated = [...rows];

    if (field === "productId") {

      const selectedProduct = products.find(p => p._id === value);

      updated[index].productId = value;
      updated[index].price = selectedProduct?.sellingPrice || 0;

    } else {

      updated[index][field] =
        field === "price" || field === "quantity"
          ? Number(value)
          : value;

    }

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

    try {

      const saleResponse = await fetch(
        "http://localhost:5000/api/sales",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            CustomerName: customerName,
            TotalAmount: grandTotal,
            PaymentMethod: "Cash"
          })
        }
      );

      const saleData = await saleResponse.json();

      if (!saleResponse.ok) {

        alert(saleData.message);
        return;

      }

      const saleId = saleData.sale._id;

      for (const row of rows) {

        await fetch("http://localhost:5000/api/sale-items", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            SaleId: saleId,
            ProductId: row.productId,
            WarehouseId: row.warehouseId,
            Quantity: row.quantity,
            UnitPrice: row.price

          })

        });

      }

      alert("Sale Created Successfully");

      navigate("/sales");

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
              <th>Product</th>
              <th>Warehouse</th>
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
                    required
                  >

                    <option value="">Select Product</option>

                    {products.map(p => (

                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>

                    ))}

                  </select>

                </td>

                <td>

                  <select
                    className="form-select"
                    value={row.warehouseId}
                    onChange={(e) =>
                      handleChange(index, "warehouseId", e.target.value)
                    }
                    required
                  >

                    <option value="">Select Warehouse</option>

                    {warehouses.map(w => (

                      <option key={w._id} value={w._id}>
                        {w.name}
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