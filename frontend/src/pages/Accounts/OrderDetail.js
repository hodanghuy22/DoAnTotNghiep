import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { GetAInvoice } from '../../features/invoices/invoiceSlice';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const changeDateFormat = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split("/");
        const formattedMonth = month.padStart(2, '0');
        return [year, formattedMonth, day].join("-");
    };
    const location = useLocation();
    const getInvoiceId = location.pathname.split("/")[4];
    const invoiceState = useSelector(state => state.invoice.invoice)
    useEffect(() => {
        if (getInvoiceId !== undefined) {
            dispatch(GetAInvoice(getInvoiceId))
        }
    }, [getInvoiceId, dispatch])
    return (
        <Container>
            <div>
                <p className='fs-5'>Chi tiết đơn hàng <strong>#{invoiceState?.id}</strong> - <strong className='text-success fw-bold'>{invoiceState?.orderStatus?.title}</strong></p>
            </div>
            <div className='d-flex w-100'>
                <div className='col-7' style={{ paddingRight: '20px' }} >
                    <div className='shadow mb-2 bg-body rounded p-3 '>
                        <p>THÔNG TIN NHẬN HÀNG</p>
                        <div className='d-flex'>
                            <div className=''>
                                <p>Người nhận: <strong>{invoiceState?.recipientName} - {invoiceState?.recipientPhoneNumber}</strong></p>
                                <p>Địa chỉ: <strong>{invoiceState?.shippingInfo}</strong></p>
                                <p>Giao lúc: <strong>{invoiceState?.deliveryDate ?? "Chưa giao"}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-5 shadow mb-2 bg-body rounded p-3'  >
                    <p>Hình thức: <strong>{invoiceState?.isPaid ? "Thanh toán online" : "Thanh toán khi nhận hàng"}</strong></p>
                    <p>Tổng tiền: <strong>{invoiceState?.totalPriceAfterDiscount} vnđ</strong></p>
                    <p>Chiết khấu: <strong>{invoiceState?.totalPriceAfterDiscount - invoiceState?.totalPrice} vnđ</strong></p>
                </div>
            </div>
            <div className='bg-danger w-100 shadow mb-2 bg-body rounded p-3' >
                <div>
                    <p>DANH SÁCH SẢN PHẨM</p>
                </div>
                {
                    invoiceState?.invoiceDetails?.map((item, index) => {
                        return (
                            <>
                            <div className='d-flex justify-content-between mt-3'>
                                <div className=''>
                                    <img style={{ width: '90px' }} src={item?.productDetail?.product?.thumnailUrl} alt='hinh' />
                                </div>
                                <div className=''>
                                    <strong>{item?.productDetail?.product?.name}</strong>
                                </div>
                                <div className=''>
                                    <p>Đơn giá: <strong>{item?.price}</strong></p>
                                    <p>Số lượng: <strong>{item?.quantity}</strong></p>
                                </div>
                            </div>
                            </>
                        )
                    })
                }
                <Row className='d-flex justify-content-center mt-3'>
                    <Link to={'/trang-ca-nhan/oder-list'} className='w-50 p-3 fw-bold text-danger border border-danger rounded-pill bg-transparent  text-decoration-none text-center'>VỀ TRANG DANH SÁCH ĐƠN HÀNG</Link>
                </Row>
            </div>

        </Container>
    )
}

export default OrderDetail