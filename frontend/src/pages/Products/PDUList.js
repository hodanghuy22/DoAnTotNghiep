import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetProductsActiveByCategory, resetState } from '../../features/products/productSlice';

const PDUList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(resetState());
      dispatch(GetProductsActiveByCategory(2));
    }, [dispatch]);
  
    const productState = useSelector(state => state?.product?.productByCategory);
    console.log(productState);
  return (
    <div>PDUList</div>
  )
}

export default PDUList