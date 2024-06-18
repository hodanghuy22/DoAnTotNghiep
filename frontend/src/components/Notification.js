import React, { useEffect } from 'react'
import { Container, Dropdown, DropdownItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../assets/css/notification.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetTop5Noti } from '../features/notifications/notificationSlice';
const Notification = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.auth?.user);
    const notiState = useSelector(state => state.notification?.notifications);
    useEffect(() => {
        dispatch(GetTop5Noti(userState?.id))
    }, [dispatch, userState])
    return (
        <Container>
            {
                notiState && notiState?.map((item, index) => {
                    return (
                        <Dropdown.Item key={index} className='custom-dropdown-item'>
                            <div className='d-flex mb-2' style={{ width: '400px' }}>
                                <div className='p-2 mx-2'>
                                    <img src={item?.invoice?.invoiceDetails[0]?.productDetail?.product?.thumnailUrl} alt='hinh' width={40} height={40} />
                                </div>
                                <div className='p-0' style={{ lineHeight: '1' }}>
                                    <p className='fw-bold fs-6'>{item?.title}</p>
                                    <p className='text-wrap' style={{ maxHeight: '3em', overflow: 'hidden' }}>
                                        {item?.message}
                                    </p>
                                </div>
                            </div>
                        </Dropdown.Item>
                    )
                })
            }
            <DropdownItem className='text-center mt-2'>
                <Link to={'trang-ca-nhan/notification'} className='text-decoration-none'>Xem tất cả</Link>
            </DropdownItem>
        </Container>
    )
}

export default Notification