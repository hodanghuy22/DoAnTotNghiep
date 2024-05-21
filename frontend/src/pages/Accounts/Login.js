import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='container w-100 m-auto shadow p-3 mb-5 bg-body rounded p-5'>
      <div className='d-flex w-75 m-auto shadow p-3 mb-5 bg-body rounded '>
        <div className='' style={{ backgroundColor: '#eeeeee' }}>
          <img src='/log.svg' alt='Logo' />
          <div className='p-3'>
            <h6>QUYỀN LỢI THÀNH VIÊN</h6>
            <p>Mua hàng cực dễ dàng, nhanh chóng</p>
            <p>Theo dõi chi tiết đơn hàng, địa chỉ thanh toán</p>
            <p>Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi</p>
          </div>
        </div>
        <div className='p-4 '>
          <div className='d-flex justify-content-center mb-3'>
            <Link className='w-100 fw-bold fs-5 text-center pt-3 pb-3 pl-4 pr-4 border-bottom border-danger text-danger text-decoration-none'>ĐĂNG NHẬP</Link>
            <Link to='/signup' className='w-100 fw-bold fs-5 text-center pt-3 pb-3 pl-4 pr-4 border-bottom text-dark text-decoration-none'>ĐĂNG KÝ</Link>
          </div>
          <form className='d-flex flex-column'>
            <input type='text' placeholder='Email đăng nhập' className='w-100 shadow p-3 mb-4 bg-body rounded' />
            <input type='password' placeholder='Mật khẩu' className='w-100 shadow p-3 mb-3 bg-body rounded' />
            <div className='d-flex justify-content-end'>
              <Link to={''} className='text-danger mb-3'>Quên mật khẩu</Link>
            </div>
            <button type='submit' className='w-100 btn bg-danger p-2 text-light fw-bold mb-2'>ĐĂNG NHẬP</button>
          </form>
          <p className='mt-5'>
            HUBI Shop cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có sự đồng ý của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;