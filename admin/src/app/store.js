import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auths/authSlice';
import brandReducer from '../features/brands/brandSlice';
import capacityReducer from '../features/capacitites/capacitySlice';
import colorReducer from '../features/colors/colorSlice';
import categoryReducer from '../features/categories/categorySlice';
import uploadReducer from '../features/uploadImage/uploadSlice';
import slideshowReducer from '../features/slideshows/slideshowSlice';
import productReducer from '../features/products/productSlice';
import productDetailReducer from '../features/productDetails/productDetailSlice';
import couponReducer from '../features/coupons/couponSlice';
import orderStatusReducer from '../features/orderStatus/orderStatusSlice';
import supplierReducer from '../features/suppliers/supplierSlice';
import importInvoiceReducer from '../features/importInvoices/importInvoiceSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        brand: brandReducer,
        capacity: capacityReducer,
        color: colorReducer,
        category: categoryReducer,
        slideshow: slideshowReducer,
        upload: uploadReducer,
        product: productReducer,
        productDetail: productDetailReducer,
        coupon: couponReducer,
        orderStatus: orderStatusReducer,
        supplier: supplierReducer,
        importInvoice: importInvoiceReducer,
    }
})