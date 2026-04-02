import { useEffect, useState } from "react";
import StatCard from "../../components/common/StatCard";

const Dashboard = () => {

  const [productCount, setProductCount] = useState(0);
  const [warehouseCount, setWarehouseCount] = useState(0);
  const [quotationCount, setQuotationCount] = useState(0);

  useEffect(() => {

    const fetchCounts = async () => {
      try {

        const productsRes = await fetch("http://localhost:5000/api/products");
        const products = await productsRes.json();
        setProductCount(products.length);

        const warehousesRes = await fetch("http://localhost:5000/api/warehouses");
        const warehouses = await warehousesRes.json();
        setWarehouseCount(warehouses.length);

        const quotationsRes = await fetch("http://localhost:5000/api/quotations");
        const quotations = await quotationsRes.json();
        setQuotationCount(quotations.length);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchCounts();

  }, []);

  return (
    <div className="container-fluid">

      {/* Top Stats */}
      <div className="row mb-4">

        <StatCard
          title="Total Products"
          value={productCount}
          bg="linear-gradient(135deg, #2563eb, #1d4ed8)"
          icon="fa-box"
        />

        <StatCard
          title="Total Warehouses"
          value={warehouseCount}
          bg="linear-gradient(135deg, #059669, #047857)"
          icon="fa-warehouse"
        />

        <StatCard
          title="Total Quotations"
          value={quotationCount}
          bg="linear-gradient(135deg, #f59e0b, #ea580c)"
          icon="fa-file-invoice"
        />

      </div>

      {/* Bottom Section */}
      <div className="row">

        {/* Low Stock Table Full Width */}
        <div className="col-md-12">

          <div className="card shadow-sm p-3">

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Low Stock Alerts</h5>
            </div>

            <table className="table table-hover align-middle">

              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Steel Chair</td>
                  <td>5</td>
                  <td>
                    <span className="badge bg-danger">Low</span>
                  </td>
                </tr>

                <tr>
                  <td>Metal Locker</td>
                  <td>2</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      Critical
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Office Table</td>
                  <td>8</td>
                  <td>
                    <span className="badge bg-danger">Low</span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;