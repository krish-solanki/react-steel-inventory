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

// Quotations

import Quotations from "./pages/quotations/Quotations";
import NewQuotation from "./pages/quotations/NewQuotation";
import QuotationDetails from "./pages/quotations/QuotationDetails";

// Stock Adjustment
import StockAdjustment from "./pages/stock/StockAdjustment";
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

        {/* Quontations Routes */}
        <Route path="quotation" element={<Quotations/>}/>    
        <Route path="quotation/add" element={<NewQuotation />} />
        <Route path="quotation/:id" element={<QuotationDetails />} />

       {/* Stock Adjustment  */}
        <Route path="stock-adjustment" element={<StockAdjustment />} />        
      </Route>
    </Routes>
  );
}

export default App;