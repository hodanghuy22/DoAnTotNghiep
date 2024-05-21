import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import BtnScrollToTop from '../components/BtnScrollToTop';
import ScrollToTop from '../components/ScrollToTop'
const Mainlayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <ScrollToTop/>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <BtnScrollToTop />
    </div>
  );
};

export default Mainlayout;
