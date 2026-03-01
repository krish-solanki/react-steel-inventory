import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AddWarehouseProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 0
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
  setError(err.response?.data?.message || "Failed to load products");
}
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/product-warehouse-stock", {
        productId: form.productId,
        warehouseId: id,
        quantity: Number(form.quantity)
      });

      navigate(`/warehouse/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="card shadow-sm p-4">

      <h4 className="mb-4">Add Product To Warehouse</h4>

      {error && <p className="text-danger">{error}</p>}

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
            <option value="">Choose product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (₹{p.sellingPrice})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(`/warehouse/${id}`)}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>

      </form>

    </div>
  );
};

export default AddWarehouseProduct;