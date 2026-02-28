import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="card p-3 shadow">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Products</h5>

        <Link to="/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      {loading && <p className="mt-3">Loading products...</p>}
      {error && <p className="text-danger mt-3">{error}</p>}

      {!loading && !error && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>{p.sku}</td>
                  <td>{p.name}</td>
                  <td>₹{p.sellingPrice}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;