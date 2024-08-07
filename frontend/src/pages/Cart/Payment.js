import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { CiCreditCard1, CiDeliveryTruck } from 'react-icons/ci'
import { FaMoneyBill } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart } from '../../features/cart/cartSlice'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CheckCoupon } from '../../features/coupons/couponSlice'
import { CreateInvoice } from '../../features/invoices/invoiceSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { base_url, getConfig } from '../../utils/axiosConfig'
import PayPalButton from '../../components/PayPalButton'
import FormatData from '../../utils/FormatData'
import Loading from '../../utils/Loading'

const invoiceSchema = yup.object({
    recipientName: yup.string().required("Tên người nhận là bắt buộc!"),
    recipientPhoneNumber: yup.string()
        .matches(/^(0\d{9})$/, 'Số điện thoại không hợp lệ')
        .required("SĐT người nhận là bắt buộc!"),
    shippingInfo: yup.string().required("Địa chỉ nhận hàng là bắt buộc!"),
    desc: yup.string(),
});

const checkCouponSchema = yup.object({
    code: yup.string(),
});

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state?.auth?.user);
    const cartState = useSelector((state) => state?.cart?.carts);
    const couponState = useSelector((state) => state?.coupon?.coupon);

    const [totalPrice, setTotalPrice] = useState(0);
    const [tongTienCuoi, setTongTienCuoi] = useState(0);
    const [tienChietKhau, setTienChietKhau] = useState(0);
    const [quantityProduct, setQuantityProduct] = useState(0);
    const [isPaymentOnline, setIsPaymentOnline] = useState(false);
    const [activeButton, setActiveButton] = useState('online');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(GetCart(authState?.id));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [dispatch, authState?.id]);
    const formik = useFormik({
        initialValues: {
            userId: authState?.id,
            recipientName: authState?.name || "",
            recipientPhoneNumber: authState?.phoneNumber || "",
            shippingInfo: authState?.address || "",
            desc: '',
            issueDate: FormatData.formatDateVN(),
            deliveryDate: '',
            totalPrice: totalPrice,
            totalPriceAfterDiscount: totalPrice,
            isPaid: false,
            couponId: '',
            orderStatusId: 1,
            transactionId: '',
            invoiceDetails: [],
        },
        validationSchema: invoiceSchema,
        onSubmit: values => {
            dispatch(CreateInvoice(values))
            if (authState && authState.id) {
                const userId = authState.id;
                let cart = localStorage.getItem('cart');
                cart = cart ? JSON.parse(cart) : {};

                if (cart[userId]) {
                    delete cart[userId];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    console.log(`Cart cleared for user ${userId}.`);
                } else {
                    console.log(`No cart found for user ${userId}.`);
                }
            } else {
                console.log('User not authenticated.');
            }
            setTimeout(() => {
                navigate('/trang-ca-nhan/order-list');
            }, 300)
            console.log(values);
        },
    });
    const formik2 = useFormik({
        initialValues: {
            code: "",
            money: totalPrice,
            date: FormatData.formatDateVN(),
        },
        validationSchema: checkCouponSchema,
        onSubmit: values => {
            console.log(values);
            dispatch(CheckCoupon(values));
        },
    });

    useEffect(() => {
        let total = 0;
        let quantity = 0;
        cartState?.forEach((item) => {
            const itemPrice = (item?.productDetail?.retailPrice) * item?.quantity;
            total += itemPrice;
            quantity += item?.quantity;
        });
        setTotalPrice(total);
        setTongTienCuoi(total);
        setQuantityProduct(quantity);
        const updatedInvoiceDetails = cartState?.map(item => {
            return {
                productDetailId: item?.productDetailId,
                quantity: item?.quantity,
                price: item?.productDetail?.retailPrice,
            };
        })
        formik.setFieldValue("invoiceDetails", updatedInvoiceDetails);
        formik2.setFieldValue("money", total);
        formik.setFieldValue("totalPrice", total);
        formik.setFieldValue("totalPriceAfterDiscount", total);
    }, [cartState]);

    useEffect(() => {
        if (couponState) {
            formik.setFieldValue("couponId", couponState.id);
            if (couponState.discountPercent > 0) {
                let tien = totalPrice
                let chietkhau = (couponState.discountPercent / 100) * tien
                tien -= chietkhau;
                setTongTienCuoi(tien)
                setTienChietKhau(chietkhau)
                formik.setFieldValue("totalPriceAfterDiscount", tien);
            } else {
                let tien = totalPrice
                let chietkhau = couponState.discountMoney;
                tien -= couponState.discountMoney;
                setTongTienCuoi(tien)
                setTienChietKhau(chietkhau)
                formik.setFieldValue("totalPriceAfterDiscount", tien);
            }
        } else {
            setTongTienCuoi(totalPrice)
            setTienChietKhau(0)
            formik.setFieldValue("totalPriceAfterDiscount", totalPrice);
            formik.setFieldValue("couponId", '');
            return
        }
    }, [couponState])

    const handlePaymentChoice = (value) => {
        setIsPaymentOnline(value);
        setActiveButton(value ? 'offline' : 'online');
    };

    const createVnPay = async () => {
        try {
            setLoading(true);
            const taoHD = await axios.post(`${base_url}Invoices`, formik.values, getConfig());
            const response = await axios.post(`${base_url}VnPays/create-payment`,
                {
                    amount: tongTienCuoi,
                    maHD: taoHD.data.id,
                }, getConfig());
            const paymentUrl = response.data;
            setTimeout(() => {
                setLoading(false);
                window.location.replace(paymentUrl);
            }, [300])
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    }
    return (
        <Container className='p-5 w-75 border'>
            <Row className='mb-5'>
                <form onSubmit={formik2.handleSubmit}>
                    <div className='row'>
                        <div className='col-8'>
                            <input type='text'
                                placeholder='Nhập mã giảm giá (chỉ ap dụng 1 lần)'
                                className='w-100 py-2 text-dark'
                                value={formik2.values.code}
                                onChange={formik2.handleChange('code')}
                                onBlur={formik2.handleBlur('code')} />
                            <div className='error'>
                                {
                                    formik2.touched.code && formik2.errors.code
                                }
                            </div>
                        </div>
                        <div className='col-4'>
                            <button
                                type='submit'
                                className="float-right btn btn-danger"
                            >
                                Áp Dụng
                            </button>
                        </div>
                    </div>
                </form>
            </Row>
            <Row>
                <form onSubmit={formik.handleSubmit}>
                    <Row className=''>
                        <p>THÔNG TIN NGƯỜI NHẬN</p>
                        <div className='col-6 d-flex flex-column'>
                            <div className='d-flex flex-column mt-3'>
                                <label className='mt-2 mb-2'>Họ và tên</label>
                                <input
                                    className='p-2 rounded-3 text-dark'
                                    type='text'
                                    name="recipientName"
                                    value={formik.values.recipientName}
                                    onChange={formik.handleChange('recipientName')}
                                    onBlur={formik.handleBlur('recipientName')}
                                />
                                <div className='error'>
                                    {
                                        formik.touched.recipientName && formik.errors.recipientName
                                    }
                                </div>
                            </div>
                            <div className='d-flex flex-column mt-3'>
                                <label className='mt-2 mb-2'>Số điện thoại</label>
                                <input
                                    className='p-2 rounded-3 text-dark'
                                    type='text'
                                    name="recipientPhoneNumber"
                                    value={formik.values.recipientPhoneNumber}
                                    onChange={formik.handleChange('recipientPhoneNumber')}
                                    onBlur={formik.handleBlur('recipientPhoneNumber')}
                                />
                                <div className='error'>
                                    {
                                        formik.touched.recipientPhoneNumber && formik.errors.recipientPhoneNumber
                                    }
                                </div>
                            </div>
                            <div className='d-flex flex-column mt-3'>
                                <label className='mt-2 mb-2'>Nơi nhận hàng</label>
                                <input
                                    className='p-2 rounded-3'
                                    type='text'
                                    name="shippingInfo"
                                    value={formik.values.shippingInfo}
                                    onChange={formik.handleChange('shippingInfo')}
                                    onBlur={formik.handleBlur('shippingInfo')}
                                />
                                <div className='error'>
                                    {
                                        formik.touched.shippingInfo && formik.errors.shippingInfo
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-6 d-flex flex-column p-4'>
                            <label>Lời nhắn</label>
                            <textarea
                                className='rounded-3 text-dark'
                                rows={10}
                                cols={10}
                                name="desc"
                                value={formik.values.desc}
                                onChange={formik.handleChange('desc')}
                                onBlur={formik.handleBlur('desc')}
                            />
                            <div className='error'>
                                {
                                    formik.touched.desc && formik.errors.desc
                                }
                            </div>
                        </div>
                    </Row>
                    <Row className='mt-5'>
                        <p>HÌNH THỨC NHẬN HÀNG</p>
                        <div>
                            <p className='btn p-4 fs-5 border btn-icon active' style={{ marginRight: '20px' }}><CiDeliveryTruck className='fs-2' /><br /> Giao hàng tận nơi</p>
                        </div>
                    </Row>
                    <Row className='mt-5'>
                        <p>HÌNH THỨC THANH TOÁN</p>
                        <div className='d-flex'>
                            <button
                                type='button'
                                className={`btn p-4 fs-5 border btn-icon ${activeButton === 'online' ? 'active' : ''}`}
                                style={{ marginRight: '20px' }}
                                onClick={() => handlePaymentChoice(false)}
                            >
                                <FaMoneyBill className='fs-2' /><br /> Thanh toán khi nhận hàng
                            </button>
                            <button
                                type='button'
                                className={`btn p-4 fs-5 border btn-icon ${activeButton === 'offline' ? 'active' : ''}`}
                                style={{ marginRight: '20px' }}
                                onClick={() => handlePaymentChoice(true)}
                            >
                                <CiCreditCard1 className='fs-2' /><br /> Thanh toán online
                            </button>
                        </div>
                    </Row>
                    <Row className='mt-5'>
                        <div className='d-flex'>
                            <div className='col-6'></div>
                            <div className='col-6'>
                                <div className='d-flex justify-content-end  mb-2'>
                                    <p className='text-end fs-5 text-dark fw-bold me-3 col-6'>Số lượng sản phẩm:</p>
                                    <p className='fs-5 text-danger fw-bold col-3'>{quantityProduct}</p>
                                </div>
                                <div className='d-flex justify-content-end  mb-2'>
                                    <p className='text-end fs-5 text-dark fw-bold me-3 col-6'>Tổng tiền:</p>
                                    <p className='fs-5 text-danger fw-bold col-3 amount'>{FormatData.formatNumber(totalPrice)}</p>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <p className='text-end fs-5 text-dark fw-bold me-3 col-6'>Chiết khấu:</p>
                                    <p className='fs-5 text-danger fw-bold col-3 amount'>{FormatData.formatNumber(tienChietKhau ? (tienChietKhau) : 0)}</p>
                                </div>
                                <div className='d-flex justify-content-end  mb-2'>
                                    <p className='text-end fs-5 text-dark fw-bold me-3 col-6'>Tổng tiền sau chiết khấu:</p>
                                    <p className='fs-5 text-danger fw-bold col-3 amount'>{FormatData.formatNumber(tongTienCuoi)}</p>
                                </div>
                            </div>
                        </div>

                    </Row>
                    <Row className=''>
                        {
                            isPaymentOnline ? (
                                <>
                                    <div className='d-flex flex-column align-items-end justify-content-end'>
                                        <button
                                            type='button'
                                            className='btn text-light bg-danger btn-pay rounded-pill fs-5 mt-4 mb-3'
                                            onClick={() => createVnPay()}
                                        >VNPAY</button>
                                        <PayPalButton className="w-100" invoice={formik.values} />
                                    </div>
                                </>
                            ) : (
                                <div className='d-flex flex-row align-items-end justify-content-end'>
                                    <button type='submit' className='btn text-light bg-danger btn-pay rounded-pill fs-5 mt-4'>THANH TOÁN</button>
                                </div>
                            )
                        }
                    </Row>
                </form>
            </Row>
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

export default Payment