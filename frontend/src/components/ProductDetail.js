import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaPlus, FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import FormatData from '../utils/FormatData';
import { CiHeart } from 'react-icons/ci';
import { FcLike } from 'react-icons/fc';
import Loading from '../utils/Loading';
import { GetCapacitiesByProductId } from '../features/capacitites/capacitySlice';
import { GetProduct, GetProductForUser, GetProductPopularByCategogy, GetSearchProduct } from '../features/products/productSlice';
import { GetColorByProductId } from '../features/colors/colorSlice';
import { AddCart } from '../features/cart/cartSlice';
import { CreateWishList } from '../features/wishlists/wishlistSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CreateComment } from '../features/comment/commentSlice';
import { CreateRating } from '../features/rating/ratingSlice';
import { BsFillSendFill } from 'react-icons/bs';
import StarRating from './StarRating ';

const commentSchema = yup.object({
    content: yup.string().required("Content is required!"),
    hinhPublicId: yup.string(),
    fileHinh: yup.string(),
});
const ratingSchema = yup.object({
    review: yup.string().required("Content is required!"),
    star: yup.number().required("Rating star is required!").min(1).max(5),
});

const ProductDetail = ({ categoryId }) => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.product?.Aproduct);
    const productDetailState = useSelector(state => state?.product?.ProductDetail);
    const productPopular = useSelector(state => state?.product?.productByCategory);
    const { ProductNameUrl } = useParams();
    const [productId, setproductId] = useState(null);

    const authState = useSelector(state => state?.auth?.user);
    const capacities = useSelector(state => state?.capacities?.capacities);
    const colors = useSelector(state => state?.color?.colors);
    const [activeButtonCapacity, setActiveButtonCapacity] = useState(null);
    const [activeButtonColor, setActiveButtonColor] = useState(null);
    const sortedComments = productState?.comments?.slice().sort((a, b) => new Date(b.date) - new Date(a.date)) || [];
    const product = productState;
    const [isLoading, setLoading] = useState(true);
    const [replytVisiable, setReplytVisiable] = useState(false);
    const [replyCommentId, setReplyCommentId] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const location = useLocation();
    const formik = useFormik({
        initialValues: {
            content: '',
            date: FormatData.formatDateVN(),
            userId: authState?.id || "",
            productId: productState?.id || "",
            commentId: "",
        },
        validationSchema: commentSchema,
        onSubmit: values => {
            console.log(values);
            if (authState === null) {
                setShow(true);
            } else {
                setReplytVisiable(false);
                dispatch(CreateComment(values));
                setTimeout(() => {
                    dispatch(GetProduct(productId));
                }, 300);
            }
        },
    });
    const formik2 = useFormik({
        initialValues: {
            userId: authState?.id || "",
            productId: productState?.id || "",
            review: '',
            star: '',
            date: FormatData.formatDateVN(),
        },
        validationSchema: ratingSchema,
        onSubmit: values => {
            console.log(values);
            dispatch(CreateRating(values));
            setTimeout(() => {
                dispatch(GetProduct(productId));
            }, 300);
        },
    });
    const formik3 = useFormik({
        initialValues: {
            content: '',
            userId: authState?.id || "",
            productId: productState?.id || "",
            commentId: "",
            date: FormatData.formatDateVN(),
        },
        validationSchema: commentSchema,
        onSubmit: values => {
            console.log(values);
            if (authState === null) {
                setShow(true);
            }
            if (authState !== null) {
                setReplytVisiable(false);
                dispatch(CreateComment(values));
                setTimeout(() => {
                    dispatch(GetProduct(productId));
                }, 300);
            }

        },
    });
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log(FormatData.replaceHyphensWithSpaces(ProductNameUrl))
                await dispatch(GetSearchProduct({
                    searchQuery: FormatData.replaceHyphensWithSpaces(ProductNameUrl)
                })).then(response => {
                    if (ProductNameUrl) {
                        for (let item of response.payload) {
                            if (item.name.length === ProductNameUrl.length) {
                                setproductId(item.id);
                                break;
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, ProductNameUrl]);
    
    useEffect(() => {
        if (productId) { // Chỉ chạy nếu productId đã được thiết lập
            const fetchData = async () => {
                setLoading(true);
                try {
                    await dispatch(GetCapacitiesByProductId(productId));
                    await dispatch(GetProduct(productId));
                    await dispatch(GetColorByProductId(productId));
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [dispatch, productId]);
    

    const [AProduct, setAProduct] = useState({
        productId: productState?.id,
        colorId: colors[0]?.id,
        capacityId: (capacities.length !== 0) ? (capacities[0]?.id) : (0)
    });
    // Cập nhật AProduct khi productState thay đổi
    useEffect(() => {
        setAProduct({
            productId: productState?.id,
            colorId: colors?.id,
            capacityId: (capacities.length !== 0) ? (productDetailState?.capacityId) : (0)
        });
        formik.setFieldValue("productId", productState?.id);
        formik2.setFieldValue("productId", productState?.id);
        formik3.setFieldValue("productId", productState?.id);
    }, [productState]);

    // Khởi tạo sản phẩm ban đầu

    // Lấy sản phẩm mới sau khi chọn màu và rom
    useEffect(() => {
        const fetchData = async () => {
            if (AProduct.productId && AProduct.colorId && AProduct.capacityId) {
                setLoading(true);
                try {
                    await dispatch(GetProductForUser(AProduct));
                    dispatch(
                        GetProductPopularByCategogy({
                            id: productState?.categoryId,
                            data: {
                                top: 4,
                                startDate: '2024-01-01',
                                endDate: '2024-12-30'
                            }
                        })
                    );
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
            if (AProduct.productId && AProduct.colorId && capacities.length === 0) {
                setLoading(true);
                try {
                    await dispatch(GetProductForUser(AProduct));
                    dispatch(
                        GetProductPopularByCategogy({
                            id: productState?.categoryId,
                            data: {
                                top: 4,
                                startDate: '2024-01-01',
                                endDate: '2024-12-30'
                            }
                        })
                    );
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                  
                }
            }
        };
        fetchData();
    }, [dispatch, AProduct, capacities.length]);

    useEffect(() => {
        if (productState?.productDetails && productState.productDetails.length > 0) {
            setAProduct(prevState => ({
                ...prevState,
                colorId: colors[0]?.id,
                capacityId: (capacities.length !== 0) ? (capacities[0]?.id) : (0)
            }));
        }
        if (capacities && capacities.length > 0) {
            setActiveButtonCapacity(capacities[0].id);
        }
        if (colors && colors.length > 0) {
            setActiveButtonColor(colors[0].id);
        }
    }, [dispatch, productState, capacities, colors]);

    const handleColorSelection = (colorId) => {
        setAProduct(prevState => ({
            ...prevState,
            colorId: colorId
        }));
        setActiveButtonColor(colorId);
    };

    const handleCapacitySelection = (capacityId) => {
        setAProduct(prevState => ({
            ...prevState,
            capacityId: (capacities.length !== 0) ? (capacityId) : (0)
        }));
        setActiveButtonCapacity(capacityId);
    };
    setTimeout(() => {
        if (isLoading) {
            return <Loading />;
        }
    }, 1000)
    const addCart = () => {
        if (authState === null) {
            setShow(true);
        }
        return (
            dispatch(AddCart({
                userId: authState?.id,
                productDetailId: productDetailState?.id,
                quantity: 1
            }))
        )
    }
    // THêm yêu thích
    const AddWishList = () => {
        if (authState === null) {
            setShow(true);
        }
        dispatch(CreateWishList({
            userId: authState?.id,
            productId: productState?.id,
        }))
    }
    // Load bản thông tin kỹ thuật
    const renderSpecifications = (specifications) => {
        return (
            <ul className="technical-content rounded-3">
                {specifications.map((spec, index) => (
                    <li
                        key={index}
                        className={`d-flex align-items-center justify-content-between p-2 ${index % 2 === 0 ? 'bg-light' : ''}`}
                    >
                        <div className='col-6'>{spec.label}:</div>
                        <div className='col-6'>{spec.value}</div>
                    </li>
                ))}
            </ul>
        );
    };
    let specifications = [];
    switch (categoryId) {
        case 1:
            specifications = [
                { label: 'Kích thước màn hình', value: `${product?.size} inch` },
                { label: 'Công nghệ màn hình', value: product?.screen },
                { label: 'Camera sau', value: product?.rearCamera },
                { label: 'Camera trước', value: product?.frontCamera },
                { label: 'Chipset', value: product?.chip },
                { label: 'Dung lượng RAM', value: product?.ram },
                { label: 'Bộ nhớ trong', value: product?.rom },
                { label: 'Pin', value: `${product?.battery} ${product?.chargingEfficiency}` },
                { label: 'Hệ điều hành', value: product?.os },
                { label: 'Trọng lượng', value: product?.weight },
                { label: 'Hãng', value: product?.brand?.title },
            ];
            break;
        case 2:
            specifications = [
                { label: 'Dung lượng pin', value: product?.battery },
                { label: 'Hiệu suất sạc', value: `${(product?.chargingEfficiency * 100).toFixed(0)}%` },
                { label: 'Lõi pin', value: product?.batteryCore },
                { label: 'Công nghệ/Tiện ích', value: product?.features },
                { label: 'Thời gian sạc đầy pin', value: product?.chargingTime },
                { label: 'Nguồn vào', value: product?.input },
                { label: 'Nguồn ra', value: product?.output },
                { label: 'Kích thước', value: product?.size },
                { label: 'Trọng lượng', value: product?.weight },
                { label: 'Hãng', value: product?.brand?.title },
            ];
            break;
        case 3:
            specifications = [
                { label: 'Thời lượng pin tai nghe', value: `${product?.battery} ${product?.chargingTime}` },
                { label: 'Thời lượng pin hộp sạc', value: product?.chargingCase },
                { label: 'Tương thích', value: product?.accessibility },
                { label: 'Cổng sạc', value: product?.input },
                { label: 'Công nghệ âm thanh', value: product?.audioTechnology },
                { label: 'Kích thước', value: product?.size },
                { label: 'Công nghệ kết nối', value: product?.connectivity },
                { label: 'Hãng', value: product?.brand?.title },
            ];
            break;
        case 4:
            specifications = [
                // { label: 'Công nghệ âm thanh', value: product?.audioTechnology },
                { label: 'Tương thích', value: product?.accessibility },
                { label: 'Jack cắm', value: product?.input },
                { label: 'Điều khiển bằng', value: product?.controls },
                { label: 'Kết nối cùng lúc', value: product?.connectivity },
                { label: 'Trọng lượng', value: product?.weight },
                { label: 'Hãng', value: product?.brand?.title },
            ];
            break;
        default:
            return null;
    }
    const handleReplyClick = (commentId) => {
        setReplytVisiable(true);
        setReplyCommentId(commentId);
        formik3.setFieldValue("commentId", commentId)
    };
    const getCategoryPath = (categoryId) => {
        switch (categoryId) {
            case 1:
                return '/dien-thoai';
            case 2:
                return '/sac-du-phong';
            case 3:
                return '/tai-nghe-khong-day';
            case 4:
                return '/tai-nghe-co-day';
            default:
                return '/';
        }
    };
    return (
        <Container>
            <Row>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item "><Link className='text-decoration-none' to="/">Trang Chủ</Link></li>
                        <li className="breadcrumb-item "><Link className='text-decoration-none' to={`/${FormatData.removeVietnameseTones(product?.category?.title)}`}>{product?.category?.title}</Link></li>
                        <li className="breadcrumb-item  active" aria-current="page"><Link className='text-decoration-none'>{product?.name}</Link></li>
                    </ol>
                </nav>
            </Row>
            <Row>
                <Col className='d-flex flex-row'>
                    <h3>{product?.category?.title} {product?.name} {product?.rom}</h3>
                    <h5 className='mt-2 mx-2'>Đã bán: {product?.soldQuantity}</h5>
                    <h5 className='mt-2 mx-2'>SL kho: {productDetailState?.quantity}</h5>
                    <Link to={`/so-sanh${getCategoryPath(product?.categoryId)}/${FormatData.removeVietnameseTones(product?.name)}`} className='ml-3 text-decoration-none ' >
                        <p className='mx-4 mt-2 '><FaPlus /> So Sánh</p>
                    </Link>
                    <Link className='ml-2' onClick={AddWishList}>
                        <div className="icon-container">
                            <CiHeart className="icon heart-outline" />
                            <FcLike className="icon heart-filled" />
                        </div>
                    </Link>
                </Col>
            </Row>
            <Row>

                <Col className='w-50 p-5'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper text-center"
                    >
                        {
                            product?.images?.map((item, index) => (
                                <SwiperSlide key={index} className='d-flex justify-content-center align-items-center p-5'>
                                    <img className='' src={item.imageUrl} alt='chuột' width={'100%'} height={'100%`'} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Col>
                <Col className='w-50'>
                    <Row>
                        <Col>
                            {
                                capacities?.map((item, index) => (
                                    <Button
                                        className={`${activeButtonCapacity === item?.id ? 'bg-danger text-light' : 'bg-transparent text-dark border-dark'}`}
                                        style={{ marginRight: '8px' }}
                                        key={index}
                                        onClick={() => handleCapacitySelection(item?.id)}
                                    >
                                        {item.totalCapacity}GB
                                    </Button>
                                ))
                            }
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col>
                            {
                                colors && colors?.map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            className={`${activeButtonColor === item?.id ? 'bg-danger text-light' : 'bg-transparent text-dark border-dark'}`}
                                            style={{ marginRight: '8px' }}
                                            onClick={() => handleColorSelection(item?.id)}
                                        >
                                            {item.colorName}
                                        </Button>

                                    )
                                })
                            }
                        </Col>
                    </Row>
                    <p className='text-danger fw-bold fs-5 '> <span className='amount'> {FormatData.formatNumber(productDetailState?.retailPrice)}</span> <span className='text-dark fs-6'>(+Đã bao gồm 15% VAT)</span></p>
                    <div>
                        {productState?.desc}
                    </div>
                    <div className="d-flex justify-content-start">
                        <div className='p-2'>
                            <Button onClick={(e) => addCart()} variant='danger'>Thêm vào giỏ hàng</Button>
                        </div>
                    </div>

                </Col>
            </Row>
            {/* Sản phẩm tương tự */}
            <Row className='mt-5 mb-5'>
                <Col className='col-12 text-center'>
                    <p className='fs-3'>Sản phẩm tương tự</p>
                </Col>
                {
                    productPopular && productPopular?.map((item, index) => {
                        return (
                            <Col className='col-3' key={index}>
                                <Link to={`${getCategoryPath(categoryId)}/${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
                                    <div className='phone-container p-3'>
                                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                                    </div>
                                    <div className='phone-info p-3 border border-top-0'>
                                        <p className='fs-5 phone-name'>{item?.name}</p>
                                        <p>Tình trạng: {(item?.quantity > 0) ? ('Còn hàng') : ('Tạm hết')}</p>
                                        <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                                    </div>
                                </Link>
                            </Col>
                        )
                    })
                }
            </Row>
            <Row>
                <Col className='col-7'>
                    {/* Đánh giá sản phẩm */}
                    <Container className='bg-light shadow p-3 mb-5 bg-white rounded  mt-3'>
                        <Row>
                            <Col>
                                <div className=' my-2 rounded-lg py-3 px-3'>
                                    <h2 className='text-danger'>Đánh giá sản phẩm</h2>
                                    <p>Điểm đánh giá: {productState?.averageRating} <span className='text-warning fs-5'>&#9733;</span></p>
                                    <div>
                                        <Form onSubmit={formik2.handleSubmit}>
                                            <Row className="flex flex-wrap">
                                                <Col className="mb-3 ">
                                                    <div className='mb-3'>
                                                        <StarRating
                                                            value={formik2.values.star}
                                                            onChange={value => formik2.setFieldValue('star', value)}
                                                        />
                                                        <div className='error'>
                                                            {formik2.touched.star && formik2.errors.star}
                                                        </div>
                                                    </div>
                                                    <Form.Group className="">
                                                        <Form.Control
                                                            as="textarea"
                                                            className="rounded-lg"
                                                            id="mantine-r8"
                                                            placeholder="Nhận xét về sản phẩm"
                                                            rows="6"
                                                            aria-invalid="false"
                                                            value={formik2.values.review}
                                                            onChange={formik2.handleChange('review')}
                                                            onBlur={formik2.handleBlur('review')}
                                                            style={{ borderRadius: '30px' }}
                                                        />
                                                        <div className='error'>
                                                            {formik2.touched.content && formik2.errors.content}
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="text-white cursor-pointer mt-2 "
                                                    style={{ width: '100%', height: '44px' }}
                                                >
                                                    Gửi đánh giá
                                                </Button>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                                {
                                    productState && productState?.ratings?.map((item, index) => {
                                        return (
                                            <div key={index} className='mt-4'>
                                                <div className='d-flex  '>
                                                    <div className='avatar overflow-hidden'>
                                                        <FaUser style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'gray', padding: '10px', marginRight: '10px', marginTop: '4px' }} />
                                                    </div>
                                                    <div className='flex-column pl-2 '>
                                                        <div className='d-flex '>
                                                            <p className=''>{item?.name}</p>
                                                            <span style={{ display: 'inline-block', direction: '1tr' }} className='mx-2'>
                                                                {
                                                                    item && typeof item.star === 'number' && item.star > 0 && (
                                                                        Array.from({ length: 5 }).map((_, index) => (
                                                                            <span
                                                                                key={index}
                                                                                style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}
                                                                                className={index < item.star ? 'text-warning' : 'text-muted'}>
                                                                                &#9733;
                                                                            </span>
                                                                        ))
                                                                    )
                                                                }


                                                            </span>
                                                            <p className="text-brow mx-2">{FormatData.formatDateTime(item?.date)}</p>
                                                        </div>
                                                        <div className="d-flex ">
                                                            <p className="">
                                                                <span className=" mx-2">{item?.review}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </Col>
                        </Row>
                    </Container>
                    {/* Bình luận */}
                    <Container className='bg-light shadow p-3 mb-5 bg-white rounded '>
                        <Row>
                            <Col>
                                <div className=' my-2 rounded-lg py-3 px-3'>
                                    <div className='flex-column'>
                                        <h4 className='text-danger p-0'>Bình luận</h4>
                                        <div className='mb-5'>
                                            <Form onSubmit={formik.handleSubmit}>
                                                <Row className="flex flex-wrap my-2">
                                                    <Col md={10} className="mb-3">
                                                        <Form.Group className="">
                                                            <Form.Control
                                                                as="textarea"
                                                                className="rounded-lg"
                                                                id="mantine-r8"
                                                                placeholder="Nhận xét về sản phẩm"
                                                                rows="6"
                                                                aria-invalid="false"
                                                                value={formik.values.content}
                                                                onChange={formik.handleChange('content')}
                                                                onBlur={formik.handleBlur('content')}
                                                            />
                                                            <div className='error'>
                                                                {
                                                                    formik.touched.content && formik.errors.content
                                                                }
                                                            </div>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2} className="flex flex-col">
                                                        <Button
                                                            variant="primary"
                                                            type="submit"
                                                            className="cursor-pointer mt-2"
                                                            style={{ width: '100%', height: '44px' }}
                                                            onClick={formik.handleSubmit} // Ensure handleSubmit is called on button click
                                                        >
                                                            Gửi
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>

                                        </div>
                                        {
                                            sortedComments && sortedComments?.map((item, index) => {
                                                if (item?.commentId === null) {
                                                    return (
                                                        <div className='pt-4 w-100 border-bottom' key={index}>
                                                            <div className='d-flex'>
                                                                <div className='flex-column w-100'>
                                                                    <div className='d-flex ml-4'>
                                                                        <h5>{authState?.name}</h5>
                                                                        <p className="mx-2">{FormatData.formatDateTime(item?.date)}</p>
                                                                    </div>
                                                                    <div className=" shadow-lg ml-4 p-3  mb-2 bg-white">
                                                                        <p className="fw-bold">
                                                                            <span className=" mx-2 ">{item?.content}</span>
                                                                        </p>
                                                                    </div>
                                                                    <div className='d-flex justify-content-end'>
                                                                        <p className='btn bg-danger text-light' onClick={() => handleReplyClick(item.id)}>
                                                                            <BsFillSendFill className='mx-1' />
                                                                            Trả lời
                                                                        </p>
                                                                    </div>
                                                                    {replytVisiable && replyCommentId === item.id && (
                                                                        <Form onSubmit={formik3.handleSubmit}>
                                                                            <Row className="flex flex-wrap my-2">
                                                                                <Col md={10} className="mb-3">
                                                                                    <Form.Group className="">
                                                                                        <Form.Control
                                                                                            as="textarea"
                                                                                            className="rounded-lg"
                                                                                            id="mantine-r8"
                                                                                            placeholder="Nhận xét về sản phẩm"
                                                                                            rows="6"
                                                                                            aria-invalid="false"
                                                                                            value={formik3.values.content}
                                                                                            onChange={formik3.handleChange('content')}
                                                                                            onBlur={formik3.handleBlur('content')}
                                                                                        />
                                                                                        <div className='error'>
                                                                                            {
                                                                                                formik3.touched.content && formik3.errors.content
                                                                                            }
                                                                                        </div>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col md={2} className="flex flex-col">
                                                                                    <Button
                                                                                        variant="primary"
                                                                                        type="submit"
                                                                                        className="text-white cursor-pointer mt-2"
                                                                                        style={{ width: '100%', height: '44px' }}
                                                                                    >
                                                                                        Gửi
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </Form>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {
                                                                item && item?.childComments?.map(i => {
                                                                    return (
                                                                        <div className='' key={i.id} style={{ marginLeft: '3rem' }}>
                                                                            <div className='d-flex'>
                                                                                <p>{authState?.name}</p>
                                                                                <p className="text-brow text-sm mx-2">{FormatData.formatDateTime(i?.date)}</p>
                                                                            </div>
                                                                            <div className='flex-column w-100'>
                                                                                <div className="d-flex shadow mb-5 bg-white  rounded">
                                                                                    <p className="">
                                                                                        <span className="mx-2">{i?.content}</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className='col-5 mt-3'>
                    <div className='shadow p-3 mb-5 bg-body rounded-3'>
                        <div className=" ">
                            <h2 className="mb-3">Thông số kỹ thuật</h2>
                        </div>
                        {renderSpecifications(specifications)}
                    </div>
                </Col>

            </Row>

            {!isLoading && (
                <div>
                </div>
            )}
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center mb-4'>
                        <h3 >E-HUBI</h3>
                    </div>
                    <h6 className='text-center'>Vui lòng đăng nhập tài khoản để tiếp tục</h6>
                </Modal.Body>
                <div className='d-flex flex-row p-4 m-0'>
                    <Link
                        to={'/signup'}
                        state={{ from: location }}
                        className='text-decoration-none btn w-50 p-2 m-2 bg-light text-danger border-danger fw-bold rounded-3'>
                        Đăng Ký
                    </Link>
                    <Link
                        to={'/login'}
                        state={{ from: location }}
                        className='text-decoration-none btn w-50 p-2 m-2 bg-danger border-light fw-bold rounded-3 text-light'
                    >
                        Đăng Nhập
                    </Link>
                </div>
            </Modal>
        </Container>
    )
}

export default ProductDetail