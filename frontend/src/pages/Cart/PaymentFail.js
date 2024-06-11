import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const PaymentFail = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/trang-ca-nhan/oder-list'); // Chuyển trang đến trang chỉ định
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
        <div className="text-danger display-4">
          <AiFillCloseCircle className="mr-3" />
          Thanh toán thất bại
        </div>
        <div className='text-danger'>Sẽ chuyển trang sau {countDown} giây</div>
      </div>
    </>
  )
}

export default PaymentFail