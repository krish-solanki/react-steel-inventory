import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddWarehouse = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    contact_no: "",
    manager_name: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (!form.name || !form.location || !form.contact_no || !form.manager_name) {
    setError("All required fields must be filled!");
    setLoading(false);
    return;
  }

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/warehouses",
      {
        name: form.name,
        city: form.location,
        contactNumber: form.contact_no,
        managerName: form.manager_name,
        address: form.description,
      }
    );

    console.log("Saved from backend:", data);

    alert("Warehouse added successfully");
    navigate("/warehouse");

  } catch{
    setError("Server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-4">Add New Warehouse</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Warehouse Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter warehouse name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Location <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Enter location"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Contact Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="contact_no"
                className="form-control"
                placeholder="Enter contact number"
                value={form.contact_no}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Manager Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="manager_name"
                className="form-control"
                placeholder="Enter manager name"
                value={form.manager_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                placeholder="Enter warehouse description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="d-flex justify-content-between mt-3">
            <small className="text-muted">
              * indicates required fields
            </small>

            <div>
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/warehouse")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Add Warehouse"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddWarehouse;