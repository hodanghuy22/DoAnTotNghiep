import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { GetImportInvoices, resetState } from '../features/importInvoices/importInvoiceSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
  },
  {
    title: <h5 className='fw-bold'>Date Of Receipt</h5>,
    dataIndex: 'dateOfReceipt',
    sorter: (a, b) => a.dateOfReceipt - b.dateOfReceipt,
  },
  {
    title: <h5 className='fw-bold'>totalPrice</h5>,
    dataIndex: 'totalPrice',
    sorter: (a, b) => a.totalPrice - b.totalPrice,
  },
  {
    title: <h5 className='fw-bold'>Supplier</h5>,
    dataIndex: 'supplier',
    sorter: (a, b) => a.supplier.length - b.supplier.length,
  },
  {
    title: <h5 className='fw-bold'>Action</h5>,
    dataIndex: 'action',
  },
];

const ImportInvoiceList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetImportInvoices())
  }, []);
  const importInvoiceState = useSelector(state => state?.importInvoice?.importInvoices)
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  const data1 = [];
  for (let i = 0; i < importInvoiceState?.length; i++) {
    data1.push({
      id: importInvoiceState[i].id,
      dateOfReceipt: changeDateFormat(importInvoiceState[i].dateOfReceipt),
      totalPrice: importInvoiceState[i].totalPrice,
      supplier: importInvoiceState[i].supplier?.name,
      action: (<>
        <Link className='fs-3 text-info' to={`/admin/importinvoice/${importInvoiceState[i].id}`}><BiEdit /></Link>
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
      <h1 className='mb-4 fw-bold'>List of import invoices</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
    </div>
  );
};

export default ImportInvoiceList;