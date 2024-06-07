import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import couponService from "./couponService";


export const CheckCoupon = createAsyncThunk("coupons/check", async (data, thunkAPI) => {
  try {
    return await couponService.checkCoupon(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  coupons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const couponSlice = createSlice({
  name: "coupons",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CheckCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CheckCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupon = action.payload;
        if(state.isSuccess){
          toast.success("Thêm mã giảm giá thành công!")
        }
      })
      .addCase(CheckCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupon = null;
        state.message = action.payload.response.data.error;
        if(state.isError){
          toast.error(state.message)
        }
      })
      .addCase(resetState, () => initialState);
  }
})

export default couponSlice.reducer;