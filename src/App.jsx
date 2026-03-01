import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

/* Auth Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Dashboard */
import Dashboard from "./pages/dashboard/Dashboard";

/* Products */
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";

/* Warehouses */
import Warehouses from "./pages/warehouses/Warehouses";
import AddWarehouse from "./pages/warehouses/AddWarehouse";
import WarehouseProducts from "./pages/warehouses/WarehouseProducts";
import AddWarehouseProduct from "./pages/warehouses/AddWarehouseProduct";
import EditWarehouseProduct from "./pages/warehouses/EditWarehouseProduct";
import WarehouseLowStock from "./pages/warehouses/WarehouseLowStock";

/* Quotations */
import Quotations from "./pages/quotations/Quotations";
import NewQuotation from "./pages/quotations/NewQuotation";
import QuotationDetails from "./pages/quotations/QuotationDetails";

/* Sales */
import Sales from "./pages/sales/Sales";
import NewSales from "./pages/sales/NewSales";
import SalesDetails from "./pages/sales/SalesDetails";

/* Stock Adj */ 
import StockAdjustment from "./pages/stock/StockAdjustment";


function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout */}
      <Route path="/" element={<Layout />}>

        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />

        <Route path="warehouse" element={<Warehouses />} />
        <Route path="warehouse/add" element={<AddWarehouse />} />
        <Route path="warehouse/:id" element={<WarehouseProducts />} />
        <Route path="warehouse/:id/add-product" element={<AddWarehouseProduct />} />
        <Route path="warehouse/:warehouseId/product/:productId" element={<EditWarehouseProduct />} />
        <Route path="low-stock" element={<WarehouseLowStock />} />

        <Route path="quotation" element={<Quotations />} />
        <Route path="quotation/add" element={<NewQuotation />} />
        <Route path="quotation/:id" element={<QuotationDetails />} />

        <Route path="sales" element={<Sales />} />
        <Route path="sales/add" element={<NewSales />} />
        <Route path="sales/:id" element={<SalesDetails />} />

        <Route path="stock_adj" element={<StockAdjustment/>}/>

      </Route>

    </Routes>
  );
}

export default App;