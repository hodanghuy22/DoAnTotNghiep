import { useState } from 'react';
import { ButtonGroup, Col, Dropdown, DropdownButton, Modal, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { BsCart3 } from 'react-icons/bs';
import { FaHotjar, FaRegUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../assets/images/logo-nobg.png';
import { LuSmartphone } from 'react-icons/lu';
import { CiHeadphones } from 'react-icons/ci';
import { IoIosNotificationsOutline, IoMdBatteryCharging } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/global.css';
import '../assets/css/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../features/auths/authSlice';
import Notification from './Notification';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const authState = useSelector(state => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleUserClick = () => {
    setShow(true);
  }

  const handleLogout = () => {
    dispatch(Logout());
    setTimeout(() => {
      navigate('/login');
    }, 300)

  };
  const [showModal, setShowModal] = useState(false);

  const handleSearchIconClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/tim-kiem/${encodeURIComponent(searchQuery)}`);
    setShowModal(false);
  }
  return (
    <div>
      <Container className='p-0 m-0 m-auto '>
        <Row className='d-flex justify-content-between'>
          <Col className='d-flex flex-row justify-content-end mt-3'>
            <div className='fs-5 p-3 text-nowrap'>
              <Link to={'/'} className='btn'>Trang Chủ</Link>
            </div>
            <div className='fs-5 p-3 text-nowrap'>
              <Link to={'/gioi-thieu'} className='btn'>Giới thiệu</Link>
            </div>
            <div className='fs-5 p-3 btn w-100'>
              <DropdownButton id="dropdown-basic-button" title="Sản phẩm" variant="transparent" className="border-0">
                <div className='d-flex mt-3'>
                  <div className="dropdown-column phone-brand">
                    <Dropdown.ItemText>Thương hiệu điện thoại</Dropdown.ItemText>
                    <Dropdown.Item as={Link} to={'/product/1'} className='custom-dropdown-item'>Iphone</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/2'} className='custom-dropdown-item'>Xiaomi</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/3'} className='custom-dropdown-item'>vivo</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/4'} className='custom-dropdown-item'>OPPO</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/5'} className='custom-dropdown-item'>Samsung</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/6'} className='custom-dropdown-item'>Realme</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/7'} className='custom-dropdown-item'>OnePlus</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/8'} className='custom-dropdown-item'>POCO</Dropdown.Item>
                  </div>
                  <div className="dropdown-column">
                    <Dropdown.ItemText>Sạc dự phòng</Dropdown.ItemText>
                    <Dropdown.Item as={Link} to={'/product/9'} className='custom-dropdown-item'>ANKER</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/10'} className='custom-dropdown-item'>Baseus</Dropdown.Item>
                  </div>
                  <div className="dropdown-column">
                    <Dropdown.ItemText>Tai nghe</Dropdown.ItemText>
                    <Dropdown.Item as={Link} to={'/product/13'} className='custom-dropdown-item'>JBL</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/14'} className='custom-dropdown-item'>Sony</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/product/16'} className='custom-dropdown-item'>Awei</Dropdown.Item>
                  </div>
                  <div className="dropdown-column headphone-brand">
                    <Dropdown.ItemText>Tai nghe không dây</Dropdown.ItemText>
                    <Dropdown.Item as={Link} to={'/product/12'} className='custom-dropdown-item'>HAVIT</Dropdown.Item>
                  </div>
                </div>
              </DropdownButton>
            </div>
          </Col>
          <Col className='d-flex flex-row justify-content-start navbar'>
            <Link to={'/'} style={{ marginRight: '2rem', border: 'none', fontFamily: 'inherit' }} className='bg-transparent text-nowrap text-dark fs-3 '><img alt='logo' src={logo} width={'70%'} /></Link>
          </Col>
          <Col className='d-flex flex-row justify-content-end'>
            <div className='fs-3 p-3'>
              <p className='bg-transparent btn fs-4'>
                <IoSearchOutline onClick={handleSearchIconClick} />
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
                <Notification />
              </DropdownButton>
            </div>
            <div className='fs-3 p-3 btn mt-1 '>
              {
                (authState.user === null) ? (
                  <FaRegUser className='fs-4 text-dark'  onClick={handleUserClick} />
                ) : (
                  <Link to={'/trang-ca-nhan'}>
                    <FaRegUser className='fs-4 text-dark'  />
                  </Link>
                )
              }
              {/* <DropdownButton
                as={ButtonGroup}
                align={{ lg: 'end' }}
                id="dropdown-menu-align-responsive-1"
                title={<><FaRegUser /></>}
                variant='transparent'
                style={{}}
              >
                {
                  authState.user !== null && (
                    <Dropdown.Item className='custom-dropdown-item'>
                      <Link to={'/trang-ca-nhan'} className='text-decoration-none'>Trang cá nhân</Link>
                    </Dropdown.Item>
                  )
                }

                {
                  authState.user === null && (
                    <Dropdown.Item className='custom-dropdown-item'>
                      <Link to={'/signup'} className='text-decoration-none'>Đăng ký</Link>
                    </Dropdown.Item>
                  )
                }
                {
                  authState.user === null && (
                    <Dropdown.Item className='custom-dropdown-item'>
                      <Link to={'/login'} className='text-decoration-none'>Đăng nhập</Link>
                    </Dropdown.Item>
                  )
                }
                <Dropdown.Item className='custom-dropdown-item'>
                  <button className='w-100 btn btn-link text-decoration-none text-start p-0' onClick={handleLogout}>Đăng xuất</button>
                </Dropdown.Item>
              </DropdownButton> */}
            </div>
          </Col>
        </Row>
        <Row className='d-flex border-top border-bottom'>
          <Col className='d-flex flex-row mt-3'>
            <div className='btn text-nowrap'>

              <Link to={'/hot'} className='text-decoration-none text-dark'><p className='pt-1'><i className='mr-3 fs-6'><FaHotjar className='text-danger'/></i><span className=''> Phổ biến</span></p></Link>
            </div>
            <div className='btn text-nowrap'>
              <Link to={'/dien-thoai'} className='text-decoration-none text-dark'><p className='p-1 '><i className='mr-3 fs-6'><LuSmartphone /></i><span className=''> Điện thoại</span></p></Link>
            </div>
            <div className='btn text-nowrap'>

              <Link to={'/tai-nghe-co-day'} className='text-decoration-none text-dark'> <p className='p-1'><i className='mr-3 fs-6'><CiHeadphones /></i><span className=''> Tai nghe </span></p></Link>
            </div>
            <div className='btn text-nowrap'>
              <Link to={'/tai-nghe-khong-day'} className='text-decoration-none text-dark'> <p className='p-1'><i className='mr-3 fs-6'><CiHeadphones /></i><span className=''>Tai nghe BlueTooth </span></p></Link>
            </div>
            <div className='btn text-nowrap'>
              <Link to={'/sac-du-phong'} className='text-decoration-none text-dark'><p className='p-1'><i className='mr-3 fs-6'><IoMdBatteryCharging /></i><span className=''> Pin dự phòng</span></p></Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} size='xl'>
        <Modal.Body>
          <form onSubmit={handleSubmit} method='get' className='d-flex flex-row'>
            <div>
              <IoSearchOutline className='fs-4 mx-4 mt-2' />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập từ khóa tìm kiếm"
              className='border-0 w-100 d-block p-4 text-dark fs-5'
            />
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton >
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center mb-4'>
            <h3 >E-HUBI</h3>
          </div>
          <h6 className='text-center'>Vui lòng đăng nhập tài khoản để tiếp tục</h6>
        </Modal.Body>
        <div className='d-flex flex-row p-4 m-0'>
          <Link to={'/signup'}
            className='text-decoration-none btn w-50 p-2 m-2 bg-light text-danger border-danger fw-bold rounded-3'
            onClick={() => { setShow(false) }}
            state={{ from: location }}
          >
            Đăng Ký
          </Link>
          <Link to={'/login'}
            className='text-decoration-none btn w-50 p-2 m-2 bg-danger border-light fw-bold rounded-3 text-light'
            onClick={() => { setShow(false) }}
            state={{ from: location }}
          >
            Đăng Nhập
          </Link>
        </div>
      </Modal>
    </div>
  )
}

export default Header
