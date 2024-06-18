import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { GetAInvoice } from '../../features/invoices/invoiceSlice';
import FormatData from '../../utils/FormatData';
import Loading from '../../utils/Loading';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const getInvoiceId = location.pathname.split("/")[4];
    const invoiceState = useSelector(state => state.invoice.invoice)
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (getInvoiceId !== undefined) {
                    await dispatch(GetAInvoice(getInvoiceId));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch, getInvoiceId]);

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
                                <p>Đăt lúc: <strong>{FormatData.formatDateTime(invoiceState?.issueDate)}</strong></p>
                                <p>Giao lúc: <strong>{invoiceState?.deliveryDate ? FormatData.formatDateTime(invoiceState.deliveryDate) : "Chưa giao"}
                                </strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-5 shadow mb-2 bg-body rounded p-3'  >
                    <p>Hình thức: <strong>{invoiceState?.isPaid ? "Thanh toán online" : "Thanh toán khi nhận hàng"}</strong></p>
                    <p>Tổng tiền: <strong className='amount' >{FormatData.formatNumber(invoiceState?.totalPriceAfterDiscount)}</strong></p>
                    <p>Chiết khấu: <strong className='amount'>{FormatData.formatNumber(invoiceState?.totalPriceAfterDiscount - invoiceState?.totalPrice)}</strong></p>
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
                                <div className='d-flex justify-content-between mt-3' key={index}>
                                    <div className='d-flex'>
                                        <img style={{ width: '90px' }} src={item?.productDetail?.product?.thumnailUrl} alt='hinh' />
                                        <p className='fw-bold mt- px-4'>{item?.productDetail?.product?.name}</p>
                                    </div>
                                    <div className='text-end'>
                                        <p>Số lượng: <strong>{item?.quantity}</strong></p>
                                        <p>Đơn giá: <strong className='amount'>{FormatData.formatNumber(item?.price)}</strong></p>
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
            {/* Hiển thị Loading nếu đang tải dữ liệu */}
            {isLoading && <Loading />}
            {/* Nội dung chính của ứng dụng sau khi tải xong */}
            {!isLoading && (
                <div>
                </div>
            )}
        </Container>
    )
}

export default OrderDetail