import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsStar } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetProductsActiveByCategory, resetState } from '../../features/products/productSlice'
import FormatData from '../../utils/FormatData'
import Loading from '../../utils/Loading'

const HeadPhoneWireless = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(resetState());
        await dispatch(GetProductsActiveByCategory(3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const [sortType, setSortType] = useState('default');
  const productState = useSelector(state => state?.product?.productByCategory);
  if (!productState) {
    return <Loading />;
  }
  const sortedProducts = Array.isArray(productState) ? [...productState] : [];
  if (sortType === 'lowToHigh') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === 'highToLow') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };
  console.log(productState);
  return (
    <div>
      <Container className='mb-5'>
        <Row className='justify-content-between mt-5'>
          <Col className='fs-5'>
            <p>Hiển thị tổng số sản phẩm</p>
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
            sortedProducts && sortedProducts.map((item, index) => (
              <Col xl={3} className='p-2 m-0 border-0' key={index}>
                <Link to={`/tai-nghe-khong-day/${item?.id}`} className='card text-decoration-none phone-item'>
                  <div className='phone-container p-3'>
                    <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                  </div>
                  <div className='phone-info p-3 border border-top-0'>
                    <p className='fs-5 phone-name'>{item?.name}</p>
                    <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                    <p>Tình trạng: còn hàng</p>
                    <p className='phone-price amount'>{FormatData.formatNumber(item?.price)}</p>
                  </div>
                </Link>
              </Col>
            ))
          }
        </Row>
        {/* Hiển thị Loading nếu đang tải dữ liệu */}
        {isLoading && <Loading />}
        {/* Nội dung chính của ứng dụng sau khi tải xong */}
        {!isLoading && (
          <div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default HeadPhoneWireless