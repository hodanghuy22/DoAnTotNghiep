import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LoginAdmin } from '../features/auths/authSlice';

const loginSchema = yup.object({
  username: yup.string().required('Username is Required'),
  password: yup.string().required("Password is Required")
});

const Login = () => {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(LoginAdmin(values));
    },
  });
  useEffect(() => {
    if (authState.isError) {
      toast.error("Login fail!!!");
    }
    if (authState.user !== null && authState.isError === false) {
      navigate('/admin')
    }
  }, [authState])
  return (
    <div className='login-container'>
      <div className='login w-50'>
        <div className='title'>Hello Again!</div>
        <div className='des'>
          Wellcome back you've <br />
          been missed
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="group">
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
          <div className="group">
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
          <div className='signIn'>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={250}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>

  )
}

export default Login