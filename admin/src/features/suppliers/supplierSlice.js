import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import supplierService from "./supplierService";

export const CreateSupplier = createAsyncThunk('supplier-create', async (data, thunkAPI) => {
  try {
    return await supplierService.createSupplier(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetSuppliers = createAsyncThunk('supplier-get-all', async (thunkAPI) => {
  try {
    return await supplierService.getSuppliers();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetSuppliersActive = createAsyncThunk('supplier-get-all-active', async (thunkAPI) => {
  try {
    return await supplierService.getSuppliersActive();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetSupplier = createAsyncThunk('supplier-get-one', async (id, thunkAPI) => {
  try {
    return await supplierService.getSupplier(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})


export const UpdateStatusSupplier = createAsyncThunk('supplier-update-status', async (data, thunkAPI) => {
  try {
    return await supplierService.updateStatusSupplier(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateSupplier = createAsyncThunk('supplier-update', async (data, thunkAPI) => {
  try {
    return await supplierService.updateSupplier(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  suppliers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateSupplier.pending, (state) => {
      state.isLoading = true;
    }).addCase(CreateSupplier.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.supplier = action.payload;
      if (state.isSuccess) {
        toast.success("The creation of the supplier was successful!");
      }
    }).addCase(CreateSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The creation of the supplier was not successful!");
      }
    }).addCase(GetSuppliers.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetSuppliers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.suppliers = action.payload;
    }).addCase(GetSuppliers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateStatusSupplier.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateStatusSupplier.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.suppliers = action.payload;
      if (state.isSuccess) {
          toast.success("Update A supplier is successfully!");
      }
    }).addCase(UpdateStatusSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
          toast.error("Update A supplier is not successfully!");
      }
    }).addCase(GetSupplier.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetSupplier.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.supplier = action.payload;
    }).addCase(GetSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateSupplier.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateSupplier.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.suppliers = action.payload;
      if (state.isSuccess) {
          toast.success("Update A supplier is successfully!");
      }
    }).addCase(UpdateSupplier.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
          toast.error("Update A supplier is not successfully!");
      }
    }).addCase(GetSuppliersActive.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetSuppliersActive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.suppliers = action.payload;
    }).addCase(GetSuppliersActive.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default supplierSlice.reducer;