import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsStar } from 'react-icons/bs';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import '../assets/css/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductPopularByCategogy, resetState } from '../features/products/productSlice';
import formatNumber from '../utils/FormatData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GetSlidehow } from '../features/slideshows/slideshowSlice';
import FormatData from '../utils/FormatData';

const Home = () => {
  const dispatch = useDispatch();
  const slideshowState = useSelector(state => state?.slideshow?.slideshow);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(resetState());
    dispatch(GetSlidehow());
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
    setIsLoading(false);
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

  // const combinedArray = [...phonePopular, ...PDUPopular, ...headphonePopular, ...headphoneTWPopular];
  // const fullArray = Array.from({ length: 24 }, (_, index) => combinedArray[index % combinedArray.length]);
  // console.log(fullArray);
  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
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
                slideshowState && slideshowState?.map((item, index) => {
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
        {/* <Row>
          {fullArray.map((item, index) => (
            <Col xl={1} className="" key={index}>
              <Link></Link>
              <img src={item?.imageUrl} alt={item?.name} width={'64px'} height={'64px'} />
              <p style={{fontSize:'12px'}}>{item?.name}</p>
            </Col>
          ))}
        </Row> */}
        {/* Sản phẩm nổi bật */}
        <Row>
          <Col className='d-flex align-items-center mt-5 mb-5'>
            <p className='text-danger'>KHUYẾN MÃI LỚN</p>
            <h1 className='text-center m-auto'>Điện Thoại Nổi Bật</h1>
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
                    <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                  </div>
                </Link>
              </Col>
            ))
          }

        </Row>
        <Col className='d-flex align-items-center mt-5 mb-5'>
            <p className='text-danger'>KHUYẾN MÃI LỚN</p>
            <h1 className='text-center m-auto'>Tai Nghe Không Dây Nổi Bật</h1>
          </Col>
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
                    <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                  </div>
                </Link>
              </Col>
            ))
          }

        </Row>
        <Col className='d-flex align-items-center mt-5 mb-5'>
            <p className='text-danger'>KHUYẾN MÃI LỚN</p>
            <h1 className='text-center m-auto'>Tai Nghe Nổi Bật</h1>
          </Col>
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
                    <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                  </div>
                </Link>
              </Col>
            ))
          }

        </Row>
        <Col className='d-flex align-items-center mt-5 mb-5'>
            <p className='text-danger'>KHUYẾN MÃI LỚN</p>
            <h1 className='text-center m-auto'>Sạc Dự Phòng Nổi Bật</h1>
          </Col>
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
                    <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
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
    </>
  );
};

export default Home;
