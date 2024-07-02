import React, { useEffect, useState } from 'react';
import { Form, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetInvoices, UpdateStatusInvoice, resetState } from '../features/invoices/invoiceSlice';
import { GetOrderStatusesActive } from '../features/orderStatus/orderStatusSlice';
import FormatData from '../utils/FormatData';

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
    dispatch(GetOrderStatusesActive())
  }, []);
  const invoiceState = useSelector(state => state?.invoice?.invoices)
  const orderStatusState = useSelector(state => state?.orderStatus?.orderStatuses)

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
      issueDate: changeDateFormat(invoiceState[i].issueDate),
      deliveryDate: changeDateFormat(invoiceState[i].deliveryDate),
      totalPrice: FormatData.formatNumber(invoiceState[i].totalPrice),
      totalPriceAfterDiscount: FormatData.formatNumber(invoiceState[i].totalPriceAfterDiscount),
      coupon: invoiceState[i].coupon?.title,
      orderStatus: (<>
        <select defaultValue={invoiceState[i]?.orderStatusId}
          onChange={(e) => updateStatus(invoiceState[i]?.id, e.target.value)}
          name="" className={`form-control form-select fw-bold ${invoiceState[i]?.orderStatusId !== 6 ? 'text-success' : 'text-danger'}`}
        >
          {
            orderStatusState && orderStatusState?.map((i,j) => {
              return (
                <option key={j} value={i?.id}>{i?.title}</option>
              )
            })
          }
        </select>
      </>),
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/invoice/${invoiceState[i].id}`}><BiEdit /></Link>
      </>)
    });
  }
  const updateStatus = (a,b) => {
    dispatch(UpdateStatusInvoice({id:a, status:b}))
    setTimeout(() => {
      dispatch(GetInvoices())
    }, 300)
  }
  return (

    <div>
      <h1 className='mb-4 fw-bold'>List of invoices</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: '68vh' }}/></div>
      </div>
    </div>
  );
};

export default InvoiceList;