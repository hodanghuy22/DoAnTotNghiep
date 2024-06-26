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

export const GetProductPopular = createAsyncThunk('products/get-popular', async (data, thunkAPI) => {
  try {
    return await productService.getProductPopular(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})
export const GetProductPopularByCategogy = createAsyncThunk(
  'products/get-popular-categogry',
  async (data, thunkAPI) => {
    try {
      return await productService.getProductPopularByCategogy(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


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

export const GetSearchProductByNameAndCategory = createAsyncThunk('products/get-searhproductByNameAndCategory', async (data, thunkAPI) => {
  try {
    return await productService.getSearchProductByNameAndCategory(data);
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

export const GetProductByBrand = createAsyncThunk('products/get-by-brand', async (id, thunkAPI) => {
  try {
    return await productService.getProductByBrand(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})
export const GetSearchProduct = createAsyncThunk('products/get-search-product', async (data, thunkAPI) => {
  try {
    return await productService.getSearchProduct(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})
export const GetProductForUser = createAsyncThunk(
  "product/get-product-forUser",
  async (data, thunkAPI) => {
    try {
      return await productService.getProductForUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const GetProductByBrandCategory = createAsyncThunk(
  "product/get-product-byBrandCategogy",
  async (data, thunkAPI) => {
    try {
      return await productService.getProductByBrandCategory(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
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
    }).addCase(GetProductPopularByCategogy.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductPopularByCategogy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productByCategory = action.payload;
    }).addCase(GetProductPopularByCategogy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(GetProductPopular.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductPopular.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productPopular = action.payload;
    }).addCase(GetProductPopular.rejected, (state, action) => {
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
    }).addCase(GetProductByBrand.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetProductByBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.productByBrand = action.payload;
    }).addCase(GetProductByBrand.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(GetSearchProductByName.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetSearchProductByName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.searchResults = action.payload;
    }).addCase(GetSearchProductByName.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(GetSearchProductByNameAndCategory.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetSearchProductByNameAndCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.searchResultByCategory = action.payload;
    }).addCase(GetSearchProductByNameAndCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(GetProductForUser.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(GetProductForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ProductDetail = action.payload;
      })
      .addCase(GetProductForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(GetProductByBrandCategory.pending, (state) => {
        state.isLoading = true;
      })
        .addCase(GetProductByBrandCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.productByBrandCategory = action.payload;
        })
        .addCase(GetProductByBrandCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }).addCase(GetSearchProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(GetSearchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.searchResults = action.payload;
      })
      .addCase(GetSearchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload.message;
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
            }).addCase(resetState, () => initialState);
  }
})

export default productSlice.reducer;