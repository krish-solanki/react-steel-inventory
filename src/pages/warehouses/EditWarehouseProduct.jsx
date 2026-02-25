import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const EditWarehouseProduct = () => {
  const { warehouseId, productId } = useParams();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Steel Chair", stock: 20, price: 1200, warehouseId: 1 },
    { id: 2, name: "Steel Table", stock: 25, price: 2500, warehouseId: 1 },
    { id: 3, name: "Iron Rack", stock: 10, price: 1800, warehouseId: 2 }
  ];

  const product = products.find(
    (p) =>
      p.id === parseInt(productId) &&
      p.warehouseId === parseInt(warehouseId)
  );

  const [name, setName] = useState(product?.name || "");
  const [quantity, setQuantity] = useState(product?.stock || 0);
  const [price, setPrice] = useState(product?.price || 0);
  const [reason, setReason] = useState("Sales");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      warehouseId,
      productId,
      name,
      quantity,
      price,
      reason,
      remarks
    };

    console.log("Updated Product:", updatedProduct);

    alert("Product Updated Successfully!");
    navigate(`/warehouses/${warehouseId}`);
  };

  return (
    <div className="container-fluid">
      <h4 className="fw-bold mb-4">Edit Product</h4>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Reason</label>
              <select
                className="form-select"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="Sales">Sales</option>
                <option value="Damage">Damage</option>
                <option value="Stock Update">Stock Update</option>
                <option value="Transfer">Transfer</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Remarks</label>
              <textarea
                className="form-control"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows="3"
              />
            </div>

            <button className="btn btn-success">
              Update Product
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWarehouseProduct;