import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsStar } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const PhoneList = () => {
  return (
    <div>
      <Container className='mb-5'>
        <Row className='justify-content-between'>
          <Col>
            <p>Hiển thị tổng số sản phẩm</p>
          </Col>
          <Col className='d-flex flex-row-reverse'>
            <select>
              <option>Thứ tự mặc định</option>
              <option>Mới nhất</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col xl={4} className='p-2 m-0 border-0'>
            <Link to={'/product/1'} className='card text-decoration-none text-dark'>
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
          <Col xl={4} className='p-2 m-0 border-0'>
            <Link to={'/product/1'} className='card text-decoration-none text-dark'>
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
          <Col xl={4} className='p-2 m-0 border-0'>
            <Link to={'/product/1'} className='card text-decoration-none text-dark'>
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
          <Col xl={4} className='p-2 m-0 border-0'>
            <Link to={'/product/1'} className='card text-decoration-none text-dark'>
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

export default PhoneList
