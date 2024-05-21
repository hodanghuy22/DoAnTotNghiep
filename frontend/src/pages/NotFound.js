import React from 'react'
import '../assets/css/NotFound.css'
const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1>404 Error Page</h1>
      <section class="error-container">
        <span class="four"><span class="screen-reader-text">4</span></span>
        <span class="zero"><span class="screen-reader-text">0</span></span>
        <span class="four"><span class="screen-reader-text">4</span></span>
      </section>
      <div class="link-container">
        <a target="_parent" href="/" class="more-link">Trở về trang chủ</a>
      </div>
    </div>
  )
}

export default NotFound
