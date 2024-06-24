import React from 'react'
import '../assets/css/NotFound.css'
const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1>404 Error Page</h1>
      <section className="error-container">
        <span className="four"><span className="screen-reader-text">4</span></span>
        <span className="zero"><span className="screen-reader-text">0</span></span>
        <span className="four"><span className="screen-reader-text">4</span></span>
      </section>
      <div className="link-container">
        <a target="_parent" href="/" className="more-link">Trở về trang chủ</a>
      </div>
    </div>
  )
}

export default NotFound
