import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GetProductsActiveByCategory } from '../../features/products/productSlice';
import FormatData from '../../utils/FormatData';
import Loading from '../../utils/Loading';
import { GetBrandByCategory } from '../../features/brands/brandSlice';
import './../../assets/css/global.css'
import { Helmet } from 'react-helmet';

const ProductList = ({ categoryId }) => {
    const dispatch = useDispatch();
  const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(GetProductsActiveByCategory(categoryId)).then(response => {
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
    }, [dispatch, categoryId]);

    const [sortType, setSortType] = useState('default');
    const productState = useSelector(state => state?.product?.productByCategory);
    const brandState = useSelector(state => state?.brand?.BrandByCategory);
    const firstProduct = productState?.[0] ?? 'No product available';

    setTimeout(() => {
        if (isLoading) {
            return <Loading />;
        }
    }, 1000)

    const handleClick = (index) => {
        console.log(index)
        setSelectedIndex(index)
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
    const productCount = productState ? productState.length : 0;

    return (
        <div>
             {firstProduct && (
        <Helmet>
          <title>{`${firstProduct.categoryTitle} | HUBI`}</title>
        </Helmet>
      )}
            <Container className='mb-5'>
                <Row className='mt-3'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item "><Link className='text-decoration-none' to="/">Trang Chủ</Link></li>
                            <li className="breadcrumb-item "><Link className='text-decoration-none' to={`/${FormatData.removeVietnameseTones(firstProduct?.categoryTitle)}`}>{firstProduct?.categoryTitle}</Link></li>
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
                                            className={`hover-item-brand ${selectedIndex === item?.id ? 'bg-danger text-light border p-2 rounded-pill d-block text-decoration-none' : 'bg-transparent border p-2 rounded-pill d-block text-decoration-none'}`}

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
                        sortedProducts.map((item, index) => (
                            <Col xl={3} className='p-2 m-0 border-0' key={index}>
                                <Link to={`${FormatData.removeVietnameseTones(item?.name)}`} className='card text-decoration-none phone-item'>
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

export default ProductList;
