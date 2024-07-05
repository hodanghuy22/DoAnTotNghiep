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

export const GetProductDetails = createAsyncThunk('productDetails-getAll', async (thunkAPI) => {
  try {
    return await productDetailService.getProductDetails();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetProductDetailsActive = createAsyncThunk('productDetails-getAll-active', async (thunkAPI) => {
  try {
    return await productDetailService.getProductDetailsActive();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetProductDetail = createAsyncThunk('productDetails-get-one', async (id, thunkAPI) => {
  try {
    return await productDetailService.getProductDetail(id);
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

export const UpdateProductDetail = createAsyncThunk('productDetails-update', async (data, thunkAPI) => {
  try {
    return await productDetailService.updateProductDetail(data);
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
      if (state.isSuccess) {
        toast.success("The creation of the product detail was successful!");
      }
    }).addCase(CreateProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The creation of the product detail was not successful!");
      }
    }).addCase(GetProductDetails.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productDetails = action.payload;
    }).addCase(GetProductDetails.rejected, (state, action) => {
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
      if (state.isSuccess) {
        toast.success("The product detail update was successful!");
      }
    }).addCase(UpdateStatusProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.success("The product detail update was not successful!");
      }
    }).addCase(GetProductDetail.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productDetail = action.payload;
    }).addCase(GetProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateProductDetail.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updated = action.payload;
      if (state.isSuccess) {
        toast.success("The product detail update was successful!");
      }
    }).addCase(UpdateProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.success("The product detail update was not successful!");
      }
    }).addCase(GetProductDetailsActive.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductDetailsActive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productDetails = action.payload;
    }).addCase(GetProductDetailsActive.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default productDetailSlice.reducer;