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

export const GetAInvoice = createAsyncThunk('invoices-get-a', async (id, thunkAPI) => {
  try {
    return await invoiceService.getInvoice(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetInvoices = createAsyncThunk('invoices-get', async (id, thunkAPI) => {
  try {
    return await invoiceService.getInvoices(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetInvoicesByOrderType = createAsyncThunk('invoices-get-type', async (data, thunkAPI) => {
  try {
    return await invoiceService.getInvoicesByOrderType(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const CancelInvoice = createAsyncThunk('invoices-cancel', async (id, thunkAPI) => {
  try {
    return await invoiceService.cancelInvoice(id);
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
      state.invoice = action.payload;
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
    }).addCase(GetInvoices.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetInvoices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.invoices = action.payload;
    }).addCase(GetInvoices.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
      .addCase(GetInvoicesByOrderType.pending, (state) => {
        state.isLoading = true;
      }).addCase(GetInvoicesByOrderType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.invoices = action.payload;
      }).addCase(GetInvoicesByOrderType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(GetAInvoice.pending, (state) => {
        state.isLoading = true;
      }).addCase(GetAInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.invoice = action.payload;
      }).addCase(GetAInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(CancelInvoice.pending, (state) => {
        state.isLoading = true;
      }).addCase(CancelInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (action.payload.message) {
          toast.error(action.payload.message);
        } else {
          state.invoice = action.payload.data
        }
      }).addCase(CancelInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
})

export default invoiceSlice.reducer;