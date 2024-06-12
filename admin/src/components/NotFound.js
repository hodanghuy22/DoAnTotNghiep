import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const NotFound = () => {
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
          <AiFillCloseCircle />
          Trang không tồn tại!
        </div>
      </div>
    </>
  )
}

export default NotFound