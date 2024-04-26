import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetCategories, UpdateStatusCategory, resetState } from '../features/categories/categorySlice';

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

const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetCategories())
  }, []);
  const categoryState = useSelector(state => state?.category?.categories)
  const data1 = [];
  for (let i = 0; i < categoryState?.length; i++) {
    data1.push({
      id: categoryState[i].id,
      title: categoryState[i].title,
      status: (<>
        <select defaultValue={categoryState[i]?.status}
          onChange={(e) => updateStatus(categoryState[i]?.id, e.target.value)}
          name=""   className={`form-control form-select fw-bold ${categoryState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/category/${categoryState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a,b) => {
    dispatch(UpdateStatusCategory({id:a, status:b}))
    setTimeout(() => {
      dispatch(GetCategories())
    }, 300)
  }
  return (

    <div>
      <h3>List of categories</h3>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
    </div>
  );
};

export default CategoryList;