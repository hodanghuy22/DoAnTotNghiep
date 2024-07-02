import { Container, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { GetWishList } from '../../features/wishlists/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../utils/Loading';
import FormatData from '../../utils/FormatData';
const WishLists = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector(state => state?.wishlist?.wishlist);
  const [isLoading, setLoading] = useState(false);
  const [reverseWishList, setreverseWishList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(GetWishList());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  setTimeout(() => {
    if (isLoading) {
      return <Loading />;
    }
    if (wishlistState && wishlistState.length > 0) {
      const reversedWishlist = wishlistState.slice().reverse();
      setreverseWishList(reversedWishlist);
    } else {
      setreverseWishList([]);
    }

  }, 1000)

  const getCategoryLink = (categoryID, name) => {
    switch (categoryID) {
      case 1:
        return `/dien-thoai/${FormatData.removeVietnameseTones(name)}`;
      case 2:
        return `/sac-du-phong/${FormatData.removeVietnameseTones(name)}`;
      case 3:
        return `/tai-nghe-khong-day/${FormatData.removeVietnameseTones(name)}`;
      case 4:
        return `/tai-nghe-co-day/${FormatData.removeVietnameseTones(name)}`;
      default:
        return `/`;
    }
  };
  return (
    <Container>
      <Row>
        <div className='col-12'>
          <p>Sản phẩm bạn yêu thích</p>
        </div>
        <div>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {
              reverseWishList && reverseWishList?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={getCategoryLink(item?.product?.categoryId, item?.product?.name)} className='card text-decoration-none phone-item'>
                      <div className='phone-container p-3'>
                        <img className='phone-image' src={item?.product?.thumnailUrl} alt='chuột' width={'100%'} />
                      </div>
                      <div className='phone-info p-3 border border-top-0'>
                        <p className='fs-6 phone-name d-flex'>{item?.product?.name} {item?.product?.rom}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })
            }

          </Swiper>
          {/* Hiển thị Loading nếu đang tải dữ liệu */}
          {isLoading && <Loading />}
          {/* Nội dung chính của ứng dụng sau khi tải xong */}
          {!isLoading && (
            <div>
            </div>
          )}
        </div>
      </Row>

    </Container>
  )
}

export default WishLists