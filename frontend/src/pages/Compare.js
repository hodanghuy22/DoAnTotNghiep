import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Modal, Col } from 'react-bootstrap'
import { FaPlus, FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { GetProduct, GetSearchProduct } from '../features/products/productSlice';
import FormatData from '../utils/FormatData';

const Compare = () => {
    const dispatch = useDispatch();

    const [Product1, setProduct1] = useState(null);
    const [Product2, setProduct2] = useState(null);
    const [ProductSearch, setProductSearch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const currentUrl = location.pathname;
    let { phones } = useParams();
    useEffect(() => {
        let ProductName1, ProductName2;
        if (phones.includes('-vs-')) {
            [ProductName1, ProductName2] = phones.split('-vs-');
        } else {
            ProductName1 = phones;
            ProductName2 = '';
        }
        if (ProductName1) {
            dispatch(GetSearchProduct({
                searchQuery: FormatData.replaceHyphensWithSpaces(ProductName1)
            })).then(response => {
                setProduct1(response.payload[0]);
            });
        }

        if (ProductName2) {
            dispatch(GetSearchProduct({
                searchQuery: FormatData.replaceHyphensWithSpaces(ProductName2)
            })).then(response => {
                setProduct2(response.payload[0]);
            });
        }
    }, [dispatch, currentUrl]);

    const handleAddPhone = (e) => {
        dispatch(GetProduct(e))
        handleClose()
    };
    const handleDeletePhone = (e) => {
        if (e === 1) {
            setProduct1(Product2)
            setProduct2(null)
            navigate(`/so-sanh/${FormatData.removeVietnameseTones(Product2?.name)}`)
        }
        else if (e === 2) {
            setProduct2(null)
            navigate(`/so-sanh/${FormatData.removeVietnameseTones(Product1?.name)}`)
        }
    }
    //Hiên thị modal danh sách sp
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit search with term:', searchTerm);

        dispatch(GetSearchProduct({
            searchQuery: FormatData.replaceHyphensWithSpaces(searchTerm)
        })).then(response => {
            setProductSearch(response.payload);
        });
        setSearchTerm('');
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div>
            <Container>
                <Row className=''>
                    <div className='col-4'>

                    </div>
                    <div className='col-8 d-flex justify-content-center mt-5'>
                        <h6 className='' style={{ textTransform: 'uppercase' }}>
                            So sánh {Product1?.name} {Product2?.name ? ('và') : ('')} {Product2?.name}
                        </h6>

                    </div>
                </Row>
                <Row className='d-flex justify-content-end w-100'>
                    <div className='col-4'>

                    </div>
                    <div className='col-4 d-flex justify-content-center'>
                        {Product1 ? (
                            <div className='p-3 text-center' style={{ marginBottom: '10px' }}>
                                <div className='d-flex justify-content-end'>
                                    <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(1) }} />
                                </div>
                                <div className='  bg-transparent' border='1' >
                                    <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                        <div className='border-0 '>
                                            <img className='card-image mb-3' variant="top" src={Product1?.thumnailUrl} alt='zxczxc' width={'200px'} height={'200px'} />

                                            <div>
                                                <div>{Product1?.name}</div>
                                                <p className='text-danger font-size-bold amount'>
                                                    {
                                                        FormatData.formatNumber(Product1?.productDetails[0].retailPrice)
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '10px' }} className=' p-3 text-center d-flex justify-content-center align-items-center '>
                                <Button
                                    className='bg-transparent text-info p-3'
                                    style={{ borderStyle: 'dashed' }}
                                    onClick={handleShow}
                                >
                                    <FaPlus style={{ fontSize: '30px' }} />
                                    <p>Thêm sản phẩm</p>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className='col-4 d-flex justify-content-center'>
                        {Product2 ? (
                            <div className='p-3 text-center' style={{ marginBottom: '10px' }}>
                                <div className='d-flex justify-content-end'>
                                    <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(2) }} />
                                </div>
                                <div className='  bg-transparent' border='1' >
                                    <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                        <div className='border-0 '>
                                            <img className='card-image mb-3' variant="top" src={Product2?.thumnailUrl} alt='zxczxc' width={'200px'} height={'200px'} />
                                            <div>
                                                <div>{Product2?.name}</div>
                                                <p className='text-danger font-size-bold amount'>
                                                    {
                                                        FormatData.formatNumber(Product2?.productDetails[0].retailPrice)
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '10px' }} className=' p-3 text-center d-flex justify-content-center align-items-center '>
                                <Button
                                    className='bg-transparent text-info p-3'
                                    style={{ borderStyle: 'dashed' }}
                                    onClick={handleShow}
                                >
                                    <FaPlus style={{ fontSize: '30px' }} />
                                    <p>Thêm sản phẩm</p>
                                </Button>
                            </div>
                        )}
                    </div>

                </Row>

                <Row>
                    <h4 className='text-uppercase'>Thông tin cơ bản</h4>
                </Row>
                <Row className='w-100'>
                    <div className='shadow p-3 mb-5 bg-body rounded-3-'>
                        <div className="is-flex is-justify-content-space-between is-align-items-center"><h2 className="title is-6 mb-3">Thông số kỹ thuật</h2>
                        </div>
                        <ul className="technical-content rounded-3">
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Kích thước màn hình</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.size} inch` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.size} inch` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Công nghệ màn hình</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.screen}` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.screen} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Camera sau</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.rearCamera} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.rearCamera} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Camera trước</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.frontCamera} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.frontCamera} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Chipset</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.chip} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.chip} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Dung lượng RAM</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.ram} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.ram} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Bộ nhớ trong</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.rom} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.rom} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Pin</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.battery} ${Product1?.chargingEfficiency}` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.battery} ${Product1?.chargingEfficiency}` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Hệ điều hành</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.os} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.os} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Trọng lượng</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.weight} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.weight} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Hãng</div>
                                <div className='col-4 mx-5'>{Product1?.size ? `${Product1?.brand.title} ` : null}</div>
                                <div className='col-4 mx-5'>{Product2?.size ? `${Product2?.brand.title} ` : null}</div>
                            </li>
                        </ul>
                    </div>
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                size='xl'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tìm sản phẩm để so sánh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{ height: '75vh', overflow: 'scroll' }}>
                        <Row >
                            <Col className='col-4 mb-4'>
                                <form onSubmit={handleSubmit} className='w-100'>
                                    <div className='d-flex w-100'>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleChange}
                                            id="text-search"
                                            placeholder="Bạn tìm gì"
                                            aria-label="Bạn tìm gì"
                                            className='w-100 p-2'
                                        />
                                        <button type="submit" className='px-2'><FaSearch /></button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        <Row>
                            {
                                ProductSearch && ProductSearch?.map((item, index) => {
                                    return (
                                        <Col xl={3} md={4} sm={6} className='' key={index}>
                                            <Link to={`${currentUrl}-vs-${FormatData.removeVietnameseTones(item?.name)}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className='p-3'>
                                                    <img className='card-image' width={"200px"} height={'200px'} src={item?.thumnailUrl} alt={item.name} />
                                                    <div className='mt-4'>
                                                        <p className='text-title'>{item.name}</p>
                                                        <div>
                                                            <p className='text-price  font-size-bold amount' >
                                                                {FormatData.formatNumber(item.productDetails[0].retailPrice)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button className='w-100' onClick={() => { handleAddPhone(item.id) }}>
                                                        <FaPlus /> So sánh ngay
                                                    </Button>
                                                </div>
                                            </Link>
                                        </Col>
                                    )
                                })

                            }
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Compare

