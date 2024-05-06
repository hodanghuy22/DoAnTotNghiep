import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateOrderStatus, GetOrderStatus, UpdateOrderStatus, resetState } from '../features/orderStatus/orderStatusSlice';

const OrderStatusSchema = yup.object({
  title: yup.string().required('Title is Required'),
  status: yup.boolean()
});

const AddOrderStatus = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getOrderStatusId = location.pathname.split("/")[3];
  const getOrderStatusState = useSelector(state => state?.orderStatus?.orderStatus)
  useEffect(() => {
    if (getOrderStatusId !== undefined) {
      dispatch(GetOrderStatus(getOrderStatusId))
    } else {
      dispatch(resetState())
    }
  }, [getOrderStatusId])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: getOrderStatusState?.title || "",
      status: getOrderStatusState?.status || false,
    },
    validationSchema: OrderStatusSchema,
    onSubmit: values => {
      if (getOrderStatusId !== undefined) {
        const data = { id: getOrderStatusId, data: { ...values, id: getOrderStatusId } }
        dispatch(UpdateOrderStatus(data))
        dispatch(resetState())
      } else {
        dispatch(CreateOrderStatus(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300)
      }
    },
  });

  return (
    <div>
      <h1 className='mb-4 fw-bold'>{getOrderStatusId !== undefined ? "Edit" : "Add"} Order Status</h1>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
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
          <Checkbox
            checked={formik.values.status}
            onChange={formik.handleChange('status')}
          >
            Status
          </Checkbox><br />
          <br />
          <button className='btn btn-success' type='submit'>{getOrderStatusId !== undefined ? "Edit" : "Add"} Order Status</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrderStatus;