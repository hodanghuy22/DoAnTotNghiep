import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OrderDetail = () => {
    return (
        <Container>
            <div>
                <p className='fs-5'>Chi tiết đơn hàng #123123 - <span className='text-success fw-bold'>Đã nhận hàng</span></p>
            </div>
            <div className='d-flex w-100'>
                <div className='col-8 ' style={{ paddingRight: '20px' }} >
                    <div className='shadow mb-2 bg-body rounded p-3 '>
                        <p>THÔNG TIN NHẬN HÀNG</p>
                        <div className='d-flex'>
                            <div className='col-3'>
                                <p>Người nhận:</p>
                                <p>Địa chỉ:</p>
                                <p>Giao lúc:</p>
                            </div>
                            <div className='col-9'>
                                <p>Anh Phạm Quảng Bình - 032xxxxxx</p>
                                <p>Xã Tân Quới, Huyện Thanh Bình, Đồng Tháp</p>
                                <p>Trước 18:00 - Thứ Năm (07/03)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-4 shadow mb-2 bg-body rounded p-3'  >
                    <p>HÌNH THỨC THANH TOÁN</p>
                    <div className=''>
                        <p>Thanh toán khi nhận hàng</p>
                    </div>
                </div>
            </div>
            <div className='bg-danger w-100 shadow mb-2 bg-body rounded p-3' >
                <div>
                    <p>Thông tin sản phẩm</p>
                </div>
                <div className='d-flex justify-content-between mt-3'>
                    <div className='d-flex'>
                        <div className=''>
                            <img style={{ width: '60px' }} src='https://cdn.tgdd.vn/Products/Images/1363/315619/mieng-dan-may-cat-tpu-4-lop-o-tech-hd10-thumb-400x400.jpg' alt='loa blu' />
                        </div>
                        <div className='mx-3'>
                            <p>Miếng dán máy cắt TPU 4 lớp O-TECH HD10</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Tổng tiền: 70.000đ</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex w-100'>
                    <div className='col-6'>
                    </div>
                    <div className='col-6 d-flex justify-content-between'>
                        <div className='col-6'>
                            <p>Tạm tính</p>
                            <p>Phụ phí</p>
                            <p>Tổng tiền</p>
                            <p className='fw-bold'>Số tiền đã thanh toán</p>
                        </div>
                        <div className='d-flex flex-column text-end'>
                            <p>90000</p>
                            <p>20000</p>
                            <p>110000</p>
                            <p className='fw-bold text-danger'>110000</p>
                        </div>
                    </div>
                </div>
                <Row className='d-flex justify-content-center mt-3'>
                    <Link to={'/trang-ca-nhan/oder-list'} className='w-50 p-3 fw-bold text-danger border border-danger rounded-pill bg-transparent  text-decoration-none text-center'>VỀ TRANG DANH SÁCH ĐƠN HÀNG</Link>
                </Row>
            </div>

        </Container>
    )
}

export default OrderDetail