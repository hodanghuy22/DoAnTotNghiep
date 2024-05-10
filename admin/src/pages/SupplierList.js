import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetSuppliers, UpdateStatusSupplier, resetState } from '../features/suppliers/supplierSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: <h5 className='fw-bold'>Name</h5>,
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: <h5 className='fw-bold'>Email</h5>,
    dataIndex: 'email',
  },
  {
    title: <h5 className='fw-bold'>Phone Number</h5>,
    dataIndex: 'phoneNumber',
  },
  {
    title: <h5 className='fw-bold'>Address</h5>,
    dataIndex: 'address',
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

const SupplierList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetSuppliers())
  }, []);
  const supplierState = useSelector(state => state?.supplier?.suppliers)
  const data1 = [];
  for (let i = 0; i < supplierState?.length; i++) {
    data1.push({
      key: i,
      id: supplierState[i].id,
      name: supplierState[i].name,
      email: supplierState[i].email,
      phoneNumber: supplierState[i].phoneNumber,
      address: supplierState[i].address,
      status: (<>
        <select defaultValue={supplierState[i]?.status}
          onChange={(e) => updateStatus(supplierState[i]?.id, e.target.value)}
          name=""   className={`form-control form-select fw-bold ${supplierState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/supplier/${supplierState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a,b) => {
    dispatch(UpdateStatusSupplier({id:a, status:b}))
    setTimeout(() => {
      dispatch(GetSuppliers())
    }, 300)
  }
  return (

    <div>
      <h3>List of suppliers</h3>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
    </div>
  );
};

export default SupplierList;