import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSearchProduct, resetState } from '../../features/products/productSlice';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { BsStar } from 'react-icons/bs';
import FormatData from '../../utils/FormatData';

const SearchResults = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useParams(); 
    useEffect(() => {
        dispatch(resetState());
        dispatch(GetSearchProduct({
            searchQuery: searchQuery
          }));
        console.log(searchQuery);
    }, [dispatch, searchQuery]);

    const productState = useSelector((state) => state?.product?.searchResults);
    const productCount = productState ? productState.length : 0;
    return (
        <Container className='mb-5'>
        <Row className='justify-content-between mt-5'>
          <Col className='fs-5'>
            <p>Có {productCount} kết quả tìm kiếm</p>
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
               <Link to={`/dtdd/${item?.id}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src={item?.thumnailUrl} alt='chuột' width={'250px'} height={'250px'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name'>{item?.name}</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                  <p>Tình trạng: còn hàng</p>
                  <p className='phone-price amount'>{FormatData.formatNumber(item?.productDetails[0]?.retailPrice)}</p>
                </div>
              </Link>
            </Col>
          ))
        }
        </Row>
      </Container>
    );
};

export default SearchResults;
