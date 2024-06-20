import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './../../assets/css/cart.css'
import { DeleteCart, GetCart, UpdateCart } from '../../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import FormatData from '../../utils/FormatData';
import Loading from '../../utils/Loading'
import cartIcon from './../../assets/images/shopping-trolley.png'

const CartList = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state?.auth?.user);
    const cartState = useSelector((state) => state?.cart?.carts);
    const [productUpdateDetails, setProductUpdateDetails] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
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
    }, [dispatch]);

    useEffect(() => {
        let total = 0;
        cartState?.forEach((item) => {
            const itemPrice = (item?.productDetail?.retailPrice) * item?.quantity;
            total += itemPrice;
        });
        setTotalPrice(total);
    }, [cartState]);

    const deleteAProductCart = (e) => {
        dispatch(DeleteCart(e))
        setTimeout(() => {
            dispatch(GetCart(authState?.id))
        }, 300)
    }


    useEffect(() => {
        if (productUpdateDetails !== null) {
            console.log(productUpdateDetails);
            if (productUpdateDetails?.quantity === 0) {
                dispatch(DeleteCart(productUpdateDetails?.id))
            }
            else {
                dispatch(UpdateCart(
                    {
                        id: productUpdateDetails?.id,
                        userId: productUpdateDetails?.userId,
                        ProductDetailId: productUpdateDetails?.productId,
                        quantity: productUpdateDetails?.quantity
                    }
                ))
            }
            setTimeout(() => {
                dispatch(GetCart(authState?.id))
            }, 300);
        }
    }, [productUpdateDetails])


    return (
        <>
            {
                cartState.length <= 0 && (
                    <div className='text-center p-5' style={{ display: "block" }}>
                        <div className='icon-cart'><img src={cartIcon} alt='gio hang' width={'20%'} /></div>
                        <p>Rất tiếc, không có sản phẩm nào trong giỏ hàng</p>
                        <Link to="/" className='btn btn-outline-primary w-50 bg-light text-primary bold'>Về trang chủ</Link>
                    </div>
                )
            }
            <Container className='p-5 w-75 border'>
                <Row>
                    {
                        cartState && cartState?.map((item, index) => {
                            return (
                                <div className='cart-item d-flex container border-bottom mb-5' key={index}>
                                    <div className='col-8 d-flex'>
                                        <div className=''>
                                            <img src={item?.productDetail?.product?.thumnailUrl} alt='laptop' width={'150px'} />
                                        </div>
                                        <div className='p-3'>
                                            <div className=''>
                                                <p className='fs-45 fw-bold'>{item?.productDetail?.product?.name} {item?.productDetail?.product?.ram}/{item?.productDetail?.capacity?.totalCapacity}</p>
                                                <p>Màu {item?.productDetail?.color?.colorName}</p>
                                            </div>
                                            <div style={{ overflowWrap: 'break-word' }} className='uu-dai mt-4'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4 justify-content-end d-flex' style={{ maxHeight: '40px' }}>
                                        <div className='d-flex text-end'>
                                            <i className='fs-3 cart-iconFa bg-transparent p-0 mx-0'>
                                                <MdDeleteForever
                                                    onClick={() => deleteAProductCart(item?.id)}
                                                />
                                            </i>
                                            <div className='d-flex'>
                                                <i className="cart-iconFa"
                                                    // dispatch(UpdateCart({ id: productUpdateDetails?.id, userId: productUpdateDetails?.userId, productId: productUpdateDetails?.productId, quantity: productUpdateDetails?.quantity }))
                                                    onClick={(e) => setProductUpdateDetails({ id: item?.id, userId: item?.userId, productId: item?.productDetailId, quantity: item.quantity - 1 })}
                                                ><FaMinus />
                                                </i>
                                                <p className="mt-2">{item?.quantity}</p>
                                                <i className="cart-iconFa"
                                                    onClick={(e) => setProductUpdateDetails({ id: item?.id, userId: item?.userId, productId: item?.productDetailId, quantity: item.quantity + 1 })}
                                                ><FaPlus />
                                                </i>
                                            </div>
                                        </div>
                                        <p className='fs-5 text-danger fw-bold amount'>{FormatData.formatNumber(item?.productDetail?.retailPrice)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Row>

                {
                    cartState.length > 0 && (
                        <Row className='d-flex flex-row justify-content-around'>
                            <div className='col-6 d-flex'>
                                <p className='fs-4'>Tạm tính: </p>
                                <p className='fs-4 text-danger fw-bold mx-3 amount'>{FormatData.formatNumber(totalPrice)}</p>
                            </div>
                            <div className='col-3'>
                                <Link to={'/payment'} className='text-decoration-none text-light bg-danger btn-pay rounded-pill fs-5 mt-4 px-5'>MUA NGAY</Link>
                            </div>
                        </Row>
                    )
                }


                {/* Hiển thị Loading nếu đang tải dữ liệu */}
                {isLoading && <Loading />}
                {/* Nội dung chính của ứng dụng sau khi tải xong */}
                {!isLoading && (
                    <div>
                    </div>
                )}
            </Container>
        </>
    )
}

export default CartList