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

const dateSchema = yup.object({
  year: yup.number()
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

  const statisticUserOfYearState = useSelector(state => state?.auth?.statisticUserOfYear)
  const revenueOfYearState = useSelector(state => state?.invoice?.revenueOfYear)
  const totalInvoiceOfYear = useSelector(state => state?.invoice?.totalInvoiceOfYear)
  const productsBestSellerState = useSelector(state => state?.product?.productsBestSeller)
  const topUserState = useSelector(state => state?.auth?.topUser)

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
    dispatch(GetProductsBestSeller({
      top: 3,
      startDate: "",
      endDate: "",
    }))
    dispatch(GetTopUser({
      top: 3,
      startDate: "",
      endDate: "",
    }))
  }, [])

  useEffect(()=>{
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

  useEffect(()=>{
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
          <h3>Thống kê số lượng khách hàng</h3>
          <LineChart value={statisticUserOfYearState} />
        </div>
        <div className='col-6 border bg-white p-3 rounded-3'>
          <h3>Thống kê số lượng hóa đơn</h3>
          <ColumnInvoiceChart value={totalInvoiceOfYear} />

        </div>
      </div>
      <div className='row border bg-white p-3 rounded-3 mt-3'>
        <h3>Top Sản Phẩm Bán Chạy Nhất</h3>
        <Table columns={columnProduct} dataSource={data1} scroll={{ y: 500 }} />
      </div>
      <div className='row border bg-white p-3 rounded-3 mt-3'>
        <h3>Top Khách Hàng Mua Nhiều Nhất</h3>
        <Table columns={columnUser} dataSource={data2} scroll={{ y: 500 }} />
      </div>
      <div className='row border bg-white p-3 rounded-3 mt-3'>
        <h3>Thống kê doanh thu</h3>
        <ColumnRevenueChart value={revenueOfYearState} />
      </div>
    </>
  )
}

export default Statistics