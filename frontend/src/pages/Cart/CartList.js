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
import { Helmet } from 'react-helmet'

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
    }, [dispatch, authState?.id]);

    useEffect(() => {
        let total = 0;
        cartState?.forEach((item) => {
            const itemPrice = (item?.productDetail?.retailPrice) * item?.quantity;
            total += itemPrice;
        });
        setTotalPrice(total);
    }, [cartState]);

    const deleteAProductCart = (e, productName) => {
        dispatch(DeleteCart(e))
        if (authState && authState.id) {
            const userId = authState.id;
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : {};

            if (cart[userId] && cart[userId][productName]) {
                delete cart[userId][productName];
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(`Product '${productName}' deleted from cart for user ${userId}.`);
            } else {
                console.log(`Product '${productName}' not found in cart for user ${userId}.`);
            }
        } else {
            console.log('User not authenticated.');
        }
        setTimeout(() => {
            dispatch(GetCart(authState?.id))
            window.location.reload(false);

        }, 300)
    }
    const handleDecrease = (item) => {
        setProductUpdateDetails(
            {
                id: item?.id,
                userId: item?.userId,
                productId: item?.productDetailId,
                quantity: item.quantity - 1
            }
        )
        //window.location.reload(false);

    }
    const handleIncrease = (item) => {
        setProductUpdateDetails(
            {
                id: item?.id,
                userId: item?.userId,
                productId: item?.productDetailId,
                quantity: item.quantity + 1
            }
        )
        //window.location.reload(false);

    }

    useEffect(() => {
        if (productUpdateDetails !== null) {
            console.log(productUpdateDetails);
            if (productUpdateDetails?.quantity === 0) {
                dispatch(DeleteCart(productUpdateDetails?.id))
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
                }
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
    }, [dispatch, productUpdateDetails, authState?.id])

    const getCategoryLink = (categoryID, productName) => {
        switch (categoryID) {
            case 1:
                return `/dien-thoai/${FormatData.removeVietnameseTones(productName)}`;
            case 2:
                return `/sac-du-phong/${FormatData.removeVietnameseTones(productName)}`;
            case 3:
                return `/tai-nghe-khong-day/${FormatData.removeVietnameseTones(productName)}`;
            case 4:
                return `/tai-nghe-co-day/${FormatData.removeVietnameseTones(productName)}`;
            default:
                return `/`;
        }
    };

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
                <Helmet>
                    <title>Giỏ hàng | HUBI</title>
                </Helmet>
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
                                                <Link to={getCategoryLink(item?.productDetail.product?.categoryId, item?.productDetail.product?.name)} className='fs-45 fw-bold text-decoration-none '>{item?.productDetail?.product?.name} {item?.productDetail?.product?.ram}/{item?.productDetail?.capacity?.totalCapacity}</Link>
                                                <p>Màu {item?.productDetail?.color?.colorName}</p>
                                            </div>
                                            <div style={{ overflowWrap: 'break-word' }} className='uu-dai mt-4'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4 justify-content-end d-flex' style={{ maxHeight: '40px' }}>
                                        <div className='d-flex text-end'>
                                            <div className='d-flex'>
                                                <i className="cart-iconFa"
                                                    // dispatch(UpdateCart({ id: productUpdateDetails?.id, userId: productUpdateDetails?.userId, productId: productUpdateDetails?.productId, quantity: productUpdateDetails?.quantity }))
                                                    onClick={(e) => handleDecrease(item)}
                                                ><FaMinus />
                                                </i>
                                                <p className="mt-2">{item?.quantity}</p>
                                                <i className="cart-iconFa"
                                                    onClick={(e) => handleIncrease(item)}
                                                ><FaPlus />
                                                </i>
                                            </div>
                                        </div>
                                        <p className='fs-5 text-danger fw-bold amount mt-2'>{FormatData.formatNumber(item?.productDetail?.retailPrice)}</p>
                                        <div className='d-flex text-end'>
                                            <i className='fs-3 cart-iconFa bg-transparent p-0 mx-3'>
                                                <MdDeleteForever
                                                    onClick={() => deleteAProductCart(item?.id, item?.productDetail?.product?.name)}
                                                />
                                            </i>
                                        </div>
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