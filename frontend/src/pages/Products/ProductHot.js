import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { GetProductPopular, resetState } from '../../features/products/productSlice';
import { Link } from 'react-router-dom';
import { BsStar } from 'react-icons/bs';
import formatNumber from '../../utils/formatNumber';

const ProductHot = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(resetState());
      dispatch(GetProductPopular({
        top: 8,
        startDate: '2024-01-01',
        endDate: '2024-12-30'
      }));
    }, [dispatch]);
    const productState = useSelector((state) => state?.product?.productPopular);

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
        {
          productState && productState.map((item, index) => (
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
      </Container>
    </div>
  )
}

export default ProductHot