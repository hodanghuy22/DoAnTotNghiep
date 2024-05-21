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

export const GetInvoices = createAsyncThunk('invoices-get-all', async (thunkAPI) => {
  try {
    return await invoiceService.getInvoices();
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

export const CountInvoicesByMonth = createAsyncThunk('invoices-count', async (data, thunkAPI) => {
  try {
    return await invoiceService.countInvoicesByMonth(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const CountCancelInvoicesByMonth = createAsyncThunk('invoices-count-cancle', async (data, thunkAPI) => {
  try {
    return await invoiceService.countCancelInvoicesByMonth(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetRevenueByMonth = createAsyncThunk('invoices-revenue', async (data, thunkAPI) => {
  try {
    return await invoiceService.getRevenueByMonth(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetRevenueAfterDiscountByMonth = createAsyncThunk('invoices-revenue-afterDiscount', async (data, thunkAPI) => {
  try {
    return await invoiceService.getRevenueAfterDiscountByMonth(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetRevenueOfYear = createAsyncThunk('invoices-revenue-year', async (data, thunkAPI) => {
  try {
    return await invoiceService.getRevenueOfYear(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateStatusInvoice = createAsyncThunk('invoices-update-status', async (data, thunkAPI) => {
  try {
    return await invoiceService.updateStatusInvoice(data);
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
        toast.success("The creation of invoice was successful!");
      }
    }).addCase(CreateInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The creation of invoice was not successful!");
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
    }).addCase(CountInvoicesByMonth.pending, (state) => {
      state.isLoading = true;
    }).addCase(CountInvoicesByMonth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.countInvoicesByMonth = action.payload;
    }).addCase(CountInvoicesByMonth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(CountCancelInvoicesByMonth.pending, (state) => {
      state.isLoading = true;
    }).addCase(CountCancelInvoicesByMonth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.countCancelInvoicesByMonth = action.payload;
    }).addCase(CountCancelInvoicesByMonth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateStatusInvoice.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateStatusInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updateInvoice = action.payload;
      if(state.isSuccess) {
        toast.success("The invoice update was successful!");
      } 
    }).addCase(UpdateStatusInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError) {
        toast.error("The invoice update was not successful!");
      } 
    }).addCase(GetRevenueByMonth.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetRevenueByMonth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.revenueByMonth = action.payload;
    }).addCase(GetRevenueByMonth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(GetRevenueAfterDiscountByMonth.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetRevenueAfterDiscountByMonth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.revenueAfterDiscountByMonth = action.payload;
    }).addCase(GetRevenueAfterDiscountByMonth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(GetRevenueOfYear.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetRevenueOfYear.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.revenueOfYear = action.payload;
    }).addCase(GetRevenueOfYear.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default invoiceSlice.reducer;