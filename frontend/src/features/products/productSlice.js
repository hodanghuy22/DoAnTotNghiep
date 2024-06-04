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

export const GetProductsActive = createAsyncThunk('products/get-active', async (thunkAPI) => {
  try {
    return await productService.getProductsActive();
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

export const GetProductsBestSeller = createAsyncThunk('products/get-bestSeller', async (data, thunkAPI) => {
  try {
    return await productService.getProductsBestSeller(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetSearchProductByName = createAsyncThunk('products/get-searhproduct', async (data, thunkAPI) => {
  try {
    return await productService.searchProductByName(data);
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

export const GetProductsActiveByCategory = createAsyncThunk('products/get-category', async (data, thunkAPI) => {
  try {
    return await productService.getProductCategory(data);
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
      if (state.isSuccess) {
        toast.success("The creation of the product was successful!");
      }
    }).addCase(CreateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The creation of the product was not successful!");
      }
    }).addCase(UpdateStatusProduct.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateStatusProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.product = action.payload;
      if (state.isSuccess) {
        toast.success("Update A product is successfully!");
      }
    }).addCase(UpdateStatusProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("Update A product is not successfully!");
      }
    }).addCase(GetProduct.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.Aproduct = action.payload;
    }).addCase(GetProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(GetProductsActiveByCategory.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductsActiveByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productByCategory = action.payload;
    }).addCase(GetProductsActiveByCategory.rejected, (state, action) => {
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
      if (state.isSuccess) {
        toast.success("Update A product is successfully!");
      }
    }).addCase(UpdateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("Update A product is not successfully!");
      }
    }).addCase(GetProductsActive.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductsActive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.products = action.payload;
    }).addCase(GetProductsActive.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(GetProductsBestSeller
      .pending, (state) => {
        state.isLoading = true;
      }).addCase(GetProductsBestSeller
        .fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.productsBestSeller = action.payload;
        }).addCase(GetProductsBestSeller
          .rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          }).addCase(GetSearchProductByName
            .pending, (state) => {
              state.isLoading = true;
            }).addCase(GetSearchProductByName
              .fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.SearhProduct = action.payload;
              }).addCase(GetSearchProductByName
                .rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.isSuccess = false;
                  state.message = action.error;
                }).addCase(resetState, () => initialState);
  }
})

export default productSlice.reducer;