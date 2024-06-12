import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrderStatusActive } from '../../features/orderStatus/orderStatusSlice';
import InvoiceCard from '../../components/InvoiceCard';


const OrderList = () => {
  const dispatch = useDispatch()
  const orderStatusState = useSelector(state => state.orderStatus.orderStatuses)
  const [selectedTab, setSelectedTab] = useState(0);
  const [type, setType] = useState("all");

  useEffect(() => {
    dispatch(GetOrderStatusActive())
  }, [dispatch])

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    if(tabId === 0){
      setType("all")
    }else{
      setType("getByType")
    }
  };

  return (
    <div className='p-5 '>
      <Helmet>
        <title>Lịch sử mua hang | PHBshop</title>
      </Helmet>
      <div>
        <div className="bg-light shadow mb-3 bg-white rounded d-flex">
          <div className={`pt-3 pb-3 w-25 ${selectedTab === 0 ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 0 ? 'text-danger' : ''}`} onClick={() => handleTabClick(0)}>Tất cả</p>
          </div>
          {
            orderStatusState && orderStatusState?.map((item, index) => {
              return (
                <div key={index} className={`pt-3 pb-3 w-25 ${selectedTab === item?.id ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
                  <p className={`m-auto text-center ${selectedTab === item?.id ? 'text-danger' : ''}`} onClick={() => handleTabClick(item?.id)}>{item?.title}</p>
                </div>
              )
            })
          }
        </div>
        <div>
          <InvoiceCard type={type} orderStatusId={selectedTab} />
        </div>
      </div>
    </div>
  )
}

export default OrderList
