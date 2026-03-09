import { useEffect, useState } from "react";
import StatCard from "../../components/common/StatCard";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

  const data = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Sales",
        data: [80000, 50000, 120000, 100000, 115000, 150000],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div>

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

      <div className="row">

        <div className="col-md-8">

          <div className="card shadow-sm p-3">

            <h5>Monthly Sales</h5>

            <Bar data={data} />

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow-sm p-3">

            <h5>Low Stock Alerts</h5>

            <table className="table">

              <thead>

                <tr>
                  <th>SKU</th>
                  <th>Current</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>990C2ie</td>
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

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;