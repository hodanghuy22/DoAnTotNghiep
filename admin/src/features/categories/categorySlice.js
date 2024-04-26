import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import categoryService from "./categoryService";


export const GetCategories = createAsyncThunk("category/get-categories", async (thunkAPI) => {
  try {
    return await categoryService.getCategories();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetCategory = createAsyncThunk("category/get-category", async (id, thunkAPI) => {
  try {
    return await categoryService.getCategory(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateStatusCategory = createAsyncThunk("category/update-status-category", async (data, thunkAPI) => {
  try {
    return await categoryService.updateStatusCategory(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const CreateCategory = createAsyncThunk("category/create-category", async (data, thunkAPI) => {
  try {
    return await categoryService.createCategory(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateCategory = createAsyncThunk("category/update-category", async (data, thunkAPI) => {
  try {
    return await categoryService.updateCategory(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})


export const resetState = createAction('Reset_all')

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCategories.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(GetCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(UpdateStatusCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateStatusCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess) {
          toast.success("The update of the category was successful!");
        }
      })
      .addCase(UpdateStatusCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("The update of the category was not successful!");
        }
      }).addCase(CreateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdcategory = action.payload;
        if (state.isSuccess) {
          toast.success("The creation of the category was successful!");
        }
      })
      .addCase(CreateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("The creation of the category was not successful!");
        }
      }).addCase(GetCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ACategory = action.payload;
      })
      .addCase(GetCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(UpdateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedcategory = action.payload;
        if (state.isSuccess) {
          toast.success("The update of the category was successful!");
        }
      })
      .addCase(UpdateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("The update of the category was not successful!");
        }
      }).addCase(resetState, () => initialState);
  }
})

export default categorySlice.reducer;