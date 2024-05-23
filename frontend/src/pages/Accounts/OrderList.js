import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './../../assets/css/order.css'

const OrderList = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  return (
    <div className='p-5 '>
      <div className=''>
        <div className='border-bottom'>
          <p>QUẢN LÝ ĐƠN HÀNG</p>
        </div>
        <div className='container w-100 m-auto'>
          <div className=' '>
            <div className="grid-container">
              <p
                className={`grid-item ${activeItem === 0 ? 'active' : ''}`}
                onClick={() => handleItemClick(0)}
              >
                Đã đặt
              </p>
              <p
                className={`grid-item ${activeItem === 1 ? 'active' : ''}`}
                onClick={() => handleItemClick(1)}
              >
                Đã thanh toán
              </p>
              <p
                className={`grid-item ${activeItem === 2 ? 'active' : ''}`}
                onClick={() => handleItemClick(2)}
              >
                Đang giao
              </p>
              <p
                className={`grid-item ${activeItem === 3 ? 'active' : ''}`}
                onClick={() => handleItemClick(3)}
              >
                Đã giao
              </p>
              <p
                className={`grid-item ${activeItem === 4 ? 'active' : ''}`}
                onClick={() => handleItemClick(4)}
              >
                Hoàn tất
              </p>
              <p
                className={`grid-item ${activeItem === 5 ? 'active' : ''}`}
                onClick={() => handleItemClick(5)}
              >
                Đã huỷ
              </p>
            </div>
          </div>
          <div className='order-item p-3 shadow mb-2 bg-body rounded'>
            <div className='d-flex justify-content-between border-bottom'>
              <p>Đơn hàng: #123123</p>
              <p className='text-success fw-bold'>Đã nhận hàng</p>
            </div>
            <div className='d-flex justify-content-between mt-3'>
              <div className='d-flex'>
                <div className=''>
                  <img style={{ width: '60px' }} src='https://cdn.tgdd.vn/Products/Images/2162/313884/loa-bluetooth-ava-plus-minipod-y23-trang-0-1-180x125.jpg' alt='loa blu' />
                </div>
                <div className=''>
                  <p>Loa Bluetooth AVA+ MiniPod Y23 Trắng</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Tổng tiền: 110.000đ</p>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div>
                <Link to={'detail'} className='btn border border-danger'>Xem chi tiết</Link>
              </div>
            </div>
          </div>
          <div className='order-item p-3 shadow mb-2 bg-body rounded'>
            <div className='d-flex justify-content-between border-bottom'>
              <p>Đơn hàng: #123123</p>
              <p className='text-success fw-bold'>Đã nhận hàng</p>
            </div>
            <div className='d-flex justify-content-between mt-3'>
              <div className='d-flex'>
                <div className=''>
                  <img style={{ width: '60px' }} src='https://cdn.tgdd.vn/Products/Images/1363/315619/mieng-dan-may-cat-tpu-4-lop-o-tech-hd10-thumb-400x400.jpg' alt='loa blu' />
                </div>
                <div className=''>
                  <p>Miếng dán máy cắt TPU 4 lớp O-TECH HD10</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Tổng tiền: 70.000đ</p>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div>
                <Link to={'detail'} className='btn border border-danger'>Xem chi tiết</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList
