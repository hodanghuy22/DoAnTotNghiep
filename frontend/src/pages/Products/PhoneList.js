import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsStar } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetProductsActiveByCategory, resetState } from '../../features/products/productSlice'

const PhoneList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(GetProductsActiveByCategory(1));
  }, [dispatch]);

  const productState = useSelector(state => state?.product?.productByCategory);
  console.log(productState);
  return (
    <div>
      <Container className='mb-5'>
        <Row className='justify-content-between mt-5'>
          <Col className='fs-5'>
            <p>Hiển thị tổng số sản phẩm</p>
          </Col>
          <Col className='d-flex flex-row-reverse mb-1'>
            <select className=' text-dark'>
              <option>Thứ tự mặc định</option>
              <option >Mới nhất</option>
            </select>
          </Col>
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
        </Row>
      </Container>
    </div>
  )
}

export default PhoneList
