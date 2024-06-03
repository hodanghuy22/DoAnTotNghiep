import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetProductsActiveByCategory, resetState } from '../../features/products/productSlice';

const HeadPhone = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(resetState());
      dispatch(GetProductsActiveByCategory(4));
    }, [dispatch]);
  
    const productState = useSelector(state => state?.product?.productByCategory);
    console.log(productState);

  return (
    <div>HeadPhone</div>
  )
}

export default HeadPhone