import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import AllInvoices from '../Invoices/AllInvoices';
import IsPaid from '../Invoices/IsPaid';
import IsBeginShipped from '../Invoices/IsBeginShipped';
import IsShipped from '../Invoices/IsShipped';
import IsCompled from '../Invoices/IsCompled';
import IsCanceled from '../Invoices/IsCanceled';


const OrderList = () => {
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderForm = () => {
    switch (selectedTab) {
      case 'Tất cả':
        return <AllInvoices />;
      case 'Đã thanh toán':
        return <IsPaid />;
      case 'Đang vận chuyển':
        return <IsBeginShipped />;
      case 'Đã vận chuyển':
        return <IsShipped />;
      case 'Đã hoàn thành':
        return <IsCompled />;
      case 'Đã hủy':
        return <IsCanceled />;
      default:
        return null;
    }
  };

  return (
    <div className='p-5 '>
      <Helmet>
        <title>Lịch sử mua hang | PHBshop</title>
      </Helmet>
      <div>
        <div className="bg-light shadow mb-3 bg-white rounded d-flex">
          <div className={`pt-3 pb-3 w-25 ${selectedTab === 'Tất cả' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Tất cả' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Tất cả')}>Tất cả</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đã thanh toán' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đã thanh toán' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đã thanh toán')}>Đã thanh toán</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đang vận chuyển' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đang vận chuyển' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đang vận chuyển')}>Đang vận chuyển</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đã vận chuyển' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đã vận chuyển' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đã vận chuyển')}>Đã vận chuyển</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đã hoàn thành' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đã hoàn thành' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đã hoàn thành')}>Đã hoàn thành</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đã hủy' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đã hủy' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đã hủy')}>Đã hủy</p>
          </div>
        </div>
        <div>
          {renderForm()}
        </div>
      </div>
    </div>
  )
}

export default OrderList
