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
  const [reason, setReason] = useState("");

  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product-warehouse-stock/${stockId}`
        );

        setCurrentStock(res.data.quantity || 0);
        setProductName(res.data.productId?.name || "");
        setProductId(res.data.productId?._id || "");

      } catch {
        setError("Failed to load product details");
      }
    };

    fetchStock();
  }, [stockId]);

  const formatReason = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user._id) {
      setError("User not found. Please login again.");
      return;
    }

    if (!reason) {
      setError("Please select reason");
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
          reason: formatReason(reason),
          remarks: "",
          adjustedBy: user._id
        }
      );

      alert(`Stock updated by ${user.fullName}`);
      navigate(`/warehouse/${warehouseId}`);

    } catch {
      setError("Failed to update stock");
    }
  };

  return (
    <div className="card p-4">

      <h4 className="mb-4">
        Edit Stock (User: {user?.fullName})
      </h4>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          value={productName}
          disabled
        />

        <input
          className="form-control mb-3"
          value={currentStock}
          disabled
        />

        <select
          className="form-select mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="increase">Increase</option>
          <option value="decrease">Decrease</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          value={changeQty}
          onChange={(e) => setChangeQty(e.target.value)}
          required
        />

        <select
          className="form-select mb-3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="damage">Damage</option>
          <option value="adjustment">Adjustment</option>
        </select>

        <button className="btn btn-success">
          Update
        </button>

      </form>
    </div>
  );
};

export default EditWarehouseProduct;