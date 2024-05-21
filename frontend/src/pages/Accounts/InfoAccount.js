import React from 'react'

const InfoAccount = () => {
    return (
        <div className='p-5 border'>
            <div className=''>
                <div>
                    <p>THÔNG TIN TẢI KHOẢN</p>
                </div>
                <div className=''>
                    <div className='d-flex  p-2'>
                        <div className='col-3 mt-1'>
                            <p>Họ tên</p>
                        </div>
                        <div className='col-8'>
                            <input typeof='text' placeholder='' value={'hksbai2003'} className='text-dark w-100 p-2' />
                        </div>
                    </div>
                    <div className='d-flex p-2'>
                        <div className='col-3 mt-1'>
                            <p>Email</p>
                        </div>
                        <div className='col-8'>
                            <input typeof='text' placeholder='' value={'hksbai2003'} className='text-dark w-100 p-2' />
                        </div>
                    </div>
                    <div className='d-flex p-2'>
                        <div className='col-3 mt-1'>
                            <p>Điện thoại</p>
                        </div>
                        <div className='col-8'>
                            <input typeof='text' placeholder='' value={'hksbai2003'} className='text-dark w-100 p-2' />
                        </div>
                    </div>
                    <div className='d-flex p-2'>
                        <div className='col-3 mt-1'>
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

export default InfoAccount
