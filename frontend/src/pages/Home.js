import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
import { Helmet } from 'react-helmet';
const Home = () => {
  const dispatch = useDispatch();
  const slideshowState = useSelector(state => state?.slideshow?.slideshow);
  const couponState = useSelector((state) => state?.coupon?.coupon);
  const [isLoading, setLoading] = useState(true);
  // Tạo danh sách các sản phẩm bán chạy theo loại
  const categoryIdToVariableMap = {
    1: "phonePopular",
    2: "PDUPopular",
    3: "headphonePopular",
    4: "headphoneTWPopular"
  };
  // Hàm lấy danh sách sản phẩm bán chạy và lưu vào categoryIdToVariableMap
  const fetchData = async () => {
    setLoading(true);
    try {
      await dispatch(GetSlidehow());
      await dispatch(GetCoupon())
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
        <Helmet>
          <title>Hubishop.com | HUBI</title>
        </Helmet>
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
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper pb-5"
          >
            {
              couponState && couponState?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <p key={index} className='p-5 fs-2 text-center ' style={{ backgroundColor: '#FAFFAF', color: '#96C9F4' }}>{item?.title}</p>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
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
            className="mySwiper pb-5"
          >
            {
              phonePopular && phonePopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/dien-thoai/${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3 d-flex'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                        <p className='rounded-circle border-dark'>{(item?.averageRating === 0) ? 5 : item?.averageRating}<span className='text-warning fs-5 mx-1'>&#9733;</span></p>
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <p>Số lượng: {item?.quantity}</p>
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
            className="mySwiper pb-5"
          >
            {
              headphonePopular && headphonePopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/tai-nghe-khong-day/${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3 d-flex'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                        <p className='rounded-circle border-dark'>{(item?.averageRating === 0) ? 5 : item?.averageRating}<span className='text-warning fs-5 mx-1'>&#9733;</span></p>
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <p>Số lượng: {item?.quantity}</p>
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
            className="mySwiper pb-5"
          >
            {
              headphoneTWPopular && headphoneTWPopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/tai-nghe-co-day/${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3 d-flex'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                        <p className='rounded-circle border-dark'>{(item?.averageRating === 0) ? 5 : item?.averageRating}<span className='text-warning fs-5 mx-1'>&#9733;</span></p>
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <p>Số lượng: {item?.quantity}</p>
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
            className="mySwiper pb-5"
          >
            {
              PDUPopular && PDUPopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/sac-du-phong/${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3 d-flex'>
                        <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                        <p className='rounded-circle border-dark'>{(item?.averageRating === 0) ? 5 : item?.averageRating}<span className='text-warning fs-5 mx-1'>&#9733;</span></p>
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-5 phone-name'>{item?.name}</p>
                        <p>Số lượng: {item?.quantity}</p>
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
