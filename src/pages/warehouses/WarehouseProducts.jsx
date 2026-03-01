import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const WarehouseProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product-warehouse-stock/warehouse/${id}`
        );
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="card shadow-sm p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Warehouse Products</h4>

        <button
          className="btn btn-primary px-4"
          onClick={() => navigate(`/warehouse/${id}/add-product`)}
        >
          <i className="fa fa-plus me-2"></i>
          Add Product
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item._id}>
                  <td>{item.productId?.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.productId?.sellingPrice}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        navigate(`/warehouse/${id}/product/${item._id}`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-outline-secondary px-4"
          onClick={() => navigate("/warehouse")}
        >
          <i className="fa fa-arrow-left me-2"></i>
          Back
        </button>
      </div>

    </div>
  );
};

export default WarehouseProducts;