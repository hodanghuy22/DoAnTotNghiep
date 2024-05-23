import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CiCreditCard1, CiDeliveryTruck } from 'react-icons/ci'
import { FaMoneyBill, FaRegCalendarAlt } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'

const Payment = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json')
            .then(response => {
                console.log(response.data); // Check the value of response.data
                const data = Object.values(response.data); // Extracting the array from the response data
                setProvinces(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleProvinceChange = (provinceId) => {
        axios.get(`https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/quan-huyen/${provinceId}.json`)
            .then(response => {
                const data = Object.values(response.data);
                setDistricts(data);
                setWards([]); // Reset danh sách phường/xã khi tỉnh/thành phố thay đổi
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleDistrictChange = (districtId) => {
        axios.get(`https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/xa-phuong/${districtId}.json`)
            .then(response => {
                const data = Object.values(response.data);
                setWards(data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <Container>
            <Row>
                <p>THÔNG TIN NGƯỜI NHẬN</p>
            </Row>
            <form className=''>
                <Row className='d-flex'>
                    <div className='d-flex flex-row'>
                        <div style={{ marginRight: '24px' }}>
                            <input type='radio' id='anh' name='gender' className='square-radio' />
                            <label className='' htmlFor='anh'>Anh</label>
                        </div>
                        <div style={{ marginRight: '24px' }}>
                            <input type='radio' id='chi' name='gender' className='square-radio' />
                            <label className='' htmlFor='chi'>Chị</label>
                        </div>
                    </div>
                </Row>
                <Row className='d-flex'>
                    <div className='col-6 d-flex flex-column'>
                        <div className='d-flex flex-column mt-3'>
                            <label className='mt-2 mb-2'>Họ và tên</label>
                            <input className='p-2 rounded-3' type='text' placeholder='Họ và tên người nhận' />
                        </div>
                        <div className='d-flex flex-column mt-3'>
                            <label className='mt-2 mb-2'>Số điện thoại</label>
                            <input className='p-2 rounded-3' type='text' placeholder='Số điện thoại người nhận' />
                        </div>
                        <div className='d-flex flex-column mt-3'>
                            <label className='mt-2 mb-2'>Email người mua hàng</label>
                            <input className='p-2 rounded-3' type='email' placeholder='Email người mua hàng' />
                        </div>
                        <p className='mt-4'>Vui lòng điền email để nhận thông tin chi tiết về đơn hàng và hóa đơn.</p>
                    </div>
                    <div className='col-6 d-flex flex-column p-4'>
                        <label>Lời nhắn</label>
                        <textarea className='rounded-3' rows={10} cols={10} />
                    </div>
                </Row>
            </form>
            <Row className='mt-5'>
                <p>HÌNH THỨC NHẬN HÀNG</p>
                <div>
                    <p className='btn p-4 fs-5 border btn-icon active' style={{ marginRight: '20px' }}><CiDeliveryTruck className='fs-2' /><br /> Giao hàng tận nơi</p>
                    <p className='btn p-4 fs-5 border btn-icon'><IoHomeOutline className='fs-2' /><br /> Nhận hàng tại cửa hàng</p>
                </div>
                <div className='d-flex justify-content-between mt-3'>
                    <div className='col-3'>
                        <div className=''>
                            <p>Tỉnh/Thành phố</p>
                        </div>
                        <div className=''>
                            <select className='w-100 p-2 text-dark' onChange={e => handleProvinceChange(e.target.value)}>
                                <option value="">Chọn tỉnh/thành phố</option>
                                {provinces && provinces.map(province => (
                                    <option key={province.code} value={province.code}>{province.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className=''>
                            <p>Quận/Huyện</p>
                        </div>
                        <div className=''>
                            <select className='w-100 p-2 text-dark' onChange={e => handleDistrictChange(e.target.value)}>
                                <option value="">Chọn huyện/quận</option>
                                {districts && districts.map(district => (
                                    <option key={district?.code} value={district?.code}>{district?.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className=''>
                            <p>Phường/Xã</p>
                        </div>
                        <div className=''>
                            <select className='w-100 p-2 text-dark'>
                                <option value="">Chọn phường/xã</option>
                                {wards && wards.map(ward => (
                                    <option key={ward?.code} value={ward?.code}>{ward?.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='mt-3'>
                        <p>Địa chỉ chi tiết</p>
                    </div>
                    <div className='w-100'>
                        <input typeof='text' placeholder='Địa chỉ chi tiết' className='text-dark w-100 p-2' />
                    </div>
                </div>
            </Row>
            <Row className='mt-5'>
                <p>HÌNH THỨC THANH TOÁN</p>
                <div>
                    <p className='btn p-4 fs-5 border btn-icon active' style={{ marginRight: '20px' }}><CiCreditCard1 className='fs-2' /><br /> Thanh toán online</p>
                    <p className='btn p-4 fs-5 border btn-icon' style={{ marginRight: '20px' }}><FaRegCalendarAlt className='fs-2' /><br />Chuyển khoản ngân hàng</p>
                    <p className='btn p-4 fs-5 border btn-icon'><FaMoneyBill className='fs-2' /><br />Thanh toán khi nhận hàng</p>
                </div>
            </Row>
            <Row className='justify-content-end'>
                <div className='d-flex w-30 text-end'>
                    <p className='col-6 fs-5 text-dark fw-bold'>Tổng tiền ( 2 sản phẩm):</p>
                    <p className='col-6 fs-5 text-danger fw-bold'>35480000đ</p>
                </div>
            </Row>
            <Row className='justify-content-end'>
                <p className='text-light bg-danger btn-pay rounded-pill fs-5 mt-4'>THANH TOÁN</p>
            </Row>

        </Container>
    )
}

export default Payment