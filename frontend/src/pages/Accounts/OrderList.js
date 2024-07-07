import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrderStatusActive } from '../../features/orderStatus/orderStatusSlice';
import InvoiceCard from '../../components/InvoiceCard';
import Loading from '../../utils/Loading';


const OrderList = () => {
  const dispatch = useDispatch()
  const orderStatusState = useSelector(state => state.orderStatus.orderStatuses)
  const [selectedTab, setSelectedTab] = useState(0);
  const [type, setType] = useState("all");
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(GetOrderStatusActive())
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);
  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    if (tabId === 0) {
      setType("all")
    } else {
      setType("getByType")
    }
  };

  return (
    <div className=''>
      <Helmet>
        <title>Lịch sử mua hàng | HUBI</title>
      </Helmet>
      <div>
        <div className="bg-light shadow mb-3 bg-white rounded d-flex">
          {["Tất cả", "Đã đặt", "Đã thanh toán", "Đang vận chuyển", "Đã vận chuyển", "Đã hoàn thành", "Đã hủy"]?.map((tab, index) => (
            <div key={index} className={`pt-3 pb-3 w-25 ${selectedTab === index ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
              <p className={`m-auto text-center ${selectedTab === index ? 'text-danger' : ''}`} onClick={() => handleTabClick(index)}>{tab}</p>
            </div>
          ))}
        </div>
        <div>
          <InvoiceCard type={type} orderStatusId={selectedTab} />
        </div>
      </div>
      {/* Hiển thị Loading nếu đang tải dữ liệu */}
      {isLoading && <Loading />}
      {/* Nội dung chính của ứng dụng sau khi tải xong */}
      {!isLoading && (
        <div>
        </div>
      )}
    </div>
  )
}

export default OrderList
