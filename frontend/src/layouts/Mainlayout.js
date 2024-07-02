import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import BtnScrollToTop from '../components/BtnScrollToTop';
import ScrollToTop from '../components/ScrollToTop'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mainlayout = () => {
  const storedQuantity = localStorage.getItem('cartQuantity');
  useEffect(() => {
    // Kiểm tra xem đã có cartQuantity trong localStorage chưa
    if (storedQuantity === null) {
      // Nếu chưa có, đặt giá trị mặc định là 0
      localStorage.setItem('cartQuantity', '0');
    }
  }, [storedQuantity]);
  return (
    <div style={{backgroundColor:'#ffffff'}}>
      <header>
        <Header />
      </header>
      <ScrollToTop/>
      <main>
        <Outlet />
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
      </main>
      <footer>
        <Footer />
      </footer>
      <BtnScrollToTop />
    </div>
  );
};

export default Mainlayout;
