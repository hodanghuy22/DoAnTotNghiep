import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetProducts, UpdateStatusProduct, resetState } from '../features/products/productSlice';
import { SearchOutlined } from '@ant-design/icons';



const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetProducts())
  }, []);
  const productState = useSelector(state => state?.product?.products)
  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i,
      id: productState[i].id,
      name: productState[i].name,
      brand: productState[i].brand?.title,
      category: productState[i].category?.title,
      hinh: (<img className='img-fluid w-50' src={productState[i].thumnailUrl} />),
      status: (<>
        <select defaultValue={productState[i]?.status}
          onChange={(e) => updateStatus(productState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${productState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/product/${productState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a, b) => {
    dispatch(UpdateStatusProduct({ id: a, status: b }))
    setTimeout(() => {
      dispatch(GetProducts())
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
      title: <h5 className='fw-bold'>Image</h5>,
      dataIndex: 'hinh',
    },
    {
      title: <h5 className='fw-bold'>Name</h5>,
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: <h5 className='fw-bold'>Brand</h5>,
      dataIndex: 'brand',
      ...getColumnSearchProps('brand'),

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
    <div className=' '>
      <h1 className='mb-4 fw-bold'>List of products</h1>
      <div>
        <div>
          <Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }} />
          </div>
      </div>
    </div>
  );
};

export default ProductList;