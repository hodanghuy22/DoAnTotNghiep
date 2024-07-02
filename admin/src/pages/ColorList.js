import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { GetColors, UpdateStatusColor, resetState } from '../features/colors/colorSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
  },
  {
    title: <h5 className='fw-bold'>Color Name</h5>,
    dataIndex: 'colorName',
    sorter: (a, b) => a.colorName.length - b.colorName.length,
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

const ColorList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetColors())
  }, []);
  const colorState = useSelector(state => state?.color?.colors)
  const data1 = [];
  for (let i = 0; i < colorState?.length; i++) {
    data1.push({
      key: i,
      id: colorState[i].id,
      colorName: colorState[i].colorName,
      status: (<>
        <select defaultValue={colorState[i]?.status}
          onChange={(e) => updateStatus(colorState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${colorState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/color/${colorState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusColor({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetColors())
    }, 300)
  }
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of colors</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }} /></div>
      </div>
    </div>
  );
};

export default ColorList;