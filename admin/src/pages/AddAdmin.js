import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { RegisterAdmin } from '../features/auths/authSlice';

const signUpSchema = yup.object({
  email: yup.string().email("Email Should be valid").required('Email is Required'),
  username: yup.string().required('Username is Required')
    .min(6, 'Username must be at least 6 characters'),
  password: yup.string().required("Password is Required")
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one digit'),
  repassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Password must be matched with Repassword!')
    .required('Repassword is Required'),
});

const AddAdmin = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      repassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(RegisterAdmin(values));
    },
  });
  return (
    <div className='container'>
      <h1 className='mb-4 fw-bold'>Register Admin</h1>
      <div className='container-fuild border rounded-3 bg-white p-3 mb-5'>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <h5 className="form-h5 fw-bold">Email</h5>
            <input
              type="email"
              className="form-control"
              name="firstname"
              placeholder='Email'
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
          <div className="form-outline mb-4">
            <h5 className="form-h5 fw-bold">Username</h5>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder='Username'
              value={formik.values.username}
              onChange={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
            />
            <div className='error'>
              {
                formik.touched.username && formik.errors.username
              }
            </div>
          </div>
          <div className="form-outline mb-4">
            <h5 className="form-h5 fw-bold">Password</h5>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            <div className='error'>
              {
                formik.touched.password && formik.errors.password
              }
            </div>
          </div>
          <div className="form-outline mb-4">
            <h5 className="form-h5 fw-bold">Repassword</h5>
            <input
              type="password"
              className="form-control"
              name="repassword"
              placeholder='Repassword'
              value={formik.values.repassword}
              onChange={formik.handleChange('repassword')}
              onBlur={formik.handleBlur('repassword')}
            />
            <div className='error'>
              {
                formik.touched.repassword && formik.errors.repassword
              }
            </div>
          </div>
          <button type="submit" className="btn btn-success fw-bold">Đăng ký</button>
        </form>
      </div>
    </div>

  )
}

export default AddAdmin