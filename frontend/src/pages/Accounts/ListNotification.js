import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../assets/css/notification.css';
import { GetAllNoti } from '../../features/notifications/notificationSlice';
const ListNotification = () => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.auth?.user);
  const notiState = useSelector(state => state.notification?.notifications);
  useEffect(() => {
    dispatch(GetAllNoti(userState?.id))
  }, [dispatch, userState])
  return (
    <Container>
      <Row className=''>
        {
          notiState && notiState?.map((item, index) => {
            return (
                <Link
                  key={index}
                  to={`/trang-ca-nhan/order-list/detail/${item?.invoiceId}`}
                  className='thong-bao-item d-flex text-decoration-none text-dark mb-4'>
                  <div className='col-1'>
                    <img src={item?.invoice?.invoiceDetails[0]?.productDetail?.product?.thumnailUrl} alt='mieng-dan' width={60} height={60} />
                  </div>
                  <div className='col-9'>
                    <p className='fw-bold'>{item?.title}</p>
                    <p>{item?.message}</p>
                  </div>
                  <div className='col-2'>
                    <p className='btn border text-dark'>Xem chi tiết</p>
                  </div>
                </Link>
            )
          })
        }
      </Row>
    </Container>
  )
}

export default ListNotification