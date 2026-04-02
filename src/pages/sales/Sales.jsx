import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sales = () => {

  const navigate = useNavigate();
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sales")
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data);
      });
  }, []);

  return (

    <div className="card border-0 shadow-sm p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h4 className="fw-semibold mb-0">Sales</h4>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/sales/add")}
        >
          <i className="fa fa-plus me-2"></i>
          Create Sale
        </button>

      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th className="text-end">Total</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {salesData.map((sale) => (

              <tr key={sale._id}>

                <td>#{sale._id.slice(-5)}</td>

                <td>{sale.CustomerName}</td>

                <td>
                  {new Date(sale.SaleDate).toLocaleString("en-IN")}
                </td>

                <td className="text-end fw-semibold">
                  ₹ {sale.TotalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2
                  })}
                </td>

                <td className="text-center">

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate(`/sales/${sale._id}`)}
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Sales;