import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: form.email,
          password: form.password
        }
      );

      alert("Login Successful");

      console.log(response.data);

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message || "Invalid Email or Password"
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f4f6f9" }}
    >
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>

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

        <form onSubmit={handleSubmit}>

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
          <Link to="/register" style={{ color: "#2563eb", textDecoration: "none" }}>
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;