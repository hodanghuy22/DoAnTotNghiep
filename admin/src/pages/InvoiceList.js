import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetInvoices, resetState } from '../features/invoices/invoiceSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: <h5 className='fw-bold'>User</h5>,
    dataIndex: 'user',
  },
  {
    title: <h5 className='fw-bold'>Issue Date</h5>,
    dataIndex: 'issueDate',
    sorter: (a, b) => a.issueDate - b.issueDate,
  },
  {
    title: <h5 className='fw-bold'>Delivery Date</h5>,
    dataIndex: 'deliveryDate',
    sorter: (a, b) => a.deliveryDate - b.deliveryDate,
  },
  {
    title: <h5 className='fw-bold'>Total Price</h5>,
    dataIndex: 'totalPrice',
    sorter: (a, b) => a.totalPrice - b.totalPrice,
  },
  {
    title: <h5 className='fw-bold'>Total Price After Discount</h5>,
    dataIndex: 'totalPriceAfterDiscount',
    sorter: (a, b) => a.totalPriceAfterDiscount - b.totalPriceAfterDiscount,
  },
  {
    title: <h5 className='fw-bold'>Coupon</h5>,
    dataIndex: 'coupon',
  },
  {
    title: <h5 className='fw-bold'>Paid</h5>,
    dataIndex: 'paid',
    sorter: (a, b) => a.paid - b.paid,
  },
  {
    title: <h5 className='fw-bold'>Order Status</h5>,
    dataIndex: 'orderStatus',
  },
  {
    title: <h5 className='fw-bold'>Action</h5>,
    dataIndex: 'action',
  },
];

const InvoiceList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetInvoices())
  }, []);
  const invoiceState = useSelector(state => state?.invoice?.invoices)
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  const data1 = [];
  for (let i = 0; i < invoiceState?.length; i++) {
    data1.push({
      key: i,
      id: invoiceState[i].id,
      user: invoiceState[i].user?.name,
      issueDate: invoiceState[i].issueDate,
      deliveryDate: invoiceState[i].deliveryDate,
      totalPrice: invoiceState[i].totalPrice,
      totalPriceAfterDiscount: invoiceState[i].totalPriceAfterDiscount,
      coupon: invoiceState[i].coupon?.title,
      paid: invoiceState[i].paid ? <p className='text-success'>Đã thanh toán</p> : <p className='text-danger'>Chưa thanh toán</p>,
      orderStatus: invoiceState[i].orderStatus?.title,
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/importinvoice/${invoiceState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a,b) => {
    // dispatch(UpdateStatusCategory({id:a, status:b}))
    // setTimeout(() => {
    //   dispatch(GetCategories())
    // }, 300)
  }
  return (

    <div>
      <h3>List of invoices</h3>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ x: 2000, y: 500 }} /></div>
      </div>
    </div>
  );
};

export default InvoiceList;