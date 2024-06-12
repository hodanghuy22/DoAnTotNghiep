import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsStar } from 'react-icons/bs';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import '../assets/css/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductPopularByCategogy, resetState } from '../features/products/productSlice';
import formatNumber from '../utils/formatNumber';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GetSlidehow } from '../features/slideshows/slideshowSlice';

const Home = () => {
  const dispatch = useDispatch();
  const slideshowState = useSelector(state => state?.slideshow?.slideshow);
  useEffect(() => {
    dispatch(resetState());
    dispatch(GetSlidehow())
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetState());
    const categoryIdToVariableMap = {
      1: "phonePopular",
      2: "PDUPopular",
      3: "headphonePopular",
      4: "headphoneTWPopular"
    };

    const fetchData = async (id) => {
      const response = await dispatch(
        GetProductPopularByCategogy({
          id: id,
          data: {
            top: 8,
            startDate: '2024-01-01',
            endDate: '2024-12-30'
          }
        }),
        
      );
      const data = response.payload;
      const variableName = categoryIdToVariableMap[id];
      if (variableName) {
        setVariableByName(variableName, data);
      }
    };
    [1, 2, 3, 4].forEach(id => fetchData(id));

  }, [dispatch]);
  
  const setVariableByName = (name, value) => {
    switch (name) {
      case "phonePopular":
        setPhonePopular(value);
        break;
      case "PDUPopular":
        setPDUPopular(value);
        break;
      case "headphonePopular":
        setHeadphonePopular(value);
        break;
      case "headphoneTWPopular":
        setHeadphoneTWPopular(value);
        break;
      default:
        break;
    }
  };
  // Khai báo các biến state để lưu trữ dữ liệu
  const [phonePopular, setPhonePopular] = useState([]);
  const [PDUPopular, setPDUPopular] = useState([]);
  const [headphonePopular, setHeadphonePopular] = useState([]);
  const [headphoneTWPopular, setHeadphoneTWPopular] = useState([]);

  return (
    <Container>
      <Row>
        <Col className='col-12'>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper text-center"
          >
            {
              slideshowState && slideshowState?.map((item,index) => {
                return (
                  <SwiperSlide key={index} className='d-flex justify-content-center align-items-center p-5'>
                  <Link to={item.contentUrl}><img className='border' src={item.imageUrl} alt='chuột' width={'100%'} /></Link>
                </SwiperSlide>
                )
              })
            }
          </Swiper>
        </Col>

      </Row>
      {/* Danh mục phổ biến */}
      <Row>
        <Col xl={4} className='p-2'>
          <p className='text-danger mt-4'>DANH MỤC HÀNG ĐẦU</p>
          <p className='fs-1 fw-bold'>Danh Mục Phổ Biến</p>
          <p>Electronics stores are renowned for being the first to showcase new gadgets and devices.</p>
          <Button className='bg-danger mt-4'>Khám Phá Ngay </Button>
        </Col>
        <Col xl={8} className='p-2'>
          <Container className='p-0'>
            <Row className='d-flex justify-content-start'>
              {[...Array(8)].map((_, index) => (
                <Col xl={3} className='text-center mt-4' key={index}>
                  <div className='border p-2 '>
                    <IoGameController className='fs-2 rounded-circle' />
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
      {/* Sản phẩm nổi bật */}
      <Row>
        <Col>
          <p className='text-danger'>KHUYẾN MÃI LỚN</p>
          <h1>Điện Thoại Nổi Bật</h1>
        </Col>
      </Row>
      <Row>
        {
          phonePopular && phonePopular.map((item, index) => (
            <Col xl={3} className='p-2 m-0 border-0' key={index}>
              <Link to={`/dtdd/${item?.id}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name d-flex'>{item?.name}</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price amount'>{formatNumber(item?.price)}</p>
                </div>
              </Link>
            </Col>
          ))
        }

      </Row>
      <Row>
        <Col>
          <p className='text-danger'>KHUYẾN MÃI LỚN</p>
          <h1>Tai Nghe Không Dây Nổi Bật</h1>
        </Col>
      </Row>
      <Row>
        {
          headphoneTWPopular && headphoneTWPopular?.map((item, index) => (
            <Col xl={3} className='p-2 m-0 border-0' key={index}>
              <Link to={`/product/${item?.id}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name'>{item?.name}</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price amount'>{formatNumber(item?.price)}</p>
                </div>
              </Link>
            </Col>
          ))
        }

      </Row>
      <Row>
        <Col>
          <p className='text-danger'>KHUYẾN MÃI LỚN</p>
          <h1>Tai Nghe Nổi Bật</h1>
        </Col>
      </Row>
      <Row>
        {
          headphonePopular && headphonePopular?.map((item, index) => (
            <Col xl={3} className='p-2 m-0 border-0' key={index}>
              <Link to={`/product/${item?.id}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name'>{item?.name}</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price amount'>{formatNumber(item?.price)}</p>
                </div>
              </Link>
            </Col>
          ))
        }

      </Row>
      <Row>
        <Col>
          <h1>Sạc Dự Phòng Nổi Bật</h1>
        </Col>
      </Row>
      <Row>
        {
          PDUPopular && PDUPopular?.map((item, index) => (
            <Col xl={3} className='p-2 m-0 border-0' key={index}>
              <Link to={`/product/${item?.id}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name'>{item?.name}</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price amount'>{formatNumber(item?.price)}</p>
                </div>
              </Link>
            </Col>
          ))
        }

      </Row>
      <Row className='justify-content-center mt-4'>
        <Link to={'/product-category/Phone'} className='btn w-25 bg-danger'>
          Xem Tất Cả <i><FaArrowRightLong /></i>
        </Link>
      </Row>
    </Container>
  );
};

export default Home;
