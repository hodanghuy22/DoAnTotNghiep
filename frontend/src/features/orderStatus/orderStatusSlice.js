import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderStatusService from "./orderStatusService";

export const GetOrderStatusActive = createAsyncThunk('orderStatus-get-active', async (thunkAPI) => {
  try {
    return await orderStatusService.getOrderStatusActive();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  orderStatuses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const orderStatusSlice = createSlice({
  name: "orderStatuses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetOrderStatusActive.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetOrderStatusActive.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderStatuses = action.payload;
      })
      .addCase(GetOrderStatusActive.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
})

export default orderStatusSlice.reducer;