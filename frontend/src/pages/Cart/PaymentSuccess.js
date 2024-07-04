import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/trang-ca-nhan/order-list'); // Chuyển trang đến trang chỉ định
    }, 5000);

    const countdown = setInterval(() => {
      setCountDown((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [navigate]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '100vh',
          backgroundColor: '#b3e6ff',
        }}
      >
        <div className="text-success display-4">
          <FaCheckCircle className="mr-3" />
          Thanh toán thành công
        </div>
        <div className='text-danger'>Sẽ chuyển trang sau {countDown} giây</div>
      </div>
    </>
  )
}

export default PaymentSuccess