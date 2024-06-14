import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetNotifications } from '../features/notifications/nofiticationSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: <h5 className='fw-bold'>Title</h5>,
    dataIndex: 'title',
  },
  {
    title: <h5 className='fw-bold'>Message</h5>,
    dataIndex: 'message',
  },
  {
    title: <h5 className='fw-bold'>Create At</h5>,
    dataIndex: 'createAt',
  },
];

const NotificationList = () => {
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  useEffect(() => {
    dispatch(GetNotifications())
  }, []);
  const notiState = useSelector(state => state?.notification?.notifications)
  const data1 = [];
  for (let i = 0; i < notiState?.length; i++) {
    data1.push({
      key: i,
      id: notiState[i].id,
      title: notiState[i].title,
      message: notiState[i].message,
      createAt: changeDateFormat(notiState[i].createdAt),
    });
  }
  
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of notifications</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
    </div>
  );
};

export default NotificationList;