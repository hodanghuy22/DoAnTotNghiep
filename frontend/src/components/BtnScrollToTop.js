import React, { useEffect, useState } from 'react';
import { GoMoveToTop } from 'react-icons/go';

const BtnScrollToTop = () => {
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {showGoToTop && (
        <button
          onClick={handleClickToTop}
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            zIndex: '999',
          }}>
          <GoMoveToTop />
        </button>
      )}
    </div>
  );
};

export default BtnScrollToTop;