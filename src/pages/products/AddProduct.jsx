import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    material: "",
    dimensions: "",
    costPrice: "",
    sellingPrice: "",
    minimumStock: 5
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/products", {
        ...form,
        costPrice: Number(form.costPrice),
        sellingPrice: Number(form.sellingPrice),
        minimumStock: Number(form.minimumStock)
      });

      navigate("/products");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4">Add New Product</h4>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="row">

          <div className="col-md-6 mb-3">
            <label>Product Name</label>
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
            <label>SKU</label>
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
            <label>Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Material</label>
            <input
              type="text"
              name="material"
              className="form-control"
              value={form.material}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Dimensions</label>
            <input
              type="text"
              name="dimensions"
              className="form-control"
              value={form.dimensions}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Cost Price</label>
            <input
              type="number"
              name="costPrice"
              className="form-control"
              value={form.costPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              className="form-control"
              value={form.sellingPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Minimum Stock</label>
            <input
              type="number"
              name="minimumStock"
              className="form-control"
              value={form.minimumStock}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;