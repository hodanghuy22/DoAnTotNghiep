import React from 'react'
import { FaAddressCard, FaLock, FaUser } from 'react-icons/fa'
import { MdOutlineNoteAlt } from 'react-icons/md'
import { RiShutDownLine } from 'react-icons/ri'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './../../assets/css/global.css'
import { IoIosNotificationsOutline } from 'react-icons/io'
const Trangcanhan = () => {
    const location = useLocation();
    return (
        <div className='container w-100 m-auto shadow p-3 mb-5 bg-body rounded'>
            <div className='container d-flex '>
                <div className='col-3 shadow-sm mb-1 bg-body rounded p-2'>
                    <div className='fs-5 d-flex bg-warning p-2'>
                        <FaUser style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'gray', padding: '10px', marginRight: '10px',marginTop:'4px' }} />
                        <div>
                            <p className='mt-2'>Xin chào, phambinh293</p>
                        </div>
                    </div>
                    <div>
                        <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan' ? 'active-user' : ''}`}><Link to={'/trang-ca-nhan'} className='link'><i className='icon-user'><FaUser /></i>Thông tin tài khoản</Link></p>
                        <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/notification' ? 'active-user' : ''}`}><Link to={'notification'} className='link'><i className='icon-user'><IoIosNotificationsOutline /></i>Thông báo</Link></p>
                        <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/oder-list' ? 'active-user' : ''}`}><Link to={'oder-list'} className='link'><i className='icon-user'><MdOutlineNoteAlt /></i>Quản lý đơn hàng</Link></p>
                        <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/reset-password' ? 'active-user' : ''}`}><Link to={'reset-password'} className='link'><i className='icon-user'><FaLock /></i>Đổi mật khẩu</Link></p>
                        <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/address' ? 'active-user' : ''}`}><Link to={'address'} className='link'><i className='icon-user'><FaAddressCard /></i>Địa chỉ</Link></p>
                        <p className={`item-user p-3 mb-0 `}><Link to={''} className='link'><i className='icon-user'><RiShutDownLine /></i>Đăng xuất</Link></p>
                    </div>
                </div>
                <div className='col-9 p-2'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Trangcanhan
