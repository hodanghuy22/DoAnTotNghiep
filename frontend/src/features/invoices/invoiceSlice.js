import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import invoiceService from "./invoiceService";

export const CreateInvoice = createAsyncThunk('invoices-create', async (data, thunkAPI) => {
  try {
    return await invoiceService.createInvoice(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetInvoice = createAsyncThunk('invoices-get', async (id,thunkAPI) => {
  try {
    return await invoiceService.getInvoice(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  invoices: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateInvoice.pending, (state) => {
      state.isLoading = true;
    }).addCase(CreateInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.importInvoice = action.payload;
      if (state.isSuccess) {
        toast.success("Hóa đơn đã được tạo thành công!");
      }
    }).addCase(CreateInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("Đã xảy ra lỗi!");
      }
    }).addCase(GetInvoice.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.invoice = action.payload;
    }).addCase(GetInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default invoiceSlice.reducer;