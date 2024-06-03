import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeUserPassword } from '../../features/auths/authSlice';

const changePasswordSchema = yup.object({
  currentPassword: yup.string().required('CurrentPassword is Required'),
  newPassword: yup.string().required("Password is Required")
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one digit'),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.auth.user);
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: values => {
      const data = { id: userState.id, data: values }
      dispatch(ChangeUserPassword(data))
    },
  });
  return (
    <div className='p-5'>
      <div className='w-100 '>
        <div>
          <p>ĐỔI MẬT KHẨU</p>
        </div>

        <div className=''>
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex w-100  p-2'>
              <div className='col-4 mt-1'>
                <p>Mật khẩu cũ</p>
              </div>
              <div className='col-8'>
                <input
                  type='password'
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange('currentPassword')}
                  onBlur={formik.handleBlur('currentPassword')}
                  className='text-dark w-100 p-2'
                />
                <div className='error'>
                  {
                    formik.touched.currentPassword && formik.errors.currentPassword
                  }
                </div>
              </div>
            </div>
            <div className='d-flex w-100 p-2'>
              <div className='col-4 mt-1'>
                <p>Mật khẩu mới</p>
              </div>
              <div className='col-8'>
                <input
                  type='password'
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange('newPassword')}
                  onBlur={formik.handleBlur('newPassword')}
                  className='text-dark w-100 p-2'
                />
                <div className='error'>
                  {
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                </div>
              </div>
            </div>
            <div className='d-flex w-100 p-2'>
              <div className='col-4 mt-1'>
              </div>
              <div className='col-8 '>
                <button type='submit' className='w-100 btn bg-danger fw-bold text-light' >Cập nhật</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
