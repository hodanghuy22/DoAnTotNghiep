import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from '../assets/images/logo-nobg.png';
import { BsFacebook, BsInstagram, BsPhone, BsPinterest, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <Container className='mt-5'>
      <Row className='mb-5'>
        <Col xl={3}>
          <img src={logo} alt='logo' width={'300px'} />
          <p>Với chất lượng hàng đầu, chúng tôi cam kết mang đến cho khách hàng những trải nghiệm tuyệt vời và sự hài lòng tuyệt đối.</p>
          <h5>Theo dõi</h5>
          <Link className='p-2' >
            <BsFacebook className='fs-3' />
          </Link>
          <Link className='p-2'>
            <BsTwitter className='fs-3' />
          </Link>
          <Link className='p-2'>
            <BsInstagram className='fs-3' />
          </Link>
          <Link className='p-2'>
            <BsPinterest className='fs-3' />
          </Link>
        </Col>
        <Col xl={2}>
          <h5>Thông tin</h5>
          <div className='d-flex flex-column'>
            <p>Xu Hướng</p>
            <p>Bán Chạy</p>
            <p>Giảm Giá</p>
            <p>Sản Phẩm Mới</p>
            <p>Còn Hàng</p>
          </div>
        </Col>
        <Col xl={2}>
          <h5>Danh Mục</h5>
          <div className='d-flex flex-column'>
            <p>Trang Chủ</p>
            <p>Giới Thiệu</p>
            <p>Sản Phẩm</p>
            <p>Tin Tức</p>
            <p>Liên Hệ</p>
          </div>
        </Col>
        <Col xl={2}>
          <h5>Liên kết</h5>
          <div className='d-flex flex-column'>
            <p>Tài Khoản</p>
            <p>Đơn Hàng</p>
            <p>Mục Yêu Thích</p>
            <p>Hoàn Trả</p>
            <p>Chính Sách</p>
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
