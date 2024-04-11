import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auths/authSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})