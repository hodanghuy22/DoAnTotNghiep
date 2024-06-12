import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './../../assets/css/cart.css'
import { GetCart, resetState } from '../../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import formatNumber from '../../utils/formatNumber'

const CartList = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state?.auth?.user);
    const cartState = useSelector((state) => state?.cart?.carts);
    const [totalPrice, setTotalPrice] = useState(0);
  
    useEffect(() => {
      dispatch(resetState());
      dispatch(GetCart(authState?.id));
    }, [dispatch]);
  
    useEffect(() => {
      let total = 0;
      cartState?.forEach((item) => {
        const itemPrice = (item?.productDetail?.retailPrice) * item?.quantity;
        total += itemPrice;
      });
      setTotalPrice(total);
    }, [cartState]);
    return (
        <Container className='p-5 w-75 border'>
            <Row className='mt-4 d-flex justify-content-between mb-5'>
                <div className='col-3'>
                    <input type='checkbox' style={{ top: '0' }} /><span className='mx-3'>Chọn tất cả</span>
                </div>
                <div className='col-3'>
                    <p>Xoá sản phẩm đã chọn</p>
                </div>
            </Row>
            <Row>
                {
                    cartState && cartState?.map((item, index) => {
                        return (
                            <div className='cart-item d-flex container border-bottom mb-5' key={index}>
                                <div className='col-8 d-flex'>
                                    <div>
                                        <input type='checkbox' style={{ top: '0' }} />
                                    </div>
                                    <div className=''>
                                        <img src='https://cdn1.viettelstore.vn/images/Product/ProductImage/small/11334574261520023363.jpeg' alt='laptop' />
                                    </div>
                                    <div className='p-3'>
                                        <div className=''>
                                            <p className='fs-45 fw-bold'>{item?.productDetail?.product?.name}</p>
                                            <select className='text-dark '>
                                                <option>{item?.productDetail?.color?.colorName}</option>
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
                                            <p className='mt-2'>{item?.quantity}</p>
                                            <i className='cart-iconFa'> <FaPlus /></i>
                                        </div>
                                    </div>
                                    <p className='fs-5 text-danger fw-bold amount'>{formatNumber(item?.productDetail?.retailPrice)}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </Row>
            <Row className='d-flex flex-row justify-content-around'>
                <div className='col-6 d-flex'>
                    <p className='fs-4'>Tạm tính: </p>
                    <p className='fs-4 text-danger fw-bold mx-3 amount'>{formatNumber(totalPrice) }</p>
                </div>
                <div className='col-3'>
                    <Link to={'/payment'} className='text-decoration-none text-light bg-danger btn-pay rounded-pill fs-5 mt-4 px-5'>MUA NGAY</Link>
                </div>
            </Row>
        </Container>
    )
}

export default CartList