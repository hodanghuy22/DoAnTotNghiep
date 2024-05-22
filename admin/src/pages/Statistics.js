import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StatisticUserOfYear } from '../features/auths/authSlice';
import LineChart from '../components/LineChart';
import { GetRevenueOfYear, GetTotalInvoiceOfYear } from '../features/invoices/invoiceSlice';
import ColumnRevenueChart from '../components/ColumnRevenueChart';
import ColumnInvoiceChart from '../components/ColumnInvoiceChart';
import { useFormik } from 'formik';
import * as yup from 'yup';

const dateSchema = yup.object({
  year: yup.number()
});

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      year: "",
    },
    validationSchema: dateSchema,
    onSubmit: values => {
      dispatch(StatisticUserOfYear({
        year: values.year
      }))
      dispatch(GetRevenueOfYear({
        year: values.year
      }))
      dispatch(GetTotalInvoiceOfYear({
        year: values.year
      }))
      formik.resetForm();
    },
  });

  return (
    <>
      <div className='row'>
        <form onSubmit={formik.handleSubmit}>
          <div className='d-flex flex-row'>
            <div>
              <input
                type="number"
                name="year"
                className="form-control"
                placeholder="year"
                value={formik.values.year}
                onChange={formik.handleChange('year')}
                onBlur={formik.handleBlur('year')}
              />
              <div className='error'>
                {
                  formik.touched.year && formik.errors.year
                }
              </div>
            </div>
            <button className='btn btn-success ms-3' type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <div className='row d-flex justify-content-between mt-3'>
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
        <h3>Thống kế doanh thu</h3>
        <ColumnRevenueChart value={revenueOfYearState} />
      </div>
    </>
  )
}

export default Statistics