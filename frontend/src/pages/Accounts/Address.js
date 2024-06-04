import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser } from '../../features/auths/authSlice';


const Address = () => {
  const dispatch = useDispatch();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json')
      .then(response => {
        const data = Object.values(response.data);
        setProvinces(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleProvinceChange = (provinceId, provinceName) => {
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
  const handleDistrictChange = (districtId, districtName) => {
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
    <div className='p-5'>
      <div className=''>
        <div className='border-bottom'>
          <p>Địa chỉ</p>
        </div>
        <div className=''>
          <div className='d-flex p-2'>
            <div className='col-3 mt-1'>
              <p>Tỉnh/Thành phố</p>
            </div>
            <div className='col-8'>
              <select className='w-100 p-2 text-dark' onChange={e => handleProvinceChange(e.target.value, e.target.options[e.target.selectedIndex].text)}>
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces && provinces.map(province => (
                  <option key={province.code} value={province.code}>{province.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='d-flex p-2'>
            <div className='col-3 mt-1'>
              <p>Quận/Huyện</p>
            </div>
            <div className='col-8'>
              <select className='w-100 p-2 text-dark' onChange={e => handleDistrictChange(e.target.value, e.target.options[e.target.selectedIndex].text)}>
                <option value="">Chọn huyện/quận</option>
                {districts && districts.map(district => (
                  <option key={district?.code} value={district?.code}>{district?.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='d-flex p-2'>
            <div className='col-3 mt-1'>
              <p>Phường/Xã</p>
            </div>
            <div className='col-8'>
              <select
                className='w-100 p-2 text-dark'
                onChange={e => handleCommuneChange(e.target.options[e.target.selectedIndex].text)}
              >
                <option value="">Chọn phường/xã</option>
                {wards && wards.map(ward => (
                  <option key={ward?.code} value={ward?.code}>{ward?.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='d-flex p-2'>
            <div className='col-3 mt-1'>
              <p>Địa chỉ chi tiết</p>
            </div>
            <div className='col-8'>
              <input typeof='text' placeholder='Địa chỉ chi tiết' className='text-dark w-100 p-2' />
            </div>
          </div>
          <div className='d-flex p-2'>
            <div className='col-3 mt-1'>
            </div>
            <div className='col-8 '>
              <button typeof='submit' className='w-100 btn bg-danger fw-bold text-light' >LƯU THAY ĐỔI</button>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Address
