import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { BsStar } from 'react-icons/bs'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoGameController } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import '../assets/css/home.css';

const Home = () => {
  return (
    <>
      <Container>
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
                <Col xl={3} className='text-center '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
                <Col xl={3} className='text-center '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
                <Col xl={3} className='text-center '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
                <Col xl={3} className='text-center '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
                <Col xl={3} className='text-center mt-4 '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
                <Col xl={3} className='text-center mt-4 '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
                <Col xl={3} className='text-center mt-4 '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
                <Col xl={3} className='text-center mt-4 '>
                  <div className='border p-2 '>
                    <p className=''><IoGameController className='fs-2 rounded-circle' /></p>
                    <p>Bộ điều khiển</p>
                    <p>2 sản phẩm</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        {/* Sản phẩm nổi bật */}
        <Row>
          <Row >
            <div>
              <p className='text-danger'>KHUYẾN MÃI LỚN</p>
              <h1>Sản Phẩm Nổi Bật</h1>
            </div>
          </Row>
          <Row>
            <Col xl={3} className='p-2 m-0 border-0'>
             <Link to={'/product/1'} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src='https://didongthongminh.vn/images/products/2024/05/14/resized/e65a4821afac06f25fbd.webp' alt='chuột' width={'100%'} height={'100%'} />
                </div>
                 <div className='phone-info p-3 border border-top-0'>
                   <p className='fs-5 phone-name'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                  </i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price'>1.500.000 đ</p>
                </div>
              </Link>
            </Col>
            <Col xl={3} className='p-2 m-0 border-0'>
             <Link to={'/product/1'} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src='https://didongthongminh.vn/images/products/2024/05/14/resized/e65a4821afac06f25fbd.webp' alt='chuột' width={'100%'} height={'100%'} />
                </div>
                 <div className='phone-info p-3 border border-top-0'>
                 
                   <p className='fs-5 phone-name'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                  </i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price'>1.500.000 đ</p>
                </div>
              </Link>
            </Col>
            <Col xl={3} className='p-2 m-0 border-0'>
             <Link to={'/product/1'} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src='https://didongthongminh.vn/images/products/2024/05/14/resized/e65a4821afac06f25fbd.webp' alt='chuột' width={'100%'} height={'100%'} />
                </div>
                 <div className='phone-info p-3 border border-top-0'>
                 
                   <p className='fs-5 phone-name'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                  </i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price'>1.500.000 đ</p>
                </div>
              </Link>
            </Col>
            <Col xl={3} className='p-2 m-0 border-0'>
              <Link to={'/product/1'} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src='https://didongthongminh.vn/images/products/2024/05/14/resized/e65a4821afac06f25fbd.webp' alt='chuột' width={'100%'} height={'100%'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                 
                  <p className='fs-5 phone-name'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                  </i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price'>1.500.000 đ</p>
                </div>
              </Link>
            </Col>
            <Col xl={3} className='p-2 m-0 border-0'>
              <Link to={'/product/1'} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src='https://didongthongminh.vn/images/products/2024/05/14/resized/e65a4821afac06f25fbd.webp' alt='chuột' width={'100%'} height={'100%'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                 
                  <p className='fs-5 phone-name'>Rapoo N100 Wired Optical Mouse Hand Orientation: Both Hands</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar />
                  </i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price'>1.500.000 đ</p>
                </div>
              </Link>
            </Col>
          </Row>
          <Row className='justify-content-center mt-4'>
            <Link to={'/product-category/Phone'} className='btn w-25 bg-danger'>Xem Tất Cả <i><FaArrowRightLong /></i></Link>
          </Row>
        </Row>
      </Container>

    </>

  )
}

export default Home
