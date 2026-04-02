import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewSales = () => {

  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);

  const [rows, setRows] = useState([
    { productId: "", price: 0, quantity: 1 }
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/warehouses")
      .then(res => res.json())
      .then(data => setWarehouses(data));
  }, []);

  const loadWarehouseProducts = async (id) => {

    setWarehouseId(id);
    if (!id) return;

    const res = await fetch(
      `http://localhost:5000/api/product-warehouse-stock/warehouse/${id}`
    );

    const data = await res.json();
    setProducts(data);
  };

  const handleChange = (index, field, value) => {

    const updated = [...rows];

    if (field === "productId") {

      const product = products.find(
        p => p.productId._id === value
      );

      updated[index].productId = value;
      updated[index].price = product?.productId?.sellingPrice || 0;

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

    const saleRes = await fetch(
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

    const saleData = await saleRes.json();
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
          WarehouseId: warehouseId,
          Quantity: row.quantity,
          UnitPrice: row.price
        })
      }); 
    }

    alert("Sale Created Successfully");
    navigate("/sales");
  };

  return (

    <div className="card shadow-sm p-4">

      <h4 className="mb-4">New Sale</h4>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Warehouse</label>

          <select
            className="form-select"
            value={warehouseId}
            onChange={(e) =>
              loadWarehouseProducts(e.target.value)
            }
            required
          >
            <option value="">Select Warehouse</option>

            {warehouses.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}

          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Customer</label>

          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            required
          />
        </div>

        <table className="table table-bordered">

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
                    required
                  >
                    <option value="">Select Product</option>

                    {products.map((p) => (
                      <option
                        key={p.productId._id}
                        value={p.productId._id}
                      >
                        {p.productId.name}
                      </option>
                    ))}

                  </select>
                </td>

                <td>₹{row.price}</td>

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

        <div className="text-end">

          <h5>Grand Total: ₹{grandTotal.toFixed(2)}</h5>

          <button
            type="submit"
            className="btn mt-3"
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