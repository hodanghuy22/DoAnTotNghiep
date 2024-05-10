import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import importInvoiceService from "./importInvoiceService";

export const CreateImportInvoice = createAsyncThunk('importInvoices-create', async (data, thunkAPI) => {
  try {
    return await importInvoiceService.createImportInvoice(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetImportInvoices = createAsyncThunk('importInvoices-get-all', async (thunkAPI) => {
  try {
    return await importInvoiceService.getImportInvoices();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})


export const resetState = createAction('Reset_all')

const initialState = {
  importInvoices: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const importInvoiceSlice = createSlice({
  name: "importInvoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateImportInvoice.pending, (state) => {
      state.isLoading = true;
    }).addCase(CreateImportInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.importInvoice = action.payload;
      if (state.isSuccess) {
        toast.success("The creation of import invoice was successful!");
      }
    }).addCase(CreateImportInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The creation of import invoice was not successful!");
      }
    }).addCase(GetImportInvoices.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetImportInvoices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.importInvoices = action.payload;
    }).addCase(GetImportInvoices.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default importInvoiceSlice.reducer;