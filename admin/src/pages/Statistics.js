import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StatisticUserOfYear } from '../features/auths/authSlice';
import LineChart from '../components/LineChart';
import { GetRevenueOfYear, GetTotalInvoiceOfYear } from '../features/invoices/invoiceSlice';
import ColumnRevenueChart from '../components/ColumnRevenueChart';
import ColumnInvoiceChart from '../components/ColumnInvoiceChart';

const Statistics = () => {
  const dispatch = useDispatch()

  const statisticUserOfYearState = useSelector(state => state?.auth?.statisticUserOfYear)
  const revenueOfYearState = useSelector(state => state?.invoice?.revenueOfYear)
  const totalInvoiceOfYear = useSelector(state => state?.invoice?.totalInvoiceOfYear)

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    dispatch(StatisticUserOfYear({
      year: currentYear
    }))
    dispatch(GetRevenueOfYear({
      year: currentYear
    }))
    dispatch(GetTotalInvoiceOfYear({
      year: currentYear
    }))
  }, [])

  return (
    <>
      <div className='row d-flex justify-content-between'>
        <div className='col-5 border bg-white p-3 rounded-3'>
          <h3>Thống kế số lượng khách hàng</h3>
          <LineChart value={statisticUserOfYearState} />
        </div>
        <div className='col-6 border bg-white p-3 rounded-3'>
          <h3>Thống kế số lượng hóa đơn</h3>
          <ColumnInvoiceChart value={totalInvoiceOfYear} />

        </div>
      </div>
      <div className='row  border bg-white p-3 rounded-3 mt-3'>
        <h3>Thống kế số lượng khách hàng</h3>
        <ColumnRevenueChart value={revenueOfYearState} />
      </div>
    </>
  )
}

export default Statistics