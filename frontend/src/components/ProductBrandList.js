import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { BsStar } from 'react-icons/bs';
import Loading from '../utils/Loading';
import { GetProductByBrandCategory } from '../features/products/productSlice';
import FormatData from '../utils/FormatData';
import { GetBrandByCategory } from '../features/brands/brandSlice';
import '../assets/css/global.css';

const ProductBrandList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const productState = useSelector((state) => state?.product?.productByBrandCategory);
  const brandState = useSelector(state => state?.brand?.BrandByCategory);
  const firstProduct = productState?.[0] ?? 'No product available';
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { brandId } = useParams();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(GetProductByBrandCategory({
          categoryId: categoryId,
          brandId: brandId
        })).then(response => {
          if (Array.isArray(response.payload) && response.payload.length === 0) {
            navigate('/404');
          }
        });
        await dispatch(GetBrandByCategory(categoryId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, categoryId, brandId]);
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
  const handleClick = (index) => {
    setSelectedIndex(index)
  }
  const productCount = productState ? productState.length : 0;
  return (
    <Container className='mb-5'>
      <Row className='mt-3'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item "><Link className='text-decoration-none' to="/">Trang Chủ</Link></li>
            <li className="breadcrumb-item "><Link className='text-decoration-none' to={`/${FormatData.removeVietnameseTones(firstProduct?.categoryTitle)}`}>{firstProduct?.categoryTitle}</Link></li>
            <li className="breadcrumb-item  active" aria-current="page"><Link className='text-decoration-none'>{firstProduct?.brandTitle}</Link></li>
          </ol>
        </nav>
      </Row>
      <Row>
        <div className='d-flex text-center flex-wrap'>
          {
            brandState && brandState?.map((item, index) => {
              return (
                <div className='col-2 px-3 mb-3' key={index}>
                  <Link to={`${getCategoryPath(categoryId)}/brand/${item?.id}`}
                    className={` hover-item-brand ${selectedIndex === item?.id ? 'bg-danger text-light border p-2 rounded-pill d-block text-decoration-none' : 'bg-transparent border p-2 rounded-pill d-block text-decoration-none'}`}
                    onClick={() => handleClick(item?.id)}
                  >
                    {item?.title}
                  </Link>
                </div>
              )
            })
          }
        </div>
      </Row>
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
          sortedProducts && sortedProducts.map((item, index) => (
            <Col xl={3} className='p-2 m-0 border-0' key={index}>
              <Link to={`/dien-thoai/${item?.id}`} className='card text-decoration-none phone-item'>
                <div className='phone-container p-3'>
                  <img className='phone-image' src={item?.imageUrl} alt='chuột' width={'250px'} height={'250px'} />
                </div>
                <div className='phone-info p-3 border border-top-0'>
                  <p className='fs-5 phone-name'>{item?.name}</p>
                  <i>Đánh giá: <BsStar /><BsStar /><BsStar /><BsStar /><BsStar /></i>
                  <p>Số Lượng: {item?.quantity}</p>
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

export default ProductBrandList