import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddWarehouse = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.name || !form.location) {
      setError("Warehouse Name and Location are required!");
      return;
    }

    console.log("Warehouse Data:", form);

    // After save redirect to warehouses page
    navigate("/warehouses");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        <h5 className="mb-4">Add New Warehouse</h5>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* Warehouse Name */}
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

            {/* Location */}
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

            {/* Description */}
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

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <small className="text-muted">
              * indicates required fields
            </small>

            <div>
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/warehouses")}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-success">
                <i className="fa fa-plus me-2"></i>
                Add Warehouse
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddWarehouse;
