import React from 'react';
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, DropdownItem, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { BsCart3 } from 'react-icons/bs';
import { FaHotjar, FaRegUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../assets/images/logo-nobg.png';
import { LuSmartphone } from 'react-icons/lu';
import { CiHeadphones } from 'react-icons/ci';
import { IoIosNotificationsOutline, IoMdBatteryCharging } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/global.css';
import '../assets/css/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../features/auths/authSlice';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const authState = useSelector(state => state.auth);
  const handleLogout = () => {
    dispatch(Logout());
    setTimeout(() => {
      navigate('/login');
  }, 300)
  };
  return (

    <div>
      <Container className='p-0 m-0 m-auto '>
        <Row className='d-flex justify-content-between'>
          <Col className='d-flex flex-row justify-content-end mt-3'>
            <div className='fs-5 p-3 text-nowrap'>
              <Link to={'/'} className='btn'>Trang Chủ</Link>
            </div>
            <div className='fs-5 p-3 text-nowrap'>
              <Link to={'/'} className='btn'>Giới thiệu</Link>
            </div>
            <div className='fs-5 p-3 btn'>
              <DropdownButton id="dropdown-basic-button" title="Sản phẩm" variant="transparent" className="border-0">
                <div className='d-flex mt-3'>
                  <div>
                    <Dropdown.ItemText>Điện thoại</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2" className='custom-dropdown-item'>Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className='custom-dropdown-item'>Something else</Dropdown.Item>
                  </div>
                  <div>
                    <Dropdown.ItemText>Sạc dự phòng</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2" className='custom-dropdown-item'>Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className='custom-dropdown-item'>Something else</Dropdown.Item>
                  </div>
                  <div>
                    <Dropdown.ItemText >Tai nghe</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2" className='custom-dropdown-item'>Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className='custom-dropdown-item'>Something else</Dropdown.Item>
                  </div>
                  <div>
                    <Dropdown.ItemText>Tai nghe không dây</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2" className='custom-dropdown-item'>Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className='custom-dropdown-item'>Something else</Dropdown.Item>
                  </div>
                </div>
              </DropdownButton>
            </div>
            <div className='fs-5 p-3 text-nowrap'>
              <Link to={'/'} className='btn'>Tin tức</Link>
            </div>

          </Col>
          <Col className='d-flex flex-row justify-content-start navbar'>
            <Link to={'/'} style={{ marginRight: '2rem', border: 'none', fontFamily: 'inherit' }} className='bg-transparent text-nowrap text-dark fs-3 '><img alt='logo' src={logo} width={'70%'} /></Link>
          </Col>
          <Col className='d-flex flex-row justify-content-end'>
            <div className='fs-3 p-3'>
              <p className='bg-transparent btn fs-4'>
                <IoSearchOutline />
              </p>
            </div>
            <div className='fs-3 p-3'>
              <Link to={'cart'} className='bg-transparent btn fs-4 '>
                <BsCart3 />
              </Link>
            </div>
            <div className='fs-3 p-3 btn mt-1 '>
              <DropdownButton
                as={ButtonGroup}
                align={{ lg: 'end' }}
                id="dropdown-menu-align-responsive-1"
                title={<><IoIosNotificationsOutline style={{ fontSize: '24px', margin: '' }} /></>}
                variant='light'
                style={{}}
              >
                <div className='container'>
                  <Dropdown.Item className='custom-dropdown-item'>
                    <div className='d-flex mb-2' style={{ width: '400px' }}>
                      <div className='p-2 mx-2'>
                        <img src='https://cdn1.viettelstore.vn/images/Product/ProductImage/small/11334574261520023363.jpeg' alt='iphone' width={40} height={40} />
                      </div>
                      <div className='p-0' style={{ lineHeight: '1' }}>
                        <p className='fw-bold fs-6'>Đang vận chuyển</p>
                        <p className='text-wrap' style={{ maxHeight: '3em', overflow: 'hidden' }}>
                          Đơn hàng #123123 đã được giao cho đơn vị vận chuyển
                        </p>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className='custom-dropdown-item'>
                    <div className='d-flex mb-2' style={{ width: '400px' }}>
                      <div className='p-2 mx-2'>
                        <img src='https://cdn1.viettelstore.vn/images/Product/ProductImage/small/11334574261520023363.jpeg' alt='iphone' width={40} height={40} />
                      </div>
                      <div className='p-0' style={{ lineHeight: '1' }}>
                        <p className='fw-bold fs-6'>Đang vận chuyển</p>
                        <p className='text-wrap' style={{ maxHeight: '3em', overflow: 'hidden' }}>
                          Đơn hàng #123123 đã được giao cho đơn vị vận chuyển
                        </p>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className='custom-dropdown-item'>
                    <div className='d-flex mb-2' style={{ width: '400px' }}>
                      <div className='p-2 mx-2'>
                        <img src='https://cdn1.viettelstore.vn/images/Product/ProductImage/small/11334574261520023363.jpeg' alt='iphone' width={40} height={40} />
                      </div>
                      <div className='p-0' style={{ lineHeight: '1' }}>
                        <p className='fw-bold fs-6'>Đang vận chuyển</p>
                        <p className='text-wrap' style={{ maxHeight: '3em', overflow: 'hidden' }}>
                          Đơn hàng #123123 đã được giao cho đơn vị vận chuyển
                        </p>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className='custom-dropdown-item'>
                    <div className='d-flex mb-2' style={{ width: '400px' }}>
                      <div className='p-2 mx-2'>
                        <img src='https://cdn1.viettelstore.vn/images/Product/ProductImage/small/11334574261520023363.jpeg' alt='iphone' width={40} height={40} />
                      </div>
                      <div className='p-0' style={{ lineHeight: '1' }}>
                        <p className='fw-bold fs-6'>Đang vận chuyển</p>
                        <p className='text-wrap' style={{ maxHeight: '3em', overflow: 'hidden' }}>
                          Đơn hàng #123123 đã được giao cho đơn vị vận chuyển
                        </p>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <DropdownItem className='text-center mt-2'>
                    <Link to={'trang-ca-nhan/notification'} className='text-decoration-none'>Xem tất cả</Link>
                  </DropdownItem>
                </div>
              </DropdownButton>
            </div>
            <div className='fs-3 p-3 btn mt-1 '>
              <DropdownButton
                as={ButtonGroup}
                align={{ lg: 'end' }}
                id="dropdown-menu-align-responsive-1"
                title={<><FaRegUser /></>}
                variant='transparent'
                style={{}}
              >
                <Dropdown.Item className='custom-dropdown-item'>
                  <Link to={'/trang-ca-nhan'} className='text-decoration-none'>Trang cá nhân</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={'/signup'} className='text-decoration-none'>Đăng ký</Link>
                </Dropdown.Item>
                {
                  authState.user === null && (
                    <Dropdown.Item className='custom-dropdown-item'>
                      <Link to={'/login'} className='text-decoration-none'>Đăng nhập</Link>
                    </Dropdown.Item>
                  )
                }
                <Dropdown.Item>
                  <Button variant='light' className='w-100' onClick={handleLogout}>
                    Đăng xuất
                  </Button>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
        <Row className='d-flex border-top border-bottom'>
          <Col className='d-flex flex-row mt-3'>
            <div className='btn text-nowrap'>

              <Link to={'product-category/Phone'} className='text-decoration-none text-dark'><p className='pt-1'><i className='mr-3 fs-6'><FaHotjar /></i><span className=''> Phổ biến</span></p></Link>
            </div>
            <div className='btn text-nowrap'>
              <Link to={'product-category/Phone'} className='text-decoration-none text-dark'><p className='p-1 '><i className='mr-3 fs-6'><LuSmartphone /></i><span className=''> Điện thoại</span></p></Link>
            </div>
            <div className='btn text-nowrap'>

              <Link to={'product-category/tai-nghe-co-day'} className='text-decoration-none text-dark'> <p className='p-1'><i className='mr-3 fs-6'><CiHeadphones /></i><span className=''> Tai nghe </span></p></Link>
            </div>
            <div className='btn text-nowrap'>
              <Link to={'product-category/tai-nghe-khong-day'} className='text-decoration-none text-dark'> <p className='p-1'><i className='mr-3 fs-6'><CiHeadphones /></i><span className=''>Tai nghe BlueTooth </span></p></Link>
            </div>
            <div className='btn text-nowrap'>
            <Link to={'product-category/sac-du-phong'} className='text-decoration-none text-dark'><p className='p-1'><i className='mr-3 fs-6'><IoMdBatteryCharging /></i><span className=''> Pin dự phòng</span></p></Link> 
            </div>
          </Col>


        </Row>
      </Container>
    </div>
  )
}

export default Header
