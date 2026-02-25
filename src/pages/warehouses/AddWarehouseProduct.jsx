import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddWarehouseProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productId: "",
    stock: ""
  });

  const products = [
    { id: 1, name: "Steel Chair" },
    { id: 2, name: "Steel Table" },
    { id: 3, name: "Iron Rack" }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Product To Warehouse:", id, form);
    navigate(`/warehouse/${id}`);
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">Add Product to Warehouse</h4>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Select Product</label>
          <select
            name="productId"
            className="form-select"
            value={form.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Add
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(`/warehouse/${id}`)}
        >
          Cancel
        </button>

      </form>
    </div>
  );
};

export default AddWarehouseProduct;