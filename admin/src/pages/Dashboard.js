import React, { useEffect, useState } from 'react'
import DasboardCard from '../components/DasboardCard'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { CountCancelInvoicesByMonth, CountInvoicesByMonth, GetRevenueAfterDiscountByMonth, GetRevenueByMonth, GetRevenueOfYear } from '../features/invoices/invoiceSlice'
import { CountUser } from '../features/auths/authSlice'
import { Column } from '@ant-design/charts'

const Dashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CountInvoicesByMonth({
      month: currentMonth,
      year: currentYear
    }))
    dispatch(CountCancelInvoicesByMonth({
      month: currentMonth,
      year: currentYear
    }))
    dispatch(GetRevenueByMonth({
      month: currentMonth,
      year: currentYear
    }))
    dispatch(GetRevenueAfterDiscountByMonth({
      month: currentMonth,
      year: currentYear
    }))
    dispatch(GetRevenueOfYear({
      year: currentYear
    }))
    dispatch(CountUser())
  }, [])

  const countInvoicesByMonth = useSelector(state => state?.invoice?.countInvoicesByMonth)
  const countCancelInvoicesByMonth = useSelector(state => state?.invoice?.countCancelInvoicesByMonth)
  const revenueByMonth = useSelector(state => state?.invoice?.revenueByMonth)
  const revenueAfterDiscountByMonth = useSelector(state => state?.invoice?.revenueAfterDiscountByMonth)
  const revenueOfYearState = useSelector(state => state?.invoice?.revenueOfYear)
  const countUser = useSelector(state => state?.auth?.countUser)

  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let data = []
    for (let index = 0; index < revenueOfYearState?.length; index++) {
      const element = revenueOfYearState[index];
      data.push({
        type: monthNames[element?.month] ? monthNames[element?.month - 1] : "December",
        revenue: revenueOfYearState[index]?.revenue
      })
    }
    setMonthData(data)
  }, [revenueOfYearState])

  const config = {
    data: monthData,
    xField: 'type',
    yField: 'revenue',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      revenue: {
        alias: '销售额',
      },
    },
  };
  return (
    <>
      <h1>Trang thống kê nhanh</h1>
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