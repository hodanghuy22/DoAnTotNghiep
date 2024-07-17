import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { GetCoupons, UpdateStatusCoupon, resetState } from '../features/coupons/couponSlice';
import FormatData from '../utils/FormatData';
import { SearchOutlined } from '@ant-design/icons';




const CouponList = () => {
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetCoupons())
  }, []);
  const couponState = useSelector(state => state?.coupon?.coupons)
  const data1 = [];
  for (let i = 0; i < couponState?.length; i++) {
    data1.push({
      key: i,
      id: couponState[i].id,
      title: couponState[i].title,
      code: couponState[i].code,
      discountPercent: couponState[i].discountPercent,
      discountMoney: FormatData.formatNumber(couponState[i].discountMoney),
      requiredTotal: FormatData.formatNumber(couponState[i].requiredTotal),
      startDate: changeDateFormat(couponState[i].startDate),
      endDate: changeDateFormat(couponState[i].endDate),
      quantity: couponState[i].quantity,
      status: (<>
        <select defaultValue={couponState[i]?.status}
          onChange={(e) => updateStatus(couponState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${couponState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/coupon/${couponState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusCoupon({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetCoupons())
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
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      ...getColumnSearchProps('code'),
    },
    {
      title: 'DiscountPercent',
      dataIndex: 'discountPercent',
      sorter: (a, b) => a.discountPercent - b.discountPercent,
    },
    {
      title: 'DiscountMoney',
      dataIndex: 'discountMoney',
      sorter: (a, b) => a.discountMoney - b.discountMoney,     
    },
    {
      title: 'RequiredTotal',
      dataIndex: 'requiredTotal',
    },
    {
      title: 'StartDate',
      dataIndex: 'startDate',
      ...getColumnSearchProps('startDate'),   
    },
    {
      title: 'EndDate',
      dataIndex: 'endDate',
      ...getColumnSearchProps('endDate'),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of coupons</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ x: 1500, y: 500 }} /></div>
      </div>
    </div>
  )
}

export default CouponList