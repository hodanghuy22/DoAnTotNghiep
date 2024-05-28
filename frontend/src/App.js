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
import ResetPasword from './pages/Accounts/ResetPasword'
import Address from './pages/Accounts/Address'
import OrderDetail from './pages/Accounts/OrderDetail'
import Cart from './pages/Cart/Cart'
import Notification from './components/Notification'
import Payment from './pages/Cart/Payment'
import CartList from './pages/Cart/CartList'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainlayout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/cart' element={<CartList />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/trang-ca-nhan' element={<Trangcanhan />}>
                        <Route index element={<InfoAccount />} />
                        <Route path='oder-list' element={<OrderList />} />
                        <Route path='notification' element={<Notification />} />
                        <Route path='oder-list/detail' element={<OrderDetail />} />
                        <Route path='reset-password' element={<ResetPasword />} />
                        <Route path='address' element={<Address />} />
                    </Route>
                    <Route path='/product/:productId' element={<Detail />} />
                    <Route path='/product-category/Phone' element={<PhoneList />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
