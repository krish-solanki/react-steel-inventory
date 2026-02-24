import { Link } from "react-router-dom";

const Products = () => {
  const products = [
    { sku:"482103", name:"Metal Locker", category:"Storage", price:7500, stock:10 ,warehouse:"Rajkot"},
    { sku:"991025", name:"Steel Chair", category:"Furniture", price:1500, stock:5 ,warehouse:"Surat"},
  ];

  return (
    <div className="card p-3 shadow">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Products</h5>

        <Link to="/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p,i)=>(
            <tr key={i}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.warehouse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;