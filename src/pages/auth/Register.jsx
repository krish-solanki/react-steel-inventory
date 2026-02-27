import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.username,
        email: form.email,
        password: form.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful");
      navigate("/login");
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f4f6f9" }}
    >
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        
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

        <h3 className="text-center mb-4">Register</h3>

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

          {/* Email */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group mb-3">
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

          {/* Confirm Password */}
          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Register Button */}
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
            Register
          </button>

        </form>

        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;