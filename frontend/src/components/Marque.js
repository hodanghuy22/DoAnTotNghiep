import React from 'react'
import Marquee from 'react-fast-marquee'
import { FaCircle } from 'react-icons/fa'

const Marque = () => {
  return (
    <>
      <section className='marque-wrapper overflow-hidden'>
        <div className='row'>
          <div className='col-12'>
            <div className='bg-dark text-white'>
              <Marquee className='p-1' autoFill={true}>
                <div className='mx-4 fw-bold m-auto d-flex align-items-center'>
                  <FaCircle className='mx-5 m-auto' />
                  Miễn phí giao hàng đơn từ 1.000.000đ
                  <FaCircle className='ms-5 m-auto' />
                </div>
                <div className='mx-4 fw-bold m-auto d-flex align-items-center'>
                  Miễn phí quẹt thẻ
                  <FaCircle className='ms-5 m-auto' />
                </div>
                <div className='mx-4 fw-bold m-auto d-flex align-items-center'>
                  Hỗ trợ trả góp 0%
                  <FaCircle className='ms-5 m-auto' />
                </div>
                <div className='mx-4 fw-bold m-auto d-flex align-items-center'>
                  Giao hàng siêu tốc
                  <FaCircle className='ms-5 m-auto' />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Marque