import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

/* Authentication Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Dashboard */
import Dashboard from "./pages/dashboard/Dashboard";

/* Product Pages= */
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";

/* Warehouse Pages */
import Warehouses from "./pages/warehouses/Warehouses";
import AddWarehouse from "./pages/warehouses/AddWarehouse";
import WarehouseProducts from "./pages/warehouses/WarehouseProducts";
import EditWarehouseProduct from "./pages/warehouses/EditWarehouseProduct";
import LowStock from "./pages/warehouses/WarehouseLowStock";
import AddWarehouseProduct from "./pages/warehouses/AddWarehouseProduct";

/* Quotation Pages */
import Quotations from "./pages/quotations/Quotations";
import NewQuotation from "./pages/quotations/NewQuotation";
import QuotationDetails from "./pages/quotations/QuotationDetails";

/* Stock Adjustment Page */
import StockAdjustment from "./pages/stock/StockAdjustment";

/* Sales Pages */
import Sales from "./pages/sales/Sales";
import NewSales from "./pages/sales/NewSales";
import SalesDetails from "./pages/sales/SalesDetails";


function App() {
  return (
    <Routes>

      {/*Public Routes*/}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/*Protected Routes (Layout)*/}
      <Route path="/" element={<Layout />}>

        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/*Product Routes*/}
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />

        {/*Warehouse Routes*/}
       <Route path="warehouse" element={<Warehouses />} />
       <Route path="warehouse/add" element={<AddWarehouse />} />
       <Route path="warehouse/:id" element={<WarehouseProducts />} />
       <Route path="warehouse/:id/add-product" element={<AddWarehouseProduct />} />
       <Route path="warehouse/:warehouseId/product/:productId" element={<EditWarehouseProduct />}/>

        {/* Low Stock Page */}
        <Route path="low-stock" element={<LowStock />} />

        {/*Quotation Routes*/}
        <Route path="quotation" element={<Quotations />} />
        <Route path="quotation/add" element={<NewQuotation />} />
        <Route path="quotation/:id" element={<QuotationDetails />} />

        {/*Stock Adjustment*/}
        <Route path="stock-adjustment" element={<StockAdjustment />} />

        {/*Sales Routes */}
        <Route path="sales" element={<Sales />} />
        <Route path="sales/add" element={<NewSales />} />
        <Route path="sales/:id" element={<SalesDetails />} />

      </Route>
    </Routes>
  );
}

export default App;