import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "./productService";

export const GetProducts = createAsyncThunk('products/get-all', async (thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetProductsShow = createAsyncThunk('products/get-show', async (thunkAPI) => {
  try {
    return await productService.getProductsShow();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetProduct = createAsyncThunk('products/get-one', async (id, thunkAPI) => {
  try {
    return await productService.getProduct(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const CreateProduct = createAsyncThunk('products/create', async (data, thunkAPI) => {
  try {
    return await productService.createProduct(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateStatusProduct = createAsyncThunk('products/update-status', async (data, thunkAPI) => {
  try {
    return await productService.updateStatusProduct(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateProduct = createAsyncThunk('products/update', async (data, thunkAPI) => {
  try {
    return await productService.updateProduct(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProducts.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.products = action.payload;
    }).addCase(GetProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(CreateProduct.pending, (state) => {
      state.isLoading = true;
    }).addCase(CreateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.product = action.payload;
      if(state.isSuccess){
        toast.success("The creation of the product was successful!");
      }
    }).addCase(CreateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError){
        toast.error("The creation of the product was not successful!");
      }
    }).addCase(UpdateStatusProduct.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateStatusProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.product = action.payload;
      if(state.isSuccess){
        toast.success("Update A product is successfully!");
      }
    }).addCase(UpdateStatusProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError){
        toast.error("Update A product is not successfully!");
      }
    }).addCase(GetProduct.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.product = action.payload;
    }).addCase(GetProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateProduct.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.product = action.payload;
      if(state.isSuccess){
        toast.success("Update A product is successfully!");
      }
    }).addCase(UpdateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError){
        toast.error("Update A product is not successfully!");
      }
    }).addCase(GetProductsShow.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductsShow.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.products = action.payload;
    }).addCase(GetProductsShow.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default productSlice.reducer;