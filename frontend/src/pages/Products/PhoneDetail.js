import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { BsStar } from 'react-icons/bs';
import { GetProduct, resetState } from '../../features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GetCapacitiesByProductId } from '../../features/capacitites/capacitySlice';
import { GetColorByProductId } from '../../features/colors/colorSlice';
import { AddCart } from '../../features/cart/cartSlice';
import formatNumber from '../../utils/FormatData';
import FormatData from '../../utils/FormatData';
import { CreateWishList } from '../../features/wishlists/wishlistSlice';
import { FcLike } from 'react-icons/fc';
import { CiHeart } from 'react-icons/ci';

const Detail = () => {
  const dispatch = useDispatch();
  const productState = useSelector(state => state?.product?.Aproduct);
  const authState = useSelector(state => state?.auth?.user);
  const capacities = useSelector(state => state?.capacities?.capacities);
  const colors = useSelector(state => state?.color?.colors);
  const { productId } = useParams();
  const product = productState;

  useEffect(() => {
    dispatch(resetState());
    dispatch(GetCapacitiesByProductId(productId));
    dispatch(GetProduct(productId));
    dispatch(GetColorByProductId(productId));

  }, [dispatch, productId]);


  const addCart = () => {
    dispatch(AddCart({
      userId: authState?.id,
      productDetailId: productState?.productDetails[0]?.id,
      quantity: 1
    }))

  }
  const AddWishList = () => {
    dispatch(CreateWishList({
      userId: authState?.id,
      phoneId: productState?.id,
    }))
  }
  return (
    <div>
      <Container>
        <Row>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item "><Link className='text-decoration-none' to="/">Trang Chủ</Link></li>
              <li className="breadcrumb-item "><Link className='text-decoration-none' to={'/dtdd'}>Điện thoại</Link></li>
              <li className="breadcrumb-item  active" aria-current="page"><Link className='text-decoration-none'>{product?.name}</Link></li>
            </ol>
          </nav>
        </Row>
        <Row>
          <Col className='d-flex flex-row'>
            <h3>Điện thoại {product?.name} {product?.rom}</h3>
            <Link to="/so-sanh" className='ml-3 text-decoration-none ' >
              <p className='mx-4 mt-1 '><FaPlus /> So Sánh</p>
            </Link>
            <Link className='ml-3' onClick={AddWishList}>
              <div className="icon-container">
                <CiHeart className="icon heart-outline" />
                <FcLike className="icon heart-filled" />
              </div>
            </Link>
          </Col>
        </Row>
        <Row>

          <Col className='col-8'>
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
                    <img className='' src={item.imageUrl} alt='chuột' width={'100%'} height={'100%`'} style={{maxHeight:'500px'}}/>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </Col>
          <Col className='col-4'>
            <Row className='mt-5'>
              <Col>
                {
                  capacities?.map((item, index) => (
                    <Button variant="outline-light" className="bg-transparent text-dark border-dark" style={{ marginRight: '8px' }} key={index}>
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
                        className='bg-transparent text-dark border-dark' style={{ marginRight: '8px' }}
                      >
                        {item.colorName}
                      </Button>

                    )
                  })
                }
              </Col>
            </Row>
            <p className='text-danger fw-bold fs-5 '> <span className='amount'>{FormatData.formatNumber(product?.productDetails[0]?.retailPrice)}</span> <span className='text-dark fs-6'>(+Đã bao gồm 15% VAT)</span></p>
            <p>This Bluetooth speaker has various features such as water resistance, long battery life, built-in microphones for hands-free calling, and more.</p>
            <ul>
              <li>Model: UB7OM</li>
              <li>Dynamic Bass Boost Drivers and Dual Passive Radiators</li>
              <li>2 x 14W Output Power</li>
              <li>IP67 Dustproof & Waterproof</li>
              <li>Convenient Hands-Free Calling</li>
            </ul>
            <div className="d-flex justify-content-start">
              {/* <div className='p-2'>
                <Button variant="outline-light" className="bg-light text-dark"><FaMinus /></Button>
                <Button variant="outline-light" className="bg-light text-dark">1</Button>
                <Button variant="outline-light" className="bg-light text-dark"><FaPlus /></Button>
              </div> */}
              <div className='p-2'>
                {/* <Button variant='danger'>Thêm vào giỏ hàng</Button> */}
                <Button onClick={(e) => addCart()} variant='danger'>Thêm vào giỏ hàng</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col className='col-12'>
            <p className='fs-3 text-center'>Sản phẩm tương tự</p>
          </Col>
          <Col className='d-flex flex'>
            <Link to='/product/1' className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
          </Col>
          <Col className='d-flex flex'>
            <Link to='/product/1' className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
          </Col>
          <Col className='d-flex flex'>
            <Link to='/product/1' className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
          </Col>
          <Col className='d-flex flex'>
            <Link to='/product/1' className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className='col-7'>

          </Col>
          <Col className='col-5' >
            <div className='shadow p-3 mb-5 bg-body rounded-3-'>
              <div className="is-flex is-justify-content-space-between is-align-items-center"><h2 className="title is-6 mb-3">Thông số kỹ thuật</h2>
              </div>
              <ul className="technical-content rounded-3">
                <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                  <div className='col-6'>Kích thước màn hình</div>
                  <div className='col-6'>{product?.size} inch</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2">
                  <div className='col-6'>Công nghệ màn hình</div>
                  <div className='col-6'>{product?.screen}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                  <div className='col-6'>Camera sau</div>
                  <div className='col-6'>{product?.rearCamera}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2">
                  <div className='col-6'>Camera trước</div>
                  <div className='col-6'>{product?.frontCamera}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                  <div className='col-6'>Chipset</div>
                  <div className='col-6'>{product?.chip}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2">
                  <div className='col-6'>Dung lượng RAM</div>
                  <div className='col-6'>{product?.ram}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                  <div className='col-6'>Bộ nhớ trong</div>
                  <div className='col-6'>{product?.rom}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2">
                  <div className='col-6'>Pin</div>
                  <div className='col-6'>{product?.battery}  {product?.chargingEfficiency}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                  <div className='col-6'>Hệ điều hành</div>
                  <div className='col-6'>{product?.os}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2">
                  <div className='col-6'>Trọng lượng</div>
                  <div className='col-6'>{product?.weight}</div>
                </li>
                <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                  <div className='col-6'>Hãng</div>
                  <div className='col-6'>{product?.brand?.title}</div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Detail;
