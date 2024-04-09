import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  return (
    <div className='login-container'>
      <div className='login'>
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