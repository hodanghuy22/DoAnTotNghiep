import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateCoupon, GetCoupon, UpdateCoupon, resetState } from '../features/coupons/couponSlice';

const couponSchema = yup.object({
  title: yup.string().required('Title is Required'),
  code: yup.string().required('Code is Required'),
  discountPercent: yup.number(),
  discountMoney: yup.number(),
  requiredTotal: yup.number().required('RequiredTotal is Required'),
  startDate: yup.date().required('StartDate is Required'),
  endDate: yup.date().required('EndDate is Required'),
  quantity: yup.number().min(1, 'Quantity must be greater than 1').required("Quantity is Required"),
  status: yup.bool(),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const couponState = useSelector(state => state?.coupon?.coupon)
  const [selectedOption, setSelectedOption] = useState('percent');
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(GetCoupon(getCouponId))
    } else {
      dispatch(resetState())
    }
  }, [getCouponId])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: couponState?.title || "",
      code: couponState?.code || "",
      discountPercent: couponState?.discountPercent || "",
      discountMoney: couponState?.discountMoney || "",
      requiredTotal: couponState?.requiredTotal || "",
      startDate: couponState?.startDate ? changeDateFormat(couponState?.startDate) : new Date().toISOString().substr(0, 10),
      endDate: changeDateFormat(couponState?.endDate) || "",
      quantity: couponState?.quantity || "",
      status: couponState?.status || false,
    },
    validationSchema: couponSchema,
    onSubmit: values => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: { ...values, id: getCouponId } }
        dispatch(UpdateCoupon(data))
        dispatch(resetState())
      } else {
        dispatch(CreateCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300)
      }

    },
  });
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    formik.setFieldValue('discountPercent', '');
    formik.setFieldValue('discountMoney', '');
  };
  return (
    <div className='container'>
      <h1 className='mb-4 fw-bold'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h1>
      <div className='mt-3 row border bg-white p-3 rounded-3 d-flex flex-row'>
        <form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='mb-3 col-6'>
              <input
                type="text"
                name="title"
                class="form-control"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange('title')}
                onBlur={formik.handleBlur('title')}
              />
              <div className='error'>
                {
                  formik.touched.title && formik.errors.title
                }
              </div>
            </div>
            <div className='mb-3 col-6'>
              <input
                type="text"
                name="code"
                class="form-control"
                placeholder="Code"
                value={formik.values.code}
                onChange={formik.handleChange('code')}
                onBlur={formik.handleBlur('code')}
              />
              <div className='error'>
                {
                  formik.touched.code && formik.errors.code
                }
              </div>
            </div>
          </div>
          <div className='row'>
            {selectedOption === 'percent' && (
              <div className='col-8 d-flex'>
                <div className='col-1'>
                  <select className='form-control ' value={selectedOption} onChange={handleSelectChange}>
                    <option value="percent">%</option>
                    <option value="money">VND</option>
                  </select>
                </div>
                <div className='col-11'>
                  <input
                    type="number"
                    name="discountPercent"
                    className="form-control"
                    placeholder="DiscountPercent"
                    value={formik.values.discountPercent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className='error'>
                  {formik.touched.discountPercent && formik.errors.discountPercent}
                </div>
              </div>
            )}
            {selectedOption === 'money' && (
              <div className='mb-3 col-8 d-flex'>
                <div className='mb-3 col-1'>
                  <select className='form-control ' value={selectedOption} onChange={handleSelectChange}>
                    <option value="percent">%</option>
                    <option value="money">VND</option>
                  </select>
                </div>
                <div className='col-11'>
                  <input
                    type="number"
                    name="discountMoney"
                    className="form-control"
                    placeholder="DiscountMoney"
                    value={formik.values.discountMoney}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className='error'>
                  {formik.touched.discountMoney && formik.errors.discountMoney}
                </div>
              </div>
            )}
            <div className='mb-3 col-4'>
              <div>
                <input
                  type="number"
                  name="requiredTotal"
                  class="form-control"
                  placeholder="RequiredTotal"
                  value={formik.values.requiredTotal}
                  onChange={formik.handleChange('requiredTotal')}
                  onBlur={formik.handleBlur('requiredTotal')}
                />
              </div>
              <div className='error'>
                {
                  formik.touched.requiredTotal && formik.errors.requiredTotal
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col-6'>
              <input
                type="date"
                readOnly
                name="requiredTotal"
                class="form-control"
                placeholder="StartDate"
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
            <div className='mb-3 col-6'>
              <input
                type="date"
                name="requiredTotal"
                class="form-control"
                placeholder="EndDate"
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
          </div>
          <div className='row'>
            <div className='mb-3 col-6'>
              <input
                type="number"
                name="requiredTotal"
                class="form-control"
                placeholder="Quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange('quantity')}
                onBlur={formik.handleBlur('quantity')}
              />
              <div className='error'>
                {
                  formik.touched.quantity && formik.errors.quantity
                }
              </div>
            </div>
            <div className='mb-3 col-6'>
              <Checkbox
                checked={formik.values.status}
                onChange={formik.handleChange('status')}
                onBlur={formik.handleBlur('status')}
              >
                Status
              </Checkbox>
            </div>
          </div>
          <button className='btn btn-success' type='submit'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon