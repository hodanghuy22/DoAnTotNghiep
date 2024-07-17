import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetProductDetails, UpdateStatusProductDetail, resetState } from '../features/productDetails/productDetailSlice';
import { SearchOutlined } from '@ant-design/icons';



const ProductDetailList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetProductDetails())
  }, []);
  const productDetailState = useSelector(state => state?.productDetail?.productDetails)
  const data1 = [];
  for (let i = 0; i < productDetailState?.length; i++) {
    data1.push({
      key: i,
      id: productDetailState[i].id,
      name: productDetailState[i].product?.name,
      category: productDetailState[i].product?.category?.title,
      capacity: productDetailState[i].capacity?.totalCapacity,
      color: productDetailState[i].color?.colorName,
      quantity: productDetailState[i].quantity,
      status: (<>
        <select defaultValue={productDetailState[i]?.status}
          onChange={(e) => updateStatus(productDetailState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${productDetailState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/productDetail/${productDetailState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusProductDetail({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetProductDetails())
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
      sorter: (a, b) => a.id - b.id,
      dataIndex: 'id',
    },
    {
      title: <h5 className='fw-bold'>Name</h5>,
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    }, 
    {
      title: <h5 className='fw-bold'>Quantity</h5>,
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: <h5 className='fw-bold'>Capacity</h5>,
      dataIndex: 'capacity',
    },
    {
      title: <h5 className='fw-bold'>Color</h5>,
      dataIndex: 'color',
    },
    {
      title: <h5 className='fw-bold'>Category</h5>,
      dataIndex: 'category',
      ...getColumnSearchProps('category'),
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
      <h1 className='mb-4 fw-bold'>List of product details</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }} /></div>
      </div>
    </div>
  );
};

export default ProductDetailList;