import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditWarehouseProduct = () => {
  const { warehouseId, stockId } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState("");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product-warehouse-stock/${stockId}`
        );

        setStock(res.data.quantity);
        setProductName(res.data.productId?.name);
      } catch{
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [stockId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(
        `http://localhost:5000/api/product-warehouse-stock/${stockId}`,
        { quantity: stock }
      );

      alert("Stock Updated Successfully");
      navigate(`/warehouse/${warehouseId}`);
    } catch{
      setError("Failed to update stock");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="card p-4">Loading...</div>;
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1 fw-semibold">Edit Stock</h4>
          <small className="text-muted">
            Update quantity for this warehouse product
          </small>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(`/warehouse/${warehouseId}`)}
        >
          <i className="fa fa-arrow-left me-2"></i>
          Back
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="form-label text-muted">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Stock Quantity</label>
          <input
            type="number"
            className="form-control form-control-lg"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-light border"
            onClick={() => navigate(`/warehouse/${warehouseId}`)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn"
            style={{
              background: "linear-gradient(135deg, #059669, #047857)",
              color: "#fff",
              padding: "8px 25px",
              borderRadius: "8px"
            }}
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Stock"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditWarehouseProduct;