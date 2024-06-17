import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'
import Home from './pages/Home'
import PhoneList from './pages/Products/PhoneList'
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
import PDUList from './pages/Products/PDUList'
import HeadPhoneWireless from './pages/Products/HeadPhoneWireless'
import HeadPhone from './pages/Products/HeadPhone'
import Compare from './pages/Compare'
import Agency from './pages/Agency'
import ProductHot from './pages/Products/ProductHot'
import PaymentSuccess from './pages/Cart/PaymentSuccess'
import PaymentProcess from './pages/Cart/PaymentProcess'
import PaymentFail from './pages/Cart/PaymentFail'
import PDUDetail from './pages/Products/PDUDetail'
import HeadPhoneWirelessDetail from './pages/Products/HeadPhoneWirelessDetail'
import HeadPhoneDetail from './pages/Products/HeadPhoneDetail'
import Detail from './pages/Products/PhoneDetail'
import WishLists from './pages/Accounts/WishLists'
import ProductByBrand from './pages/Products/ProductByBrand'
import SearchResults from './pages/Products/SearchResults'
import ListNotification from './pages/Accounts/ListNotification'
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
                    <Route path="so-sanh" element={<Compare />} />
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
                    <Route path='/dtdd/:productId' element={<Detail />} />
                    <Route path='/dtdd' element={<PhoneList />} />
                    <Route path='/sac-du-phong' element={<PDUList />} />
                    <Route path='/sac-du-phong/:productId' element={<PDUDetail />} />
                    <Route path='/tai-nghe-co-day' element={<HeadPhone />} />
                    <Route path='/tai-nghe-co-day/:productId' element={<HeadPhoneDetail />} />
                    <Route path='/tai-nghe-khong-day' element={<HeadPhoneWireless />} />
                    <Route path='/tai-nghe-khong-day/:productId' element={<HeadPhoneWirelessDetail />} />
                    <Route path='/hot' element={<ProductHot />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
