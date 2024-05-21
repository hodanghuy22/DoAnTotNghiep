import React, { useEffect } from 'react'
import DasboardCard from '../components/DasboardCard'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { CountCancelInvoicesByMonth, CountInvoicesByMonth, RevenueAfterDiscountByMonth, RevenueByMonth } from '../features/invoices/invoiceSlice'
import { CountUser } from '../features/auths/authSlice'
import { Column } from '@ant-design/charts'

const Dashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(CountInvoicesByMonth({
      month:currentMonth,
      year: currentYear
    }))
    dispatch(CountCancelInvoicesByMonth({
      month:currentMonth,
      year: currentYear
    }))
    dispatch(RevenueByMonth({
      month:currentMonth,
      year: currentYear
    }))
    dispatch(RevenueAfterDiscountByMonth({
      month:currentMonth,
      year: currentYear
    }))
    dispatch(CountUser())
  }, [])

  const countInvoicesByMonth = useSelector(state => state?.invoice?.countInvoicesByMonth)
  const countCancelInvoicesByMonth = useSelector(state => state?.invoice?.countCancelInvoicesByMonth)
  const revenueByMonth = useSelector(state => state?.invoice?.revenueByMonth)
  const revenueAfterDiscountByMonth = useSelector(state => state?.invoice?.revenueAfterDiscountByMonth)
  const countUser = useSelector(state => state?.auth?.countUser)


  const data = [
    { type: '1-3', value: 0.16 },
    { type: '4-10秒', value: 0.125 },
    { type: '11-30秒', value: 0.24 },
    { type: '31-60秒', value: 0.19 },
    { type: '1-3分', value: 0.22 },
    { type: '3-10分', value: 0.05 },
    { type: '10-30分', value: 0.01 },
    { type: '30+分', value: 0.015 },
  ];
  
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ type }) => {
        if (type === '10-30分' || type === '30+分') {
          return '#22CBCC';
        }
        return '#2989FF';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return (
    <>
      <h1>Trang thống kê</h1>
      <div className='mt-3 container-fuild d-flex  justify-content-between'>
        <DasboardCard
          icon={<MdOutlineShoppingCart
            style={{
              color: "green",
              backgroundColor: "rgba(0,225,0,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Hóa đơn"}
          value={countInvoicesByMonth} />
        <DasboardCard
          icon={<MdOutlineShoppingCart
            style={{
              color: "red",
              backgroundColor: "rgba(225,0,0,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Hoá đơn hủy"}
          value={countCancelInvoicesByMonth} />
        <DasboardCard
          icon={<FiUser
            style={{
              color: "purple",
              backgroundColor: "rgba(0,225,225,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Khách hàng"}
          value={countUser} />
        <DasboardCard
          icon={<RiMoneyDollarCircleLine
            style={{
              color: "green",
              backgroundColor: "rgba(0,225,0,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Doanh thu"}
          value={revenueByMonth} />
          <DasboardCard
          icon={<RiMoneyDollarCircleLine
            style={{
              color: "red",
              backgroundColor: "rgba(225,0,0,0.25)",
              borderRadius: 20,
              fontSize: 42,
              padding: 8,
            }}
          />}
          title={"Doanh thu sau chiết khấu"}
          value={revenueAfterDiscountByMonth} />
      </div>
      <div className='mt-5 container-fuild'>
        <h3 className='mb-3'>Doanh số theo tháng</h3>
        <div className='border rounded-3 p-3 bg-white'>
          <Column {...config} />
        </div>
      </div>
    </>
  )
}

export default Dashboard