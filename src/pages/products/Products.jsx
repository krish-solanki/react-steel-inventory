import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch {
        setError("Failed to load products");
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

      {error && <p className="text-danger mt-3">{error}</p>}

      {!error && (
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
                  Product is not fetched
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