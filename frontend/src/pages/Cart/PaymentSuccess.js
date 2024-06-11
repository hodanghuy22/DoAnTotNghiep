import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const PaymentSuccess = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '100vh',
          backgroundColor: '#b3e6ff',
        }}
      >
        <div className="text-success display-4">
          <FaCheckCircle className="mr-3" />
          Thanh toán thành công
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess