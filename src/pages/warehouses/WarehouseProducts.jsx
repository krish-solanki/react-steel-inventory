import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const WarehouseProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product-warehouse-stock/warehouse/${id}`
        );
        setProducts(res.data);
      } catch {
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="card p-4">

      <div className="d-flex justify-content-between mb-4">
        <h4>Warehouse Products</h4>

        <button
          className="btn btn-primary"
          onClick={() => navigate(`/warehouse/${id}/add-product`)}
        >
          Add Product
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {!error && (
        <table className="table">
          <thead>
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
                  Products not found
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
    </div>
  );
};

export default WarehouseProducts;