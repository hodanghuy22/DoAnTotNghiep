import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Row, Modal, Col, FormControl } from 'react-bootstrap'
import { FaPlus, FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import formatNumber from '../utils/formatNumber';
import { GetProduct, GetProductsActive } from '../features/products/productSlice';

const Compare = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.product?.products);
    const productList  = useSelector(state => state?.product?.products);
    const [searchTerm, setSearchTerm] = useState('');
    const searchBoxRef = useRef(null);
    useEffect(() => {
        dispatch(GetProductsActive());
    }, [dispatch]);
    const APhone = useSelector(state => state?.product?.Aproduct);
    const [Phone1, setPhone1] = useState();
    const [Phone2, setPhone2] = useState();

    const handleAddPhone = (e) => {
        dispatch(GetProduct(e))
        handleClose()
    };

    useEffect(() => {
        if (Phone1 === undefined) {
            setPhone1(APhone);
        }
        if (Phone1 !== undefined) {
            setPhone2(APhone);
        }
    }, [APhone]);
    const handleDeletePhone = (e) => {
        if (e === 1) {
            setPhone1(Phone2)
            setPhone2(undefined)
        }
        else if (e === 2)
            setPhone2(undefined)
    }
    //Hiên thị modal danh sách sp
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
     
    };


    return (
        <div>
            <Container>
                <Row className=''>
                    <div className='col-4'>

                    </div>
                    <div className='col-8 d-flex justify-content-center mt-5'>
                        <h6 className='' style={{ textTransform: 'uppercase' }}>
                            So sánh {Phone1?.name} {Phone2?.name ? ('và') : ('')} {Phone2?.name}
                        </h6>

                    </div>
                </Row>
                <Row className='d-flex justify-content-end w-100'>
                    <div className='col-4'>

                    </div>
                    <div className='col-4 d-flex justify-content-center'>
                        {Phone1 ? (
                            <div className='p-3 text-center' style={{ marginBottom: '10px' }}>
                                <div className='d-flex justify-content-end'>
                                    <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(1) }} />
                                </div>
                                <div className='  bg-transparent' border='1' >
                                    <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                        <div className='border-0 '>
                                        <img className='card-image mb-3' variant="top" src={Phone1?.images[0]?.imageUrl} alt='zxczxc' width={'200px'} height={'200px'} />

                                            <div>
                                                <div>{Phone1?.name}</div>
                                                <p className='text-danger font-size-bold amount'>
                                                    {
                                                        formatNumber(Phone1?.price)
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
                        {Phone2 ? (
                            <div className='p-3 text-center' style={{ marginBottom: '10px' }}>
                                <div className='d-flex justify-content-end'>
                                    <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(2) }} />
                                </div>
                                <div className='  bg-transparent' border='1' >
                                    <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                        <div className='border-0 '>
                                            <img className='card-image mb-3' variant="top" src={Phone2?.images[0]?.imageUrl} alt='zxczxc' width={'200px'} height={'200px'} />
                                            <div>
                                                <div>{Phone2?.name}</div>
                                                <p className='text-danger font-size-bold amount'>
                                                    {
                                                        formatNumber(Phone2?.price)
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
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.size} inch` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.size} inch` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Công nghệ màn hình</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.screen}` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.screen} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Camera sau</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.rearCamera} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.rearCamera} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Camera trước</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.frontCamera} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.frontCamera} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Chipset</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.chip} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.chip} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Dung lượng RAM</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.ram} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.ram} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Bộ nhớ trong</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.rom} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.rom} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Pin</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.battery} ${Phone1?.chargingEfficiency}` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.battery} ${Phone1?.chargingEfficiency}` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Hệ điều hành</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.os} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.os} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2">
                                <div className='col-4'>Trọng lượng</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.weight} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.weight} ` : null}</div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between p-2 " style={{ backgroundColor: '#f2f2f2' }}>
                                <div className='col-4'>Hãng</div>
                                <div className='col-4 mx-5'>{Phone1?.size ? `${Phone1?.brand.title} ` : null}</div>
                                <div className='col-4 mx-5'>{Phone2?.size ? `${Phone2?.brand.title} ` : null}</div>
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
                        <Row>
                            <div className="searchBox w-100 mr-3" ref={searchBoxRef}>
                                <div className="d-flex ml-2 mr-2 w-25 mb-2" role="search">
                                    <div className="d-flex bg-light" style={{ width: '100%' }}>
                                        <FaSearch className='mt-1 mr-2' style={{ fontSize: '28px' }} />
                                        <FormControl
                                            id="text-search"
                                            type="search"
                                            placeholder="Bạn tìm gì"
                                            aria-label="Bạn tìm gì"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            {
                                productState && productList?.map((item, index) => {
                                    return (
                                        <Col xl={3} md={4} sm={6} className='' key={index}>
                                            <div to={`/dtdd/${item.productId}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className='p-3'>
                                                    <img className='card-image' width={"200px"} height={'200px'} src={item?.imageUrl} alt={item.name} />
                                                    <div className='mt-4'>
                                                        <p className='text-title'>{item.name}</p>
                                                        <div>
                                                            <p className='text-price  font-size-bold amount' >
                                                                {formatNumber(item.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button className='w-100' onClick={() => { handleAddPhone(item.id) }}>
                                                        <FaPlus /> So sánh ngay
                                                    </Button>
                                                </div>
                                            </div>
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
