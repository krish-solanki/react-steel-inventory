import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Product Routes */}
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
      </Route>
    </Routes>
  );
}

export default App;