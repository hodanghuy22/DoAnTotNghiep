import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { GetCapacities, UpdateStatusCapacity, resetState } from '../features/capacitites/capacitySlice';
import { SearchOutlined } from '@ant-design/icons';



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
      key: i,
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
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });
  const columns = [
    {
      title: <h5 className='fw-bold'>Id</h5>,
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: <h5 className='fw-bold'>Total Capacity</h5>,
      dataIndex: 'totalCapacity',
      ...getColumnSearchProps('totalCapacity'),
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
  return (

    <div>
      <h1 className='mb-4 fw-bold'>List of capacities</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }}/></div>
      </div>

    </div>
  );
};

export default CapacityList