import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from '../assets/images/logo-nobg.png';
import { BsPhone } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <Container className='mt-5'>
      <Row className='mb-5'>
        <Col xl={3}>
          <Link className='text-decoration-none' to={'/'}><img src={logo} alt='logo' width={'300px'} /></Link>
          <p>Với chất lượng hàng đầu, chúng tôi cam kết mang đến cho khách hàng những trải nghiệm tuyệt vời và sự hài lòng tuyệt đối.</p>
        </Col>
        <Col xl={2}>
          <h5>Thông tin</h5>
          <div className='d-flex flex-column'>
            <Link className='text-decoration-none' to={'/hot'}>Xu Hướng</Link>
            <Link className='text-decoration-none' to={'hot'}>Bán Chạy</Link>
           <Link className='text-decoration-none' to={'dien-thoai'}>Điện thoại</Link>
           <Link className='text-decoration-none' to={'tai-nghe-co-day'}>Tai nghe có dây</Link>
           <Link className='text-decoration-none' to={'tai-nghe-khong-day'}>Tai nghe không dây</Link>
           <Link className='text-decoration-none' to={'sac-du-phong'}>Sạc dự phòng</Link>
          </div>
        </Col>
        <Col xl={2}>
          <h5>Danh Mục</h5>
          <div className='d-flex flex-column'>
            <Link className='text-decoration-none' to={'/'}>Trang Chủ</Link>
            <Link className='text-decoration-none' to={'/gioi-thieu'}>Giới Thiệu</Link>
            <Link className='text-decoration-none' to={'/hot'}>Sản Phẩm</Link>
            <p>Liên Hệ</p>
          </div>
        </Col>
        <Col xl={2}>
          <h5>Liên kết</h5>
          <div className='d-flex flex-column'>
            <Link className='text-decoration-none' to={'/trang-ca-nhan'}>Tài Khoản</Link>
            <Link className='text-decoration-none' to={'/trang-ca-nhan/oder-list'}>Đơn Hàng</Link>
            <Link className='text-decoration-none' to={'/trang-ca-nhan/wishlist'}>Mục Yêu Thích</Link>
          </div>
        </Col>
        <Col xl={3}>
          <h5>Thông tin cửa hàng</h5>
          <div className='d-flex flex-column'>
            <p>Bạn cần trợ giúp ? 
            <br/><BsPhone className='fs-4'/><a href="tel:0329155867">   0329155867 </a></p>
            <p>Địa Chỉ: CĐ TH21WEBC</p>
            <p>Email:0306211331@caothang.edu.vn</p>
          </div>
        </Col>
      </Row>
      <Row className='border-top mt-5'>
    @ Thiết kế bởi và lập trình bởi Phạm Quảng Bình và Hồ Đăng Huy
      </Row>
    </Container>
  )
}

export default Footer
