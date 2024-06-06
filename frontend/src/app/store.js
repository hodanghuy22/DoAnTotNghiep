import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import authReducer from '../features/auths/authSlice';
import capacitiesReduce from '../features/capacitites/capacitySlice';
import colorReduce from '../features/colors/colorSlice';
import cartReduce from '../features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        capacities: capacitiesReduce,
        color: colorReduce,
        cart: cartReduce
    }
})