import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const EditWarehouseProduct = () => {
  const { warehouseId, productId } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Stock:", warehouseId, productId, stock);
    navigate(`/warehouse/${warehouseId}`);
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">Edit Product Stock</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Update
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(`/warehouse/${warehouseId}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditWarehouseProduct;