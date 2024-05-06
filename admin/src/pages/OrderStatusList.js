import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetOrderStatuses, UpdateStatusOrderStatus, resetState } from '../features/orderStatus/orderStatusSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
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

const OrderStatusList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetOrderStatuses())
  }, []);
  const orderStatusState = useSelector(state => state?.orderStatus?.orderStatuses)
  const data1 = [];
  for (let i = 0; i < orderStatusState?.length; i++) {
    data1.push({
      key: i,
      id: orderStatusState[i].id,
      title: orderStatusState[i].title,
      status: (<>
        <select defaultValue={orderStatusState[i]?.status}
          onChange={(e) => updateStatus(orderStatusState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${orderStatusState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/orderstatus/${orderStatusState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusOrderStatus({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetOrderStatuses())
    }, 300)
  }
  return (
    <div>
      <h3>List of colors</h3>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
    </div>
  );
};

export default OrderStatusList;