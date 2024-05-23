import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetLogs, resetState } from '../features/logs/logSlice';
import { array } from 'yup';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: <h5 className='fw-bold'>Name</h5>,
    dataIndex: 'name',
    sorter: (a, b) => a.name?.length - b.name?.length,
    filters: [],
    onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    filterSearch: true,
  },
  {
    title: <h5 className='fw-bold'>Action</h5>,
    dataIndex: 'action',
  },
  {
    title: <h5 className='fw-bold'>Date</h5>,
    dataIndex: 'date',
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: <h5 className='fw-bold'>Object</h5>,
    dataIndex: 'object',
  },
  {
    title: <h5 className='fw-bold'>ObjectId</h5>,
    dataIndex: 'objectId',
  },
];

const LogList = () => {
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetLogs())
  }, []);
  const logState = useSelector(state => state?.log?.logs)
  const data1 = [];
  for (let i = 0; i < logState?.length; i++) {
    data1.push({
      key: i,
      id: logState[i].id,
      name: logState[i].user?.name || logState[i].user?.email || '',
      action: logState[i].action,
      date: changeDateFormat(logState[i].date),
      object: logState[i].object,
      objectId: logState[i].objectId,
    });
    const nameValue = logState[i].user?.name || logState[i].user?.email || '';
    const nameFilter = {
      text: nameValue,
      value: nameValue,
    };
    if (!columns[1].filters.some((filter) => filter.value === nameFilter.value)) {
      columns[1].filters.push(nameFilter);
    }
  }
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of logs</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
    </div>
  );
};

export default LogList;