import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateSupplier, GetSupplier, UpdateSupplier, resetState } from '../features/suppliers/supplierSlice';

const supplierSchema = yup.object({
  name: yup.string().required('Title is Required'),
  phoneNumber: yup.string().matches(/^(0|\+84)[0-9]{9}$/, 'Phone Number Should be valid'),
  email: yup.string().email("Email Should be valid").required('Email is Required'),
  address: yup.string(),
  status: yup.boolean()
});


const AddSupplier = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getSupplierId = location.pathname.split("/")[3];
  const supplierState = useSelector(state => state?.supplier?.supplier)
  useEffect(() => {
    if (getSupplierId !== undefined) {
      dispatch(GetSupplier(getSupplierId))
    } else {
      dispatch(resetState())
    }
  }, [getSupplierId])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: supplierState?.name || "",
      phoneNumber: supplierState?.phoneNumber || "",
      email: supplierState?.email || "",
      address: supplierState?.address || "",
      status: supplierState?.status || false,
    },
    validationSchema: supplierSchema,
    onSubmit: values => {
      if (getSupplierId !== undefined) {
        const data = { id: getSupplierId, data: { ...values, id: getSupplierId } }
        dispatch(UpdateSupplier(data))
        dispatch(resetState())
      } else {
        dispatch(CreateSupplier(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300)
      }
    },
  });
  return (
    <div>
      <h1 className='mb-4 fw-bold'>{getSupplierId !== undefined ? "Edit" : "Add"} Supplier</h1>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
            />
            <div className='error'>
              {
                formik.touched.name && formik.errors.name
              }
            </div>
          </div>
          <div className='mb-3'>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
            />
            <div className='error'>
              {
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            </div>
          </div>
          <div className='mb-3'>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            <div className='error'>
              {
                formik.touched.email && formik.errors.email
              }
            </div>
          </div>
          <div className='mb-3'>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange('address')}
              onBlur={formik.handleBlur('address')}
            />
            <div className='error'>
              {
                formik.touched.address && formik.errors.address
              }
            </div>
          </div>
          <Checkbox
            name="status"
            checked={formik.values.status}
            onChange={formik.handleChange('status')}
            defaultChecked={formik.values.status}
          >
            Status
          </Checkbox><br />
          <br />
          <button className='btn btn-success' type='submit'>{getSupplierId !== undefined ? "Edit" : "Add"} Supplier</button>
        </form>
      </div>
    </div>
  )
}

export default AddSupplier