import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.location ||
      !form.contact_no ||
      !form.manager_name
    ) {
      setError("All required fields must be filled!");
      return;
    }

    console.log("Warehouse Data:", form);

    navigate("/warehouses");
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