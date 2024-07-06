import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { ResetUserPassword } from '../../features/auths/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const resetPasswordSchema = yup.object({
  email: yup.string().email("Email Should be valid").required('Email is Required'),
  newPassword: yup.string().required("Password is Required")
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one digit'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'New Password must be matched with Repassword!')
    .required('Repassword is Required'),
});

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const formik = useFormik({
    initialValues: {
      token: getToken,
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const result = await dispatch(ResetUserPassword(values));
      if (result) {
        navigate('/login');
      }
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
            <h3 className='w-100 fw-bold fs-5 text-center pt-3 pb-3 pl-4 pr-4 border-bottom text-decoration-none text-danger'>Quên mật khẩu</h3>
          </div>
          <form onSubmit={formik.handleSubmit} className='d-flex flex-column'>
            <div className='w-100 mb-4'>
              <input
                type='email'
                placeholder='Email'
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                className='w-100 shadow p-3 bg-body rounded'
              />
              <div className='error'>
                {
                  formik.touched.email && formik.errors.email
                }
              </div>
            </div>
            <div className='w-100 mb-4'>
              <input
                type='password'
                placeholder='New Password'
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange('newPassword')}
                onBlur={formik.handleBlur('newPassword')}
                className='w-100 shadow p-3 bg-body rounded'
              />
              <div className='error'>
                {
                  formik.touched.newPassword && formik.errors.newPassword
                }
              </div>
            </div>
            <div className='w-100 mb-4'>
              <input
                type='password'
                placeholder='Confirm Password'
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange('confirmPassword')}
                onBlur={formik.handleBlur('confirmPassword')}
                className='w-100 shadow p-3 bg-body rounded'
              />
              <div className='error'>
                {
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                }
              </div>
            </div>
            <button type='submit' className='w-100 btn bg-danger p-2 text-light fw-bold mb-2 mt-4'>Đổi mật khẩu</button>
          </form>
          <p className='mt-5'>
            HUBI Shop cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có sự đồng ý của bạn.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword