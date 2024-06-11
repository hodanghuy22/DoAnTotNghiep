import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai";

const PaymentFail = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '100vh',
          backgroundColor: '#b3e6ff',
        }}
      >
        <div className="text-danger display-4">
          <AiFillCloseCircle className="mr-3" />
          Thanh toán thất bại
        </div>
      </div>
    </>
  )
}

export default PaymentFail