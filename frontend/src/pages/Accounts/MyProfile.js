import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'
import { MdOutlineNoteAlt } from 'react-icons/md'
import { RiShutDownLine } from 'react-icons/ri'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './../../assets/css/global.css'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../features/auths/authSlice'
import { FcLike } from 'react-icons/fc'
const MyProfile = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.auth.user);

    const handleLogout = () => {
        dispatch(Logout());
        setTimeout(() => {
            navigate('/');
        }, 300)
    };
    return (
        <div className='container w-100 m-auto shadow p-3 mb-5 bg-body rounded'>
            <div className='container d-flex '>
                <div className='col-3 shadow-sm mb-1 bg-body rounded p-2'>
                    <div className='fs-5 d-flex bg-warning p-2'>
                        <FaUser style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'gray', padding: '10px', marginRight: '10px', marginTop: '4px' }} />
                        <div>
                            <p className='mt-2'>{userState?.name}</p>
                        </div>
                    </div>
                    <div>
                        <Link to={'/trang-ca-nhan'} className='link text-decoration-none text-dark'>
                            <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan' ? 'active-user' : ''}`}>
                                <i className='icon-user'><FaUser /></i>
                                Thông tin tài khoản
                            </p>
                        </Link>
                        <Link to={'notification'} className='link text-decoration-none text-dark'>
                            <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/notification' ? 'active-user' : ''}`}>
                                <i className='icon-user'><IoIosNotificationsOutline /></i>
                                Thông báo
                            </p>
                        </Link>
                        <Link to={'wishlist'} className='link text-decoration-none text-dark'>
                            <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/wishlist' ? 'active-user' : ''}`}>
                                <i className='icon-user'><FcLike /></i>
                                Yêu thích
                            </p>
                        </Link>
                        <Link to={'order-list'} className='link text-decoration-none text-dark'>
                            <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/order-list' ? 'active-user' : ''}`}>
                                <i className='icon-user'><MdOutlineNoteAlt /></i>
                                Quản lý đơn hàng
                            </p>
                        </Link>
                        <Link to={'change-password'} className='link text-decoration-none text-dark'>
                            <p className={`item-user p-3 mb-0 ${location.pathname === '/trang-ca-nhan/change-password' ? 'active-user' : ''}`}>
                                <i className='icon-user'><FaLock /></i>
                                Đổi mật khẩu
                            </p>
                        </Link>
                        <button onClick={handleLogout} className='btn item-user p-3 mb-0'>
                            <p><i className='icon-user'><RiShutDownLine /></i>Đăng xuất</p>
                        </button>
                    </div>
                </div>
                <div className='col-9 p-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MyProfile
