import { Container, Row } from 'react-bootstrap'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { GetWishList, resetState } from '../../features/wishlists/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormatData from '../../utils/FormatData';
const WishLists = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector(state => state?.wishlist?.wishlist);
  useEffect(() => {
    // dispatch(resetState());
    dispatch(GetWishList());
  }, [dispatch]);

  const getCategoryLink = (categoryID,productID) => {
    switch (categoryID) {
      case 1:
        return `/dien-thoai/${productID}`;
      case 2:
        return `/sac-du-phong/${productID}`;
      case 3:
        return `/tai-nghe-khong-day/${productID}`;
      case 4:
        return `/tai-nghe-co-day/${productID}`;
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
              wishlistState && wishlistState?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={getCategoryLink(item?.product?.categoryId,item?.product?.id)} className='card text-decoration-none phone-item'>
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
        </div>
      </Row>
    </Container>
  )
}

export default WishLists