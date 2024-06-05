import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { RegisterAdmin } from '../features/auths/authSlice';

const signUpSchema = yup.object({
  name: yup.string().required('Name is Required'),
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
      name: '',
      email: '',
      username: '',
      password: '',
      repassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(RegisterAdmin(values));
      formik.resetForm();
    },
  });
  return (
    <div className='container'>
      <h1 className='mb-4 fw-bold'>Register Admin</h1>
      <div className='container-fuild border rounded-3 bg-white p-3 mb-5'>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4 row">
            <div className='col-3'>
              <h5 className="form-h5 fw-bold">Name</h5>
            </div>
            <div className='col-8'>
              <input
                type="text"
                className="form-control"
                name="name"
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
          </div>
          <div className="form-outline mb-4 row">
            <div className='col-3'>
              <h5 className="form-h5 fw-bold">Email</h5>
            </div>
            <div className='col-8'>
              <input
                type="email"
                className="form-control"
                name="email"
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
          </div>
          <div className="form-outline mb-4 row">
            <div className='col-3'>
              <h5 className="form-h5 fw-bold">Username</h5>
            </div>
            <div className='col-8'>
              <input
                type="text"
                className="form-control"
                name="username"
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
          </div>
          <div className="form-outline mb-4 row">
            <div className='col-3'>
              <h5 className="form-h5 fw-bold">Password</h5>
            </div>
            <div className='col-8'>
              <input
                type="password"
                className="form-control"
                name="password"
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
          </div>
          <div className="form-outline mb-4 row">
            <div className='col-3'>
              <h5 className="form-h5 fw-bold">Repassword</h5>
            </div>
            <div className='col-8'>
              <input
                type="password"
                className="form-control"
                name="repassword"
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
          </div>
          <div className="form-outline mb-4 row">
            <div className='col-3'></div>
            <div className='col-8'>
              <button type="submit" className="btn btn-success fw-bold">Đăng ký</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default AddAdmin