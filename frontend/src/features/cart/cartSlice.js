import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import cartService from './cartService';
import { toast } from 'react-toastify';

export const GetCart = createAsyncThunk("cart/get-carts", async (id, thunkAPI) => {
    try {
        return await cartService.getCart(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);  // Lưu trữ thông điệp lỗi thay vì toàn bộ đối tượng lỗi
    }
});

export const AddCart = createAsyncThunk("cart/add-cart", async (cartData, thunkAPI) => {
    try {
        return await cartService.addCart(cartData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const UpdateCart = createAsyncThunk("cart/update-cart", async (cartData, thunkAPI) => {
    try {
        return await cartService.updateCart(cartData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const DeleteCart = createAsyncThunk("cart/delete-cart", async (id, thunkAPI) => {
    try {
        return await cartService.deleteCart(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const resetState = createAction('Reset_all');

const initialState = {
    carts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.carts = action.payload;
            })
            .addCase(GetCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;  // Lưu trữ thông điệp lỗi
            })
            .addCase(AddCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cart = action.payload;
                toast.success("Thêm vào giỏ hàng thành công");
            })
            .addCase(AddCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                // toast.error(action.payload);
            })
            .addCase(DeleteCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
                toast.success("Xoá sản phẩm thành công");
            })
            .addCase(DeleteCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(UpdateCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCart = action.payload;
                if (state.isSuccess) {
                    toast.success("Cập nhật thành công!");
                }
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(resetState, () => initialState);
    }
});

export default cartSlice.reducer;
