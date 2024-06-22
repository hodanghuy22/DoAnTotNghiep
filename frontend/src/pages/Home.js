import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../assets/css/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductPopularByCategogy } from '../features/products/productSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GetSlidehow } from '../features/slideshows/slideshowSlice';
import FormatData from '../utils/FormatData';
import Loading from '../utils/Loading';
import { GetCoupon } from '../features/coupons/couponSlice';
const Home = () => {
  const dispatch = useDispatch();
  const slideshowState = useSelector(state => state?.slideshow?.slideshow);
  const couponState = useSelector((state) => state?.coupon?.coupon);
  const [isLoading, setLoading] = useState(true);

  const categoryIdToVariableMap = {
    1: "phonePopular",
    2: "PDUPopular",
    3: "headphonePopular",
    4: "headphoneTWPopular"
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch slideshow data
      //await dispatch(resetState());
      await dispatch(GetSlidehow());
      await dispatch(GetCoupon())
      // Fetch product data for different categories
      await Promise.all(
        Object.keys(categoryIdToVariableMap).map(async id => {
          const response = await dispatch(
            GetProductPopularByCategogy({
              id: parseInt(id),
              data: {
                top: 8,
                startDate: '2024-01-01',
                endDate: '2024-12-30'
              }
            })
          );
          const data = response.payload;
          const variableName = categoryIdToVariableMap[id];
          if (variableName) {
            switch (variableName) {
              case "phonePopular":
                setPhonePopular(data);
                break;
              case "PDUPopular":
                setPDUPopular(data);
                break;
              case "headphonePopular":
                setHeadphonePopular(data);
                break;
              case "headphoneTWPopular":
                setHeadphoneTWPopular(data);
                break;
              default:
                break;
            }
          }
        })
      );

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const [phonePopular, setPhonePopular] = useState([]);
  const [PDUPopular, setPDUPopular] = useState([]);
  const [headphonePopular, setHeadphonePopular] = useState([]);
  const [headphoneTWPopular, setHeadphoneTWPopular] = useState([]);

  return (
    <>
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
        <Row>
          {
            couponState && couponState?.map((item, index) => {
              return (
                <p key={index} className='p-5 fs-2 text-center bg-danger '>{item?.title}</p>
              )
            })
          }
        </Row>
        {phonePopular &&
          <Row>
            <Col className='d-flex align-items-center mt-5 mb-5'>
              <h1 className='text-center m-auto'>Điện Thoại Nổi Bật</h1>
              <Link to={'/dien-thoai'} className='btn bg-gray p-2'>Xem tất cả</Link>
            </Col>
          </Row>
        }
        <Row>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {
              phonePopular && phonePopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/dien-thoai/${item?.id}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                        <p>Tình trạng: {(item?.quantity>0)?('Còn hàng'):('Tạm hết')}</p>
                        <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </Row>
        {headphonePopular.length !== 0 && (
          <div>
            <Col className='d-flex align-items-center mt-5 mb-5'>
              <h1 className='text-center m-auto'>Tai Nghe Không Dây Nổi Bật</h1>
              <Link to={'/tai-nghe-khong-day'} className='btn bg-gray p-2'>Xem tất cả</Link>
            </Col>
          </div>
        )}
        <Row>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {
              headphonePopular && headphonePopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/tai-nghe-khong-day/${item?.id}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                        <p>Tình trạng: {(item?.quantity>0)?('Còn hàng'):('Tạm hết')}</p>
                        <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </Row>
        {headphoneTWPopular.length !== 0 && (
          <div>
            <Col className='d-flex align-items-center mt-5 mb-5'>
              <h1 className='text-center m-auto'>Tai Nghe Nổi Bật</h1>
              <Link to={'/tai-nghe-co-day'} className='btn bg-gray p-2'>Xem tất cả</Link>
            </Col>
          </div>
        )}

        <Row>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {
              headphoneTWPopular && headphoneTWPopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/tai-nghe-co-day/${item?.id}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                        <p>Tình trạng: {(item?.quantity>0)?('Còn hàng'):('Tạm hết')}</p>
                        <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </Row>
        {PDUPopular.length !== 0 && (
          <div>
             <Col className='d-flex align-items-center mt-5 mb-5'>
          <h1 className='text-center m-auto'>Sạc Dự Phòng Nổi Bật</h1>
          <Link to={'/sac-du-phong'} className='btn bg-gray p-2'>Xem tất cả</Link>
        </Col>
          </div>
        )}
       
        <Row>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {
              PDUPopular && PDUPopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/sac-du-phong/${item?.id}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                        <p>Tình trạng: {(item?.quantity>0)?('Còn hàng'):('Tạm hết')}</p>
                        <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </Row>
        {/* Hiển thị Loading nếu đang tải dữ liệu */}
        {isLoading && <Loading />}
        {/* Nội dung chính của ứng dụng sau khi tải xong */}
        {!isLoading && (
          <div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
