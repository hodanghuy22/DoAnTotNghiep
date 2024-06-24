import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'
import Home from './pages/Home'
import Login from './pages/Accounts/Login'
import SignUp from './pages/Accounts/SignUp'
import NotFound from './pages/NotFound'
import Trangcanhan from './pages/Accounts/Trangcanhan'
import InfoAccount from './pages/Accounts/InfoAccount'
import OrderList from './pages/Accounts/OrderList'
import OrderDetail from './pages/Accounts/OrderDetail'
import Payment from './pages/Cart/Payment'
import CartList from './pages/Cart/CartList'
import ForgotPassword from './pages/Accounts/ForgotPassword'
import ChangePassword from './pages/Accounts/ChangePassword'
import ResetPassword from './pages/Accounts/ResetPassword'
import Compare from './pages/Compare'
import Agency from './pages/Agency'
import ProductHot from './pages/Products/ProductHot'
import PaymentSuccess from './pages/Cart/PaymentSuccess'
import PaymentProcess from './pages/Cart/PaymentProcess'
import PaymentFail from './pages/Cart/PaymentFail'
import WishLists from './pages/Accounts/WishLists'
import ProductByBrand from './pages/Products/ProductByBrand'
import SearchResults from './pages/Products/SearchResults'
import ListNotification from './pages/Accounts/ListNotification'
import ProductDetail from './components/ProductDetail'
import ProductList from './pages/Products/ProductList'
import ProductBrandList from './components/ProductBrandList'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/payment-process' element={<PaymentProcess />} />
                <Route path='/payment-success' element={<PaymentSuccess />} />
                <Route path='/payment-fail' element={<PaymentFail />} />
                <Route path="/" element={<Mainlayout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />
                    <Route path='/cart' element={<CartList />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path="so-sanh/:phones" element={<Compare />} />
                    <Route path="/gioi-thieu" element={<Agency />} />
                    <Route path="/tim-kiem/:searchQuery" element={<SearchResults />} />
                    <Route path='/trang-ca-nhan' element={<Trangcanhan />}>
                        <Route index element={<InfoAccount />} />
                        <Route path='oder-list' element={<OrderList />} />
                        <Route path='notification' element={<ListNotification />} />
                        <Route path='oder-list/detail/:id' element={<OrderDetail />} />
                        <Route path='change-password' element={<ChangePassword />} />
                        <Route path='wishlist' element={<WishLists />} />
                    </Route>
                    <Route path='/product/:brandId' element={<ProductByBrand />} />
                    <Route path='/dien-thoai/:productId' element={<ProductDetail categoryId={1}  />} />
                    <Route path='/dien-thoai' element={<ProductList categoryId={1} />} />
                    <Route path='/dien-thoai/brand/:brandId' element={<ProductBrandList categoryId={1} />} />
                    <Route path='/sac-du-phong' element={<ProductList categoryId={2} />} />
                    <Route path='/sac-du-phong/:productId' element={<ProductDetail categoryId={2} />} />
                    <Route path='/sac-du-phong/brand/:brandId' element={<ProductBrandList categoryId={2} />} />
                    <Route path='/tai-nghe-co-day' element={<ProductList  categoryId={4} />} />
                    <Route path='/tai-nghe-co-day/:productId' element={<ProductDetail categoryId={4}  />} />
                    <Route path='/tai-nghe-co-day/brand/:brandId' element={<ProductBrandList categoryId={4} />} />
                    <Route path='/tai-nghe-khong-day' element={<ProductList  categoryId={3} />} />
                    <Route path='/tai-nghe-khong-day/:productId' element={<ProductDetail categoryId={3}  />} />
                    <Route path='/tai-nghe-khong-day/brand/:brandId' element={<ProductBrandList categoryId={3} />} />
                    <Route path='/hot' element={<ProductHot />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
