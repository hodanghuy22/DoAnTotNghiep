import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap'
import { GetProductPopular } from '../../features/products/productSlice';
import { Link } from 'react-router-dom';
import FormatData from '../../utils/FormatData';
import Loading from '../../utils/Loading';
import { Helmet } from 'react-helmet';

const ProductHot = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(GetProductPopular({
          top: 40,
          startDate: '2024-01-01',
          endDate: '2024-12-30'
        }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const productState = useSelector((state) => state?.product?.productPopular);

  const [sortType, setSortType] = useState('default');
  setTimeout(() => {
    if (isLoading) {
      return <Loading />;
    }
  }, 1000)
  const sortedProducts = Array.isArray(productState) ? [...productState] : [];
  if (sortType === 'lowToHigh') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === 'highToLow') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };
  const productCount = productState ? productState.length : 0;

  return (
    <Container className='mb-5'>
      <Helmet>
        <title>Sản phẩm hot | HUBI</title>
      </Helmet>
      <Row className='justify-content-between mt-5'>
        <Col className='fs-5'>
          <p>Có {productCount} sản phẩm</p>
        </Col>
        <Col className='d-flex flex-row-reverse mb-1'>
          <select className='text-dark' onChange={handleSortChange}>
            <option value="default">Thứ tự mặc định</option>
            <option value="lowToHigh">Giá thấp đến cao</option>
            <option value="highToLow">Giá cao đến thấp</option>
          </select>
        </Col>
      </Row>
      <Row>
        {
          sortedProducts && sortedProducts?.map((item, index) => (
            <Col xl={3} className='p-2 m-0 border-0' key={index}>
              <Link to={`/${FormatData.removeVietnameseTones(item?.categoryTitle)}/${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3 d-flex'>
                  <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                  <p className='rounded-circle border-dark'>{item?.averageRating}<span className='text-warning fs-5 mx-1'>&#9733;</span></p>
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name'>{item?.name}</p>
                  <p>Số lượng: {item?.quantity}</p>
                  <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                </div>
              </Link>
            </Col>
          ))
        }
      </Row>

      {!isLoading && (
        <div>
        </div>
      )}
    </Container>
  )
}

export default ProductHot