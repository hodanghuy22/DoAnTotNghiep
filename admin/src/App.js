import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';
import Login from "./pages/Login";
import BrandList from './pages/BrandList';
import CapacityList from './pages/CapacityList';
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import AddBrand from "./pages/AddBrand";
import AddCapacity from "./pages/AddCapacity";
import AddAdmin from "./pages/AddAdmin";
import ColorList from "./pages/ColorList";
import AddColor from "./pages/AddColor";
import CategoryList from "./pages/CategoryList";
import AddCategory from "./pages/AddCategory";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import SlideshowList from "./pages/SlideshowList";
import AddSlideshow from "./pages/AddSlideshow";
import AddProductDetails from "./pages/AddProductDetails";
import ProductDetailList from "./pages/ProductDetailList";
import InvoiceList from "./pages/InvoiceList";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import OrderStatusList from "./pages/OrderStatusList";
import AddOrderStatus from "./pages/AddOrderStatus";
import Statistics from "./pages/Statistics";
import LogList from "./pages/LogList";
import TestNoti from "./pages/TestNoti";
import InvoiceDetails from "./pages/InvoiceDetails";
import NotificationList from "./pages/NotificationList";
import { OpenRoutes } from "./routings/OpenRoutes";
import { PrivateRoutes } from "./routings/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpenRoutes><Login /></OpenRoutes>}></Route>
        <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />}></Route>
          <Route path="statistics" element={<Statistics />}></Route>
          <Route path="logs" element={<LogList />}></Route>
          <Route path='brand-list' element={<BrandList />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='capacity-list' element={<CapacityList />} />
          <Route path='capacity' element={<AddCapacity />} />
          <Route path='capacity/:id' element={<AddCapacity />} />
          <Route path='user-list' element={<UserList />} />
          <Route path='add-admin' element={<AddAdmin />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='category-list' element={<CategoryList />} />
          <Route path='category' element={<AddCategory />} />
          <Route path='category/:id' element={<AddCategory />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='product/:id' element={<AddProduct />} />
          <Route path='productDetail-list' element={<ProductDetailList />} />
          <Route path='productDetail' element={<AddProductDetails />} />
          <Route path='productDetail/:id' element={<AddProductDetails />} />
          <Route path='slideshow-list' element={<SlideshowList />} />
          <Route path='slideshow' element={<AddSlideshow />} />
          <Route path='slideshow/:id' element={<AddSlideshow />} />
          <Route path='invoice-list' element={<InvoiceList />} />
          <Route path='invoice/:id' element={<InvoiceDetails />} />
          <Route path='coupon-list' element={<CouponList />} />
          <Route path='coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
          <Route path='orderstatus-list' element={<OrderStatusList />} />
          <Route path='orderstatus' element={<AddOrderStatus />} />
          <Route path='orderstatus/:id' element={<AddOrderStatus />} />
          <Route path='testnoti' element={<TestNoti />} />
          <Route path='notification-list' element={<NotificationList />} />
        </Route>
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
