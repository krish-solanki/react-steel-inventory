import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login check
    if (form.username === "admin" && form.password === "1234") {
      setError("");
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f4f6f9" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              borderRadius: "12px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "24px",
              fontWeight: "bold"
            }}
          >
            SI
          </div>

          <h5 className="mt-3">
            Steel<span style={{ color: "#2563eb" }}>Inventory</span>
          </h5>
        </div>

        <h3 className="text-center mb-4">Login</h3>

        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa fa-user"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="fa fa-key"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px"
            }}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
