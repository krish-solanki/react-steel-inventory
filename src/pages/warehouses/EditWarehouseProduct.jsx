import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditWarehouseProduct = () => {
  
  const { warehouseId, stockId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  

  const [currentStock, setCurrentStock] = useState(0);
  const [changeQty, setChangeQty] = useState("");
  const [type, setType] = useState("increase");
  const [reason, setReason] = useState("purchase");

  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product-warehouse-stock/${stockId}`
        );

        setCurrentStock(Number(res.data.quantity));
        setProductName(res.data.productId?.name);
        setProductId(res.data.productId?._id);
      } catch {
        setError("Failed to load product details");
      }
    };

    fetchStock();
  }, [stockId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user._id) {
      setError("User not found. Please login again.");
      return;
    }

    let finalStock =
      type === "increase"
        ? currentStock + Number(changeQty)
        : currentStock - Number(changeQty);

    if (finalStock < 0) {
      setError("Stock cannot be negative");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/product-warehouse-stock/${stockId}`,
        { quantity: finalStock }
      );

      await axios.post(
        `http://localhost:5000/api/stock-adjustments`,
        {
          productId,
          warehouseId,
          adjustmentType: type === "increase" ? "IN" : "OUT",
          quantity: Number(changeQty),
          reason,
          remarks: "",
          adjustedBy: user._id
        }
      );

      alert(`Stock updated by ${user.fullName}`);
      navigate(`/warehouse/${warehouseId}`);

    } catch (err) {
      console.log(err?.response?.data || err.message);
      setError("Failed to update stock");
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">

      <div className="d-flex justify-content-between mb-4">
        <h4>Edit Stock</h4>

        <div>
          <span className="me-3 text-muted">
            Logged in as: <strong>{user?.fullName}</strong>
          </span>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/warehouse/${warehouseId}`)}
          >
            Back
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Product Name</label>
          <input className="form-control" value={productName} disabled />
        </div>

        <div className="mb-3">
          <label>Current Stock</label>
          <input className="form-control" value={currentStock} disabled />
        </div>

        <div className="mb-3">
          <label>Action</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="increase">Increase</option>
            <option value="decrease">Decrease</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            value={changeQty}
            onChange={(e) => setChangeQty(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Reason</label>
          <select
            className="form-select"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="purchase">Purchase</option>
            <option value="damage">Damage</option>
            <option value="adjustment">Stock Adjustment</option>
          </select>
        </div>

        <button className="btn btn-success">
          Update
        </button>

      </form>
    </div>
  );
};

export default EditWarehouseProduct;