import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", form);
    navigate("/products");
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">Add New Product</h4>

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
              placeholder="Enter product name"
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
              placeholder="Enter SKU"
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
              placeholder="Enter cost price"
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
              placeholder="Enter sell price"
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
              placeholder="Enter initial stock quantity"
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
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "8px"
              }}
            >
              <i className="fa fa-plus me-2"></i>
              Add Product
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;