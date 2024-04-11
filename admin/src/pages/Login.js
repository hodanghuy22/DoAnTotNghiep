import React from 'react'
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { LoginFacebook } from '../features/auths/authSlice';
import FacebookLoginButton from '../components/FacebookLoginButton ';

const Login = () => {
  const dispatch = useDispatch();
  const dangky = () => {
    console.log("Vao dang ky");
    dispatch(LoginFacebook());
  }
  return (
    <div className='login-container'>
      <div className='login'>
        <button onClick={dangky}><BiEdit /></button>
        <FacebookLoginButton />
        <div className='title'>Hello Again!</div>
        <div className='des'>
          Wellcome back you've <br />
          been missed
        </div>
        <form >
          <div className="group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder='Username'
            />

          </div>
          <div className="group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder='Username'
            />

          </div>
          <div className='signIn'>
            <button>Sign In</button>
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