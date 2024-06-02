import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import authReducer from '../features/auths/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
    }
})