import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers } from '../features/auths/authSlice';


const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'UserName',
    dataIndex: 'userName',
  },
  {
    title: 'PhoneNumber',
    dataIndex: 'phoneNumber',
  },
];

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllUsers())
  }, []);
  const userState = useSelector(state => state?.auth?.listUser)
  const data1 = [];
  for (let i = 0; i < userState?.length; i++) {
    data1.push({
      key: i,
      id: userState[i].id,
      name: userState[i].name,
      age: userState[i].age,
      address: userState[i].address,
      email: userState[i].email,
      userName: userState[i].userName,
      phoneNumber: userState[i].phoneNumber,
    });
  }
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of accounts</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
    </div>
  )
}

export default UserList