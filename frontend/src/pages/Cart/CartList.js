import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

const CartList = () => {
    return (
        <Container>
            <Row className='mt-4'>
                <p>Có <strong>2 sản phẩm</strong> trong giỏ hàng</p>
            </Row>
            <Row>
                <div className='cart-item d-flex container border-bottom mb-5'>
                    <div className='col-8 d-flex'>
                        <div className=''>
                            <img src='https://cdn1.viettelstore.vn/images/Product/ProductImage/small/11334574261520023363.jpeg' alt='laptop' />
                        </div>
                        <div className='p-3'>
                            <div className=''>
                                <p className='fs-45 fw-bold'>iPhone 15 Pro Max 256GB</p>
                                <select className='text-dark '>
                                    <option>MÀU SẮC: GREEN</option>
                                    <option>MÀU SẮC: BLACK</option>
                                </select>
                            </div>
                            <div style={{ overflowWrap: 'break-word' }} className='uu-dai mt-4'>
                                <p >- Ưu đãi sinh nhật, cơ hội trúng đồng hồ Apple Watch hoặc tai nghe AirPods 2</p>
                                <p >- Giảm thêm 500,000đ (Đã trừ vào giá) cho khách hàng đổi 5,000 điểm Viettel++ trên ứng dụng My Viettel</p>
                                <p >TRẢ GÓP/THANH TOÁN (Khách hàng chọn 01 trong các hình thức trả góp/thanh toán sau):</p>
                                <p >- Trả góp 0% trên giá 29,990,000đ qua Công ty Tài chính (từ 1,610,000đ/tháng)</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 justify-content-end d-flex' style={{ maxHeight: '40px' }}>
                        <div className='d-flex text-end'>
                            <i className='fs-3 cart-iconFa bg-transparent p-0 mx-0'><MdDeleteForever /></i>
                            <div className='d-flex'>
                                <i className='cart-iconFa'><FaMinus /></i>
                                <p className='mt-2'>1</p>
                                <i className='cart-iconFa'> <FaPlus /></i>
                            </div>
                        </div>
                        <p className='fs-5 text-danger fw-bold'>28.990.000đ</p>
                    </div>
                </div>
                <div className='cart-item d-flex container border-bottom mb-5'>
                    <div className='col-8 d-flex'>
                        <div className=''>
                            <img src='https://cdn1.viettelstore.vn/images/Product/ProductImage/small/11334574261520023363.jpeg' alt='laptop' />
                        </div>
                        <div className='p-3'>
                            <div className=''>
                                <p className='fs-45 fw-bold'>iPhone 15 Pro Max 256GB</p>
                                <select className='text-dark '>
                                    <option>MÀU SẮC: GREEN</option>
                                    <option>MÀU SẮC: BLACK</option>
                                </select>
                            </div>
                            <div style={{ overflowWrap: 'break-word' }} className='uu-dai mt-4'>
                                <p >- Ưu đãi sinh nhật, cơ hội trúng đồng hồ Apple Watch hoặc tai nghe AirPods 2</p>
                                <p >- Giảm thêm 500,000đ (Đã trừ vào giá) cho khách hàng đổi 5,000 điểm Viettel++ trên ứng dụng My Viettel</p>
                                <p >TRẢ GÓP/THANH TOÁN (Khách hàng chọn 01 trong các hình thức trả góp/thanh toán sau):</p>
                                <p >- Trả góp 0% trên giá 29,990,000đ qua Công ty Tài chính (từ 1,610,000đ/tháng)</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 justify-content-end d-flex' style={{ maxHeight: '40px' }}>
                        <div className='d-flex text-end'>
                            <i className='fs-3 cart-iconFa bg-transparent p-0 mx-0'><MdDeleteForever /></i>
                            <div className='d-flex'>
                                <i className='cart-iconFa'><FaMinus /></i>
                                <p className='mt-2'>1</p>
                                <i className='cart-iconFa'> <FaPlus /></i>
                            </div>
                        </div>
                        <p className='fs-5 text-danger fw-bold'>28.990.000đ</p>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default CartList