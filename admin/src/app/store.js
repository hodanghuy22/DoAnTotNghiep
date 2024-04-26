import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auths/authSlice';
import brandReducer from '../features/brands/brandSlice';
import capacityReducer from '../features/capacitites/capacitySlice';
import colorReducer from '../features/colors/colorSlice';
import categoryReducer from '../features/categories/categorySlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        brand: brandReducer,
        capacity: capacityReducer,
        color: colorReducer,
        category: categoryReducer,
    }
})