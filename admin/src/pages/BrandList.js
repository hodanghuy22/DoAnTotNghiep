import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateStatusBrand, GetBrands, resetState } from '../features/brands/brandSlice';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
  },
  {
    title: <h5 className='fw-bold'>Title</h5>,
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: <h5 className='fw-bold'>Status</h5>,
    dataIndex: 'status',
  },
  {
    title: <h5 className='fw-bold'>Action</h5>,
    dataIndex: 'action',
  },
];

const BrandList = () => {
  const [brandId, setBrandId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetBrands())
  }, []);
  const brandState = useSelector(state => state?.brand?.brands)
  const data1 = [];
  for (let i = 0; i < brandState?.length; i++) {
    data1.push({
      key: i,
      id: brandState[i].id,
      title: brandState[i].title,
      status: (<>
        <select defaultValue={brandState[i]?.status}
          onChange={(e) => updateStatusBrand(brandState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${brandState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/brand/${brandState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatusBrand = (a, b) => {
    dispatch(UpdateStatusBrand({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetBrands())
    }, 300)
  }
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of brands</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }}/></div>
      </div>
    </div>
  );
};

export default BrandList;