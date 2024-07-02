import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { GetCoupons, UpdateStatusCoupon, resetState } from '../features/coupons/couponSlice';
import FormatData from '../utils/FormatData';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'DiscountPercent',
    dataIndex: 'discountPercent',
  },
  {
    title: 'DiscountMoney',
    dataIndex: 'discountMoney',
  },
  {
    title: 'RequiredTotal',
    dataIndex: 'requiredTotal',
  },
  {
    title: 'StartDate',
    dataIndex: 'startDate',
  },
  {
    title: 'EndDate',
    dataIndex: 'endDate',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
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