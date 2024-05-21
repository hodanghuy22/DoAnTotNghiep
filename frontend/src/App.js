import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'
import Home from './pages/Home'
import PhoneList from './pages/Products/PhoneList'
import Detail from './pages/Products/Detail'
import Login from './pages/Accounts/Login'
import SignUp from './pages/Accounts/SignUp'
import NotFound from './pages/NotFound'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainlayout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/product/:productId' element={<Detail />} />
                    <Route path='/product-category/Phone' element={<PhoneList />} />
                </Route>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
