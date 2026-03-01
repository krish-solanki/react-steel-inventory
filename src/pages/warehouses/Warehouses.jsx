import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/warehouses");
        setWarehouses(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load warehouses");
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div className="card p-3 shadow">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Warehouses</h5>

        <Link to="/warehouse/add" className="btn btn-primary">
          + Add Warehouse
        </Link>
      </div>

      {loading && <p className="mt-3">Loading warehouses...</p>}
      {error && <p className="text-danger mt-3">{error}</p>}

      {!loading && !error && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Contact</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No warehouses found
                </td>
              </tr>
            ) : (
              warehouses.map((w) => (
                <tr
                  key={w._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/warehouse/${w._id}`)}
                >
                  <td>{w.name}</td>
                  <td>{w.city}</td>
                  <td>{w.contactNumber}</td>
                  <td>{w.managerName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Warehouses;