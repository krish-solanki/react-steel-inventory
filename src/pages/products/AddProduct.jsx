import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "",
    sell_price: "",
    cost_price: "",
    stock: "",
    material: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/products", {
        name: form.name,
        sku: form.sku,
        category: form.category,
        material: form.material,
        dimensions: form.description || "N/A",
        costPrice: Number(form.cost_price),
        sellingPrice: Number(form.sell_price),
        minimumStock: Number(form.stock)
      });

      alert("Product added successfully");
      navigate("/products");

    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">Add New Product</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Product Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              SKU <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="sku"
              className="form-control"
              value={form.sku}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Category <span className="text-danger">*</span>
            </label>
            <select
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option>Furniture</option>
              <option>Chair</option>
              <option>Table</option>
              <option>Locker</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Material</label>
            <select
              name="material"
              className="form-select"
              value={form.material}
              onChange={handleChange}
            >
              <option value="">Select material</option>
              <option>Steel</option>
              <option>Wood</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Cost Price (₹) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="cost_price"
              className="form-control"
              value={form.cost_price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Sell Price (₹) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="sell_price"
              className="form-control"
              value={form.sell_price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Initial Stock <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="stock"
              className="form-control"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="d-flex justify-content-between mt-3">
          <small className="text-muted">
            * indicates required fields
          </small>

          <div>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "8px"
              }}
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;