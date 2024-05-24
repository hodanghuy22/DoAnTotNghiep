import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../assets/css/notification.css';
const Notification = () => {
    return (
        <Container>
            <Row className=''>
                <Link className='thong-bao-item d-flex text-decoration-none text-dark mb-4'>
                    <div className='col-1'>
                        <img src='https://cdn.tgdd.vn/Products/Images/1363/315619/mieng-dan-may-cat-tpu-4-lop-o-tech-hd10-thumb-400x400.jpg' alt='mieng-dan' width={60} height={60} />
                    </div>
                    <div className='col-9'>
                        <p className='fw-bold'>Đang vận chuyển</p>
                        <p> Đơn hàng #123123 đã được giao cho đơn vị vận chuyển</p>
                    </div>
                    <div className='col-2'>
                        <Link className='btn border text-dark'>Xem chi tiết</Link>
                    </div>
                </Link>
                <Link className='thong-bao-item d-flex text-decoration-none text-dark mb-4'>
                    <div className='col-1'>
                        <img src='https://cdn.tgdd.vn/Products/Images/1363/315619/mieng-dan-may-cat-tpu-4-lop-o-tech-hd10-thumb-400x400.jpg' alt='mieng-dan' width={60} height={60} />
                    </div>
                    <div className='col-9'>
                        <p className='fw-bold'>Đang vận chuyển</p>
                        <p> Đơn hàng #123123 đã được giao cho đơn vị vận chuyển</p>
                    </div>
                    <div className='col-2'>
                        <p className='btn border text-dark'>Xem chi tiết</p>
                    </div>
                </Link>
                <Link className='thong-bao-item d-flex text-decoration-none text-dark mb-4'>
                    <div className='col-1'>
                        <img src='https://cdn.tgdd.vn/Products/Images/1363/315619/mieng-dan-may-cat-tpu-4-lop-o-tech-hd10-thumb-400x400.jpg' alt='mieng-dan' width={60} height={60} />
                    </div>
                    <div className='col-9'>
                        <p className='fw-bold'>Đang vận chuyển</p>
                        <p> Đơn hàng #123123 đã được giao cho đơn vị vận chuyển</p>
                    </div>
                    <div className='col-2'>
                        <p className='btn border text-dark'>Xem chi tiết</p>
                    </div>
                </Link>
                <Link className='thong-bao-item d-flex text-decoration-none text-dark mb-4'>
                    <div className='col-1'>
                        <img src='https://cdn.tgdd.vn/Products/Images/1363/315619/mieng-dan-may-cat-tpu-4-lop-o-tech-hd10-thumb-400x400.jpg' alt='mieng-dan' width={60} height={60} />
                    </div>
                    <div className='col-9'>
                        <p className='fw-bold'>Đang vận chuyển</p>
                        <p> Đơn hàng #123123 đã được giao cho đơn vị vận chuyển</p>
                    </div>
                    <div className='col-2'>
                        <p className='btn border text-dark'>Xem chi tiết</p>
                    </div>
                </Link>
            </Row>
        </Container>
    )
}

export default Notification