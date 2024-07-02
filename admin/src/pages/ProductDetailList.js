import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetProductDetails, UpdateStatusProductDetail, resetState } from '../features/productDetails/productDetailSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    sorter: (a, b) => a.id - b.id,
    dataIndex: 'id',
  },
  {
    title: <h5 className='fw-bold'>Name</h5>,
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  }, 
  {
    title: <h5 className='fw-bold'>Quantity</h5>,
    dataIndex: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: <h5 className='fw-bold'>Capacity</h5>,
    sorter: (a, b) => a.capacity.length - b.capacity.length,
    dataIndex: 'capacity',
  },
  {
    title: <h5 className='fw-bold'>Color</h5>,
    dataIndex: 'color',
    sorter: (a, b) => a.color.length - b.color.length,
  },
  {
    title: <h5 className='fw-bold'>Category</h5>,
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
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

const ProductDetailList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetProductDetails())
  }, []);
  const productDetailState = useSelector(state => state?.productDetail?.productDetails)
  const data1 = [];
  for (let i = 0; i < productDetailState?.length; i++) {
    data1.push({
      key: i,
      id: productDetailState[i].id,
      name: productDetailState[i].product?.name,
      category: productDetailState[i].product?.category?.title,
      capacity: productDetailState[i].capacity?.totalCapacity,
      color: productDetailState[i].color?.colorName,
      quantity: productDetailState[i].quantity,
      status: (<>
        <select defaultValue={productDetailState[i]?.status}
          onChange={(e) => updateStatus(productDetailState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${productDetailState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/productDetail/${productDetailState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusProductDetail({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetProductDetails())
    }, 300)
  }
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of product details</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }} /></div>
      </div>
    </div>
  );
};

export default ProductDetailList;