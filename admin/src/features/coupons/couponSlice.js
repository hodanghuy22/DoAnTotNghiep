import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import couponService from "./couponService";

export const CreateCoupon = createAsyncThunk('coupon-create', async (data, thunkAPI) => {
  try {
    return await couponService.createCoupon(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetCoupons = createAsyncThunk('coupon-getAll', async (thunkAPI) => {
  try {
    return await couponService.getCoupons();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetCouponsActive = createAsyncThunk('coupon-getAll-active', async (thunkAPI) => {
  try {
    return await couponService.getCouponsActive();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetCoupon = createAsyncThunk('coupon-getOne', async (id, thunkAPI) => {
  try {
    return await couponService.getCoupon(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateStatusCoupon = createAsyncThunk('coupon-update-status', async (data, thunkAPI) => {
  try {
    return await couponService.updateStatusCoupon(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateCoupon = createAsyncThunk('coupon-update', async (data, thunkAPI) => {
  try {
    return await couponService.updateCoupon(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCoupon.pending, (state) => {
      state.isLoading = true;
    }).addCase(CreateCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.images = action.payload;
      if (state.isSuccess) {
        toast.success("The creation of coupon was successful!");
      }
    }).addCase(CreateCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The creation of color was not successful!");
      }
    }).addCase(GetCoupons.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetCoupons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.coupons = action.payload;
    }).addCase(GetCoupons.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateStatusCoupon.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateStatusCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updateCoupon = action.payload;
      if(state.isSuccess) {
        toast.success("The coupon update was successful!");
      } 
    }).addCase(UpdateStatusCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError) {
        toast.success("The coupon update was not successful!");
      } 
    }).addCase(GetCoupon.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.coupon = action.payload;
    }).addCase(GetCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateCoupon.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updateCoupon = action.payload;
      if(state.isSuccess) {
        toast.success("The coupon update was successful!");
      } 
    }).addCase(UpdateCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError) {
        toast.error("The coupon update was not successful!");
      } 
    }).addCase(GetCouponsActive.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetCouponsActive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.coupons = action.payload;
    }).addCase(GetCouponsActive.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default couponSlice.reducer;