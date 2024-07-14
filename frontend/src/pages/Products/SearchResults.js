import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSearchProduct } from '../../features/products/productSlice';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import FormatData from '../../utils/FormatData';
import Loading from '../../utils/Loading';
import { Helmet } from 'react-helmet';

const SearchResults = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(GetSearchProduct({
          searchQuery: searchQuery
        }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, searchQuery]);

  const productState = useSelector((state) => state?.product?.searchResults);
  const productCount = productState ? productState.length : 0;
  const [sortType, setSortType] = useState('default');

  setTimeout(() => {
    if (isLoading) {
      return <Loading />;
    }
  }, 1000)
  const sortedProducts = Array.isArray(productState) ? [...productState] : [];
  if (sortType === 'lowToHigh') {
    sortedProducts.sort((a, b) => a.productDetails[0].retailPrice - b.productDetails[0].retailPrice);
  } else if (sortType === 'highToLow') {
    sortedProducts.sort((a, b) => b.productDetails[0].retailPrice - a.productDetails[0].retailPrice);
  }
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };
  const getCategoryPath = (categoryId) => {
    switch (categoryId) {
      case 1:
        return '/dien-thoai';
      case 2:
        return '/sac-du-phong';
      case 3:
        return '/tai-nghe-khong-day';
      case 4:
        return '/tai-nghe-co-day';
      default:
        return '/';
    }
  };
  return (
    <Container className='mb-5' style={{ minHeight: '500px' }}>
      {
        searchQuery && (
          <Helmet>
            <title>Thông tin mới nhất về "{searchQuery}" | HUBI</title>
          </Helmet>
        )
      }

      <Row className='justify-content-between mt-5'>
        <Col className='fs-5'>
          <p>Có {productCount} kết quả tìm kiếm cho từ khoá: "<i>{searchQuery}</i>"</p>
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
          sortedProducts?.map((item, index) => (
            <Col xl={3} className='p-2 m-0 border-0' key={index}>
              <Link to={`${getCategoryPath(item?.categoryId)}/${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3 d-flex'>
                  <img className='phone-image' src={item?.thumnailUrl} alt='chuột' width={'250px'} height={'250px'} />
                  <p className='rounded-circle border-dark'>{(item?.averageRating === 0) ? 5 : item?.averageRating}<span className='text-warning fs-5 mx-1'>&#9733;</span></p>
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name'>{item?.name}</p>
                  <p className='phone-price amount'>{FormatData.formatNumber(item?.productDetails[0]?.retailPrice)}</p>
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
  );
};

export default SearchResults;
