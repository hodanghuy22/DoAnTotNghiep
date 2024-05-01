import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productDetailService from "./productDetailService";

export const CreateProductDetail = createAsyncThunk('productDetails-create', async (data, thunkAPI) => {
  try {
    return await productDetailService.createProductDetail(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetProductDetais = createAsyncThunk('productDetails-getAll', async (thunkAPI) => {
  try {
    return await productDetailService.getProductDetais();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateStatusProductDetail = createAsyncThunk('productDetails-update-status', async (data, thunkAPI) => {
  try {
    return await productDetailService.updateStatusProductDetail(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  productDetails: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const productDetailSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateProductDetail.pending, (state) => {
      state.isLoading = true;
    }).addCase(CreateProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productDetails = action.payload;
      if(state.isSuccess) {
        toast.success("The creation of the product detail was successful!");
      }
    }).addCase(CreateProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError) {
        toast.error("The creation of the product detail was not successful!");
      }
    }).addCase(GetProductDetais.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductDetais.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productDetails = action.payload;
    }).addCase(GetProductDetais.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateStatusProductDetail.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateStatusProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updated = action.payload;
      if(state.isSuccess) {
        toast.success("The product detail update was successful!");
      } 
    }).addCase(UpdateStatusProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError) {
        toast.success("The product detail update was not successful!");
      } 
    }).addCase(resetState, () => initialState);
  }
})

export default productDetailSlice.reducer;