import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          fullName: form.username,
          roleId: 1
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert("Registration Successful")
        navigate("/login")
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.log(error)
      alert("Server error")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>

        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Register
          </button>

        </form>

        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  )
}

export default Register