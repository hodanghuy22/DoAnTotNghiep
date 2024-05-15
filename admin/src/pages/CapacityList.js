import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { GetCapacities, UpdateStatusCapacity, resetState } from '../features/capacitites/capacitySlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
  },
  {
    title: <h5 className='fw-bold'>Total Capacity</h5>,
    dataIndex: 'totalCapacity',
    sorter: (a, b) => a.totalCapacity - b.totalCapacity,
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

const CapacityList = () => {
  const [open, setOpen] = useState(false);
  const [capacityId, setCapacityId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetCapacities())
  }, []);

  const capacityState = useSelector(state => state?.capacity?.capacities)
  const data1 = [];
  for (let i = 0; i < capacityState?.length; i++) {
    data1.push({
      id: capacityState[i].id,
      totalCapacity: capacityState[i].totalCapacity,
      status: (<>
        <select defaultValue={capacityState[i]?.status}
          onChange={(e) => updateStatus(capacityState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${capacityState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/capacity/${capacityState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusCapacity({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetCapacities())
    }, 300)
  }
  return (

    <div>
      <h1 className='mb-4 fw-bold'>List of capacities</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>

    </div>
  );
};

export default CapacityList