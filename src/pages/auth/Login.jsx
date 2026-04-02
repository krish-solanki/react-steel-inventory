import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
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

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>

        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <div className="text-center mt-3">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;