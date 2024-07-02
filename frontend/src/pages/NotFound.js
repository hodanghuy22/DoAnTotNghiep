import React from 'react'
import notfound from '../assets/images/404.png'
import { Link } from 'react-router-dom'
const NotFound = () => {

  return (
    <div className='d-flex justify-content-center ' style={{ heigh: '100vh', alignItems: 'center' }}>
      <div className="col-6 d-flex align-items-center" style={{ marginTop: '20vh' }}>
        <div className=''>
          <img src={notfound} alt='notfound' width={'100%'} />
        </div>
        <div className='d-flex flex-column'>
          <p className='fs-1 text-center'>Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!</p>
          <Link to={'/'} className='btn border-danger bg-warning text-light'>Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
