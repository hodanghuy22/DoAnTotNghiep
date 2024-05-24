import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetTopUser, StatisticUserOfYear } from '../features/auths/authSlice';
import LineChart from '../components/LineChart';
import { GetRevenueOfYear, GetTotalInvoiceOfYear } from '../features/invoices/invoiceSlice';
import ColumnRevenueChart from '../components/ColumnRevenueChart';
import ColumnInvoiceChart from '../components/ColumnInvoiceChart';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GetProductsBestSeller } from '../features/products/productSlice';
import { Table } from 'antd';

const filterSchema = yup.object({
  top: yup.number(),
  startDate: yup.date(),
  endDate: yup.date(),
});

const filter2Schema = yup.object({
  year: yup.number(),
});

const columnProduct = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: <h5 className='fw-bold'>Name</h5>,
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: <h5 className='fw-bold'>SoldQuantity</h5>,
    dataIndex: 'soldQuantity',
    sorter: (a, b) => a.soldQuantity - b.soldQuantity,
  },
  {
    title: <h5 className='fw-bold'>AverageRating</h5>,
    dataIndex: 'averageRating',
    sorter: (a, b) => a.averageRating - b.averageRating,
  },
  {
    title: <h5 className='fw-bold'>Brand</h5>,
    dataIndex: 'brand',
  },
  {
    title: <h5 className='fw-bold'>Category</h5>,
    dataIndex: 'category',
  },
];

const columnUser = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
  },
  {
    title: <h5 className='fw-bold'>Name</h5>,
    dataIndex: 'name',
  },
  {
    title: <h5 className='fw-bold'>Email</h5>,
    dataIndex: 'email',
  },
  {
    title: <h5 className='fw-bold'>Phone</h5>,
    dataIndex: 'phone',
  },
  {
    title: <h5 className='fw-bold'>Total</h5>,
    dataIndex: 'total',
    sorter: (a, b) => a.total - b.total,
  },
];

const Statistics = () => {
  const dispatch = useDispatch()

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [top, setTop] = useState(5);

  const statisticUserOfYearState = useSelector(state => state?.auth?.statisticUserOfYear)
  const revenueOfYearState = useSelector(state => state?.invoice?.revenueOfYear)
  const totalInvoiceOfYear = useSelector(state => state?.invoice?.totalInvoiceOfYear)
  const productsBestSellerState = useSelector(state => state?.product?.productsBestSeller)
  const topUserState = useSelector(state => state?.auth?.topUser)

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().substr(0, 10);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().substr(0, 10);
    dispatch(StatisticUserOfYear({
      year: currentYear
    }))
    dispatch(GetRevenueOfYear({
      year: currentYear
    }))
    dispatch(GetTotalInvoiceOfYear({
      year: currentYear
    }))
    dispatch(GetProductsBestSeller({
      top: 2,
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth,
    }))
    dispatch(GetTopUser({
      top: 2,
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth,
    }))
  }, [])

  useEffect(() => {
    const data = productsBestSellerState?.map((item, index) => ({
      key: index,
      id: item.productId,
      name: item.productName,
      soldQuantity: item.soldQuantity,
      averageRating: item.productAverageRating,
      brand: item.brandTitle,
      category: item.categoryTitle,
    }));
    setData1(data);
  }, [productsBestSellerState])

  useEffect(() => {
    const data = topUserState?.map((item, index) => ({
      key: index,
      id: item.userId,
      name: item.name,
      email: item.email,
      phone: item.phone,
      total: item.total,
    }));
    setData2(data);
  }, [topUserState])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      top: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: filterSchema,
    onSubmit: values => {
      console.log(values);
      setTop(values.top)
      dispatch(GetProductsBestSeller({
        top: values.top,
        startDate: values.startDate,
        endDate: values.endDate,
      }))
      dispatch(GetTopUser({
        top: values.top,
        startDate: values.startDate,
        endDate: values.endDate,
      }))
      // dispatch(StatisticUserOfYear({
      //   year: values.year
      // }))
      // dispatch(GetRevenueOfYear({
      //   year: values.year
      // }))
      // dispatch(GetTotalInvoiceOfYear({
      //   year: values.year
      // }))
    },
  });

  const formik2 = useFormik({
    initialValues: {
      year: "",
    },
    validationSchema: filter2Schema,
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
    },
  });

  return (
    <>
      <div className='row border bg-white p-3 rounded-3'>
        <form onSubmit={formik.handleSubmit}>
          <div className='d-flex flex-row'>
            <div>
              <input
                type="number"
                name="top"
                className="form-control"
                placeholder="top"
                value={formik.values.top}
                onChange={formik.handleChange('top')}
                onBlur={formik.handleBlur('top')}
              />
              <div className='error'>
                {
                  formik.touched.top && formik.errors.top
                }
              </div>
            </div>
            <div className='ms-3'>
              <input
                type="date"
                name="startDate"
                className="form-control"
                placeholder="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange('startDate')}
                onBlur={formik.handleBlur('startDate')}
              />
              <div className='error'>
                {
                  formik.touched.startDate && formik.errors.startDate
                }
              </div>
            </div>
            <div className='ms-3'>
              <input
                type="date"
                name="endDate"
                className="form-control"
                placeholder="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange('endDate')}
                onBlur={formik.handleBlur('endDate')}
              />
              <div className='error'>
                {
                  formik.touched.endDate && formik.errors.endDate
                }
              </div>
            </div>
            <button className='btn btn-success ms-3' type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <div className='row border bg-white p-3 rounded-3 mt-3'>
        <h3>Top {top} Sản Phẩm Bán Chạy Nhất</h3>
        <Table columns={columnProduct} dataSource={data1} scroll={{ y: 500 }} />
      </div>
      <div className='row border bg-white p-3 rounded-3 mt-3'>
        <h3>Top {top} Khách Hàng Mua Nhiều Nhất</h3>
        <Table columns={columnUser} dataSource={data2} scroll={{ y: 500 }} />
      </div>
      <div className='row border bg-white p-3 rounded-3 mt-3'>
        <form onSubmit={formik2.handleSubmit}>
          <div className='d-flex flex-row'>
            <div>
              <input
                type="number"
                name="year"
                className="form-control"
                placeholder="year"
                value={formik2.values.year}
                onChange={formik2.handleChange('year')}
                onBlur={formik2.handleBlur('year')}
              />
              <div className='error'>
                {
                  formik2.touched.year && formik2.errors.year
                }
              </div>
            </div>
            <button className='btn btn-success ms-3' type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-5 border bg-white p-3 rounded-3'>
          <h3>Thống kê số lượng khách hàng</h3>
          <LineChart value={statisticUserOfYearState} />
        </div>
        <div className='col-6 border bg-white p-3 rounded-3'>
          <h3>Thống kê số lượng hóa đơn</h3>
          <ColumnInvoiceChart value={totalInvoiceOfYear} />

        </div>
      </div>
      <div className='row border bg-white p-3 rounded-3 mt-3'>
        <h3>Thống kê doanh thu</h3>
        <ColumnRevenueChart value={revenueOfYearState} />
      </div>
    </>
  )
}

export default Statistics