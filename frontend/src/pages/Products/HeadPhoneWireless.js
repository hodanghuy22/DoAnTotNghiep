import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetProductsActiveByCategory, resetState } from '../../features/products/productSlice';

const HeadPhoneWireless = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(GetProductsActiveByCategory(3));
  }, [dispatch]);

  const productState = useSelector(state => state?.product?.productByCategory);
  console.log(productState);
  return (
    <div>HeadPhoneWireless</div>
  )
}

export default HeadPhoneWireless