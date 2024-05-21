import React from 'react';
import { ButtonGroup, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { BsCart3 } from 'react-icons/bs';
import { FaGamepad, FaHotjar, FaRegUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../assets/images/logo-nobg.png';
import { LuSmartphone } from 'react-icons/lu';
import { CiHeadphones } from 'react-icons/ci';
import { IoIosNotificationsOutline, IoMdBatteryCharging } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../assets/css/global.css';
const Header = () => {

  return (
    <div>
      <Container className='p-0 m-0 m-auto '>
        <Row className='d-flex justify-content-between'>
          <Col className='d-flex flex-row justify-content-end mt-3'>
            <div className='fs-5 p-3 text-nowrap'>
              <Link to={'/'} className='btn'>Trang Chủ</Link>
            </div>
            <div className='fs-5 p-3 text-nowrap'>
              <p className='btn'>Giới Thiệu</p>
            </div>
            <div className='fs-5 p-3 btn'>
              <DropdownButton id="dropdown-basic-button" title="Sản phẩm" variant='light' style={{}}>
                <div className='d-flex mt-2'>
                  <div>
                    <Dropdown.ItemText >Action</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </div>
                  <div>
                    <Dropdown.ItemText >Action</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </div>
                  <div>
                    <Dropdown.ItemText >Action</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </div>
                  <div>
                    <Dropdown.ItemText >Action</Dropdown.ItemText>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </div>
                </div>
              </DropdownButton>
            </div>
            <div className='fs-5 p-3 text-nowrap'>
              <p className='btn'>Tin Tức</p>
            </div>
            <div className='fs-5 p-3 text-nowrap'>
              <p className='btn'>Liên Hệ </p>
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
              <p className='bg-transparent btn fs-4'>
                <BsCart3 />
              </p>
            </div>
            <div className='fs-3 p-3 btn '>
              <DropdownButton
                as={ButtonGroup}
                align={{ lg: 'end' }}
                id="dropdown-menu-align-responsive-1"
                title={<><IoIosNotificationsOutline style={{ fontSize: '24px', margin: '' }} /></>}
                variant='light'
                style={{}}
              >
                <Dropdown.Item>
                  <Link to={'/login'}>Login</Link>
                </Dropdown.Item>
                <Dropdown.Item >Register</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className='fs-3 p-3 btn '>
              <DropdownButton
                as={ButtonGroup}
                align={{ lg: 'end' }}
                id="dropdown-menu-align-responsive-1"
                title={<><FaRegUser /></>}
                variant='light'
                style={{}}
              >
                 <Dropdown.Item>
                  <Link to={'/login'} className='text-decoration-none'>Đăng nhập</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={'/signup'} className='text-decoration-none'>Đăng ký</Link>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
        <Row className='d-flex border-top border-bottom'>
          <Col className='d-flex flex-row mt-3'>
            <div className='btn text-nowrap'>
              <p className='pt-1'><i className='mr-3 fs-6'><FaHotjar /></i><span className=''> Phổ biến</span></p>
            </div>
            <div className='btn text-nowrap'>
              <Link to={'product-category/Phone'} className='text-decoration-none text-dark'><p className='p-1 '><i className='mr-3 fs-6'><LuSmartphone /></i><span className=''> Điện thoại</span></p></Link>
            </div>
            <div className='btn text-nowrap'>
              <p className='p-1'><i className='mr-3 fs-6'><CiHeadphones /></i><span className=''> Tai nghe </span></p>
            </div>
            <div className='btn text-nowrap'>
              <p className='p-1'><i className='mr-3 fs-6'><IoMdBatteryCharging /></i><span className=''> Pin dự phòng</span></p>
            </div>
            <div className='btn text-nowrap'>
              <p className='p-1'><i className='mr-3 fs-6'><FaGamepad /></i><span className=''> Phụ kiện </span></p>
            </div>
          </Col>


        </Row>
      </Container>
    </div>
  )
}

export default Header
