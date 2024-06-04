import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'
import Home from './pages/Home'
import PhoneList from './pages/Products/PhoneList'
import Detail from './pages/Products/Detail'
import Login from './pages/Accounts/Login'
import SignUp from './pages/Accounts/SignUp'
import NotFound from './pages/NotFound'
import Trangcanhan from './pages/Accounts/Trangcanhan'
import InfoAccount from './pages/Accounts/InfoAccount'
import OrderList from './pages/Accounts/OrderList'
import Address from './pages/Accounts/Address'
import OrderDetail from './pages/Accounts/OrderDetail'
import Notification from './components/Notification'
import Payment from './pages/Cart/Payment'
import CartList from './pages/Cart/CartList'
import ForgotPassword from './pages/Accounts/ForgotPassword'
import ChangePassword from './pages/Accounts/ChangePassword'
import ResetPassword from './pages/Accounts/ResetPassword'
import PDUList from './pages/Products/PDUList'
import HeadPhoneWireless from './pages/Products/HeadPhoneWireless'
import HeadPhone from './pages/Products/HeadPhone'
import Compare from './pages/Compare'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainlayout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />
                    <Route path='/cart' element={<CartList />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path="so-sanh" element={<Compare />} />
                    <Route path='/trang-ca-nhan' element={<Trangcanhan />}>
                        <Route index element={<InfoAccount />} />
                        <Route path='oder-list' element={<OrderList />} />
                        <Route path='notification' element={<Notification />} />
                        <Route path='oder-list/detail' element={<OrderDetail />} />
                        <Route path='change-password' element={<ChangePassword />} />
                        <Route path='address' element={<Address />} />
                    </Route>
                    <Route path='/product/:productId' element={<Detail />} />
                    <Route path='/product-category/Phone' element={<PhoneList />} />
                    <Route path='/product-category/sac-du-phong' element={<PDUList />} />
                    <Route path='/product-category/tai-nghe-co-day' element={<HeadPhone />} />
                    <Route path='/product-category/tai-nghe-khong-day' element={<HeadPhoneWireless />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
