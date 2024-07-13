import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetProducts, UpdateStatusProduct, resetState } from '../features/products/productSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: <h5 className='fw-bold'>Image</h5>,
    dataIndex: 'hinh',
  },
  {
    title: <h5 className='fw-bold'>Name</h5>,
    dataIndex: 'name',
    sorter: (a, b) => a.Name.length - b.Name.length,
  },
  {
    title: <h5 className='fw-bold'>Brand</h5>,
    sorter: (a, b) => a.Brand.length - b.Brand.length,
    dataIndex: 'brand',
  },
  {
    title: <h5 className='fw-bold'>Category</h5>,
    dataIndex: 'category',
    sorter: (a, b) => a.Category.length - b.Category.length,
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

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetProducts())
  }, []);
  const productState = useSelector(state => state?.product?.products)
  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i,
      id: productState[i].id,
      name: productState[i].name,
      brand: productState[i].brand?.title,
      category: productState[i].category?.title,
      hinh: (<img className='img-fluid w-50' src={productState[i].thumnailUrl} />),
      status: (<>
        <select defaultValue={productState[i]?.status}
          onChange={(e) => updateStatus(productState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${productState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/product/${productState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusProduct({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetProducts())
    }, 300)
  }
  return (
    <div className=' '>
      <h1 className='mb-4 fw-bold'>List of products</h1>
      <div>
        <div>
          <Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }} />
          </div>
      </div>
    </div>
  );
};

export default ProductList;