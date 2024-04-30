import React from 'react'

const AddProduct = () => {
  return (
    <div className='container'>
      <h1 className='mb-4 fw-bold'>Add Product</h1>
      <div className='row border border-3 p-3 rounded-3 d-flex flex-row mt-3'>
        <h3 className='fw-bold'>Chọn loại sản phẩm</h3>
        <div className='col-3 text-center'>
          <button className='btn btn-success'>Điện thoại</button>
        </div>
        <div className='col-3 text-center'>
          <button className='btn btn-success'>Tai nghe có dây</button>
        </div>
        <div className='col-3 text-center'>
          <button className='btn btn-success'>Tai nghe không dây</button>

        </div>
        <div className='col-3 text-center'>
          <button className='btn btn-success'>Sạc dự phòng</button>

        </div>

      </div>
      <div className='row border border-3 p-3 rounded-3 mt-3'>

      </div>
    </div>
  )
}

export default AddProduct