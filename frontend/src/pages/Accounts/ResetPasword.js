import React from 'react'

const ResetPasword = () => {
  return (
    <div className='p-5'>
      <div className='w-100 '>
        <div>
          <p>ĐỔI MẬT KHẨU</p>
        </div>
        <div className=''>
          <div className='d-flex w-100  p-2'>
            <div className='col-4 mt-1'>
              <p>Mật khẩu cũ</p>
            </div>
            <div className='col-8'>
              <input typeof='text' placeholder='Mật khẩu cũ' className='text-dark w-100 p-2' />
            </div>
          </div>
          <div className='d-flex w-100 p-2'>
            <div className='col-4 mt-1'>
              <p>Mật khẩu mới</p>
            </div>
            <div className='col-8'>
              <input typeof='text' placeholder='hksbai293' className='text-dark w-100 p-2' />
            </div>
          </div>
          <div className='d-flex w-100 p-2'>
            <div className='col-4 mt-1'>
              <p>Nhập lại mật khẩu mới</p>
            </div>
            <div className='col-8'>
              <input typeof='text' placeholder='hksbai293' className='text-dark w-100 p-2' />
            </div>
          </div>
          <div className='d-flex w-100 p-2'>
            <div className='col-4 mt-1'>
            </div>
            <div className='col-8 '>
              <button typeof='submit' className='w-100 btn bg-danger fw-bold text-light' >Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasword
