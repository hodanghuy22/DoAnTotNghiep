import React from 'react'
import { Breadcrumb, Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { BsStar } from 'react-icons/bs';
const Detail = () => {
 
  return (
    <div>
      <Container>
        <Row>
          <Breadcrumb >
            <Breadcrumb.Item className='text-dark'><Link to={'/'} >Trang chủ</Link></Breadcrumb.Item>
            <Breadcrumb.Item active className='text-dark'><Link to={'/product-category/Phone'}>Sản phẩm</Link></Breadcrumb.Item>
            <Breadcrumb.Item active className='text-dark'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</Breadcrumb.Item>
          </Breadcrumb>
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
              className="mySwiper"
            >
              <SwiperSlide>
                <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              </SwiperSlide>
              <SwiperSlide>
                <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              </SwiperSlide>
              <SwiperSlide>
                <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              </SwiperSlide>
            </Swiper>
          </Col>
          <Col className='w-50'>
            <h2>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</h2>
            <p className='text-danger fw-bold fs-5'>1,000,000 ₫ 600,000 ₫ <span className='text-dark fs-6'>(+Đã bao gồm 15% VAT)</span></p>
            <p>This Bluetooth speaker has various features such as water resistance, long battery life, built-in microphones for hands-free cTất cảing, and more.</p>
            <ul>
              <li>Model: UB7OM</li>
              <li>Dynamic Bass Boost Drivers and Dual Passive Radiators</li>
              <li>2 x 14W Output Power</li>
              <li>IP67 Dustproof & Waterproof</li>
              <li>Convenient Hands-Free CTất cảing</li>
            </ul>
            <div className="d-flex justify-content-start">
              <div className='p-2'>
                <Button variant="outline-light" className="bg-light text-dark"><FaMinus /></Button>
                <Button variant="outline-light" className="bg-light text-dark">1</Button>
                <Button variant="outline-light" className="bg-light text-dark"><FaPlus /></Button>
              </div>
              <div className='p-2'>
                <Button variant='danger'>Thêm vào giỏ hàng</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <p className='bg-warning text-dark btn '>Mô Tả</p>
            <p className='bg-transparent text-dark btn '>Đánh Giá</p>
          </Col>
        </Row>
        <Row>
          <div>
            <img src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/blue-book-headphones-arrangement-600x401.jpg' style={{ float: 'right', width: '400px', height: '267px' }} alt='adasdas' />
            <h4>Get credit toward a new Item</h4>
            <p><strong>Features:</strong> Bluetooth speakers come with various features such as water resistance, long battery life, built-in microphones for hands-free cTất cảing, and more.</p>
            <p><strong>Sound Quality:</strong> Sound quality can vary between different models. Some offer excellent audio performance while others prioritize portability over sound quality.</p>
            <p><strong>Connectivity:</strong> Bluetooth speakers use Bluetooth technology to connect to your devices, but some models also offer auxiliary inputs or even support Wi-Fi for more versatile connectivity options.</p>
            <p><strong>Battery Life:</strong> This is an important consideration for portable speakers. Some offer extended battery life, while others may need frequent recharging.</p>
            <p><strong>Price Range:</strong> Bluetooth speakers come in a wide price range, from budget-friendly options to high-end models with advanced features.</p>
            <p><strong>Brands:</strong> Many well-known electronics companies produce Bluetooth speakers, including JBL, Bose, Sony, Ultimate Ears, and more.</p>
            <p><strong>Reviews:</strong> It’s often a good idea to read reviews or watch video reviews of specific models to get a sense of their performance and user satisfaction.</p>
            <p>A short Bluetooth speaker typicTất cảy refers to a smTất cả and portable speaker that uses Bluetooth technology to connect to devices such as smartphones, tablets, or laptops for wireless audio playback. These speakers are known for their convenience and portability, making them ideal for listening to music on the go. They come in various shapes, sizes, and designs, so you can choose one that suits your preferences.</p>
          </div>
        </Row>

        <Row className='mt-5'>
          <Col className='d-flex justify-content-center flex-column align-items-center'>
            <p className='fw-bold text-danger'>SẢN PHẨM NỔI BẬC</p>
            <h1 className='w-50 text-center'>Khuyễn mãi chớp nhoáng hôm nay</h1>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col className='d-flex flex '>
            <Link to={'/product/1'} className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                </i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
            <Link to={'/product/1'} className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                </i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
            <Link to={'/product/1'} className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                </i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
            <Link to={'/product/1'} className='card text-decoration-none text-dark p-3 border-0'>
              <img className='border border-bottom-0' src='https://e-tech.monamedia.net/wp-content/uploads/2023/10/12.png' alt='chuột' width={'100%'} height={'100%'} />
              <div className='p-3 border border-top-0'>
                <p>Loại sản phẩm</p>
                <p className='fs-5'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                </i>
                <p>Tình trạng: còn hàng</p>
                <p>1.500.000 đ</p>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Detail
