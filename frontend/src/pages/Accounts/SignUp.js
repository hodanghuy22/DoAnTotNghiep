import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../features/auths/authSlice';

const signUpSchema = yup.object({
  name: yup.string().required('Name is Required'),
  email: yup.string().email("Email Should be valid").required('Email is Required'),
  username: yup.string().required('Username is Required'),
  password: yup.string().required("Password is Required")
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one digit'),
  repassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Password must be matched with Repassword!')
    .required('Repassword is Required'),
});


const SignUp = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repassword: '',
      email: '',
      name: '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(RegisterUser(values));
    },
  });
  return (
    <div className='container w-100 m-auto shadow p-3 mb-5 bg-body rounded p-5'>
      <div className='d-flex w-75 m-auto shadow p-3 mb-5 bg-body rounded'>
        <div className='' style={{ backgroundColor: '#eeeeee' }}>
          <img src='/log.svg' alt='Logo' />
          <div className='p-3'>
            <h6>QUYỀN LỢI THÀNH VIÊN</h6>
            <p>Mua hàng cực dễ dàng, nhanh chóng</p>
            <p>Theo dõi chi tiết đơn hàng, địa chỉ thanh toán</p>
            <p>Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi</p>
          </div>
        </div>
        <div className='p-4 '>
          <div className='d-flex justify-content-center mb-3'>
            <Link to='/login' className='w-100 fw-bold fs-5 text-center pt-3 pb-3 pl-4 pr-4 border-bottom text-dark text-decoration-none'>ĐĂNG NHẬP</Link>
            <Link className='w-100 fw-bold fs-5 text-center pt-3 pb-3 pl-4 pr-4 border-bottom border-danger text-danger text-decoration-none'>ĐĂNG KÝ</Link>
          </div>
          <form onSubmit={formik.handleSubmit} className='d-flex flex-column'>
            <div className='w-100 mb-4'>
              <input 
                type='text' 
                placeholder='Name' 
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                className='w-100 shadow p-3 bg-body rounded text-dark' 
              />
              <div className='error'>
                {
                  formik.touched.name && formik.errors.name
                }
              </div>
            </div>
            <div className='w-100 mb-4'>
              <input 
                type='email' 
                placeholder='Email' 
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                className='w-100 shadow p-3 bg-body rounded  text-dark' 
              />
              <div className='error'>
                {
                  formik.touched.email && formik.errors.email
                }
              </div>
            </div>
            <div className='w-100 mb-4'>
              <input 
                type='text' 
                placeholder='Username' 
                className='w-100 shadow p-3 bg-body rounded  text-dark'
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
            <div className='w-100 mb-4'>
              <input 
                type='password' 
                placeholder='Password' 
                className='w-100 shadow p-3 bg-body rounded  text-dark'
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
            <div className='w-100 mb-4'>
              <input 
                type='password' 
                placeholder='Repassword' 
                className='w-100 shadow p-3 bg-body rounded  text-dark'
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
            <button type='submit' className='w-100 btn bg-danger p-2 text-light fw-bold mb-2 mt-4'>TẠO TÀI KHOẢN</button>
          </form>
          <p className='mt-5'>
            HUBI Shop cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có sự đồng ý của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;