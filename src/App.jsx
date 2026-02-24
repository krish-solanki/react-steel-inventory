import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";

// Products
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";

// WareHouse
import Warehouses from "./pages/warehouses/Warehouses";
import AddWarehouse from "./pages/warehouses/AddWarehouse";
import EditWarehouseProduct from "./pages/warehouses/EditWarehouseProduct";
import WarehouseProducts from "./pages/warehouses/WarehouseProducts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Product Routes */}
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />

        {/* WareHouse Routes */}
        <Route path="warehouse" element={<Warehouses/>}/>
        <Route path="warehouse/add" element={<AddWarehouse/>}/>
        <Route path="warehouses/:warehouseId/product/:productId" element={<EditWarehouseProduct/>}/>        
        <Route path="warehouse/product/:id" element={<WarehouseProducts/>}/>        
      </Route>
    </Routes>
  );
}

export default App;