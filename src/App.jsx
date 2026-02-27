import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

/* Authentication Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Dashboard */
import Dashboard from "./pages/dashboard/Dashboard";

/* Product Pages */
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
      </Route>

    </Routes>
  );
}

export default App;