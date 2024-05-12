import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderStatusService from "./orderStatusService";

export const CreateOrderStatus = createAsyncThunk('orderStatuses-create', async (data, thunkAPI) => {
  try {
    return await orderStatusService.createOrderStatus(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetOrderStatuses = createAsyncThunk('orderStatuses-getAll', async (thunkAPI) => {
  try {
    return await orderStatusService.getOrderStatuses();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetOrderStatusesActive = createAsyncThunk('orderStatuses-getAll-active', async (thunkAPI) => {
  try {
    return await orderStatusService.getOrderStatusesActive();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})


export const GetOrderStatus = createAsyncThunk('orderStatuses-get', async (id, thunkAPI) => {
  try {
    return await orderStatusService.getOrderStatus(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateStatusOrderStatus = createAsyncThunk('orderStatuses-update-status', async (data, thunkAPI) => {
  try {
    return await orderStatusService.updateStatusOrderStatus(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateOrderStatus = createAsyncThunk('orderStatuses-update', async (data, thunkAPI) => {
  try {
    return await orderStatusService.updateOrderStatus(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})


export const resetState = createAction('Reset_all')

const initialState = {
  orderStatuses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const orderStatusSlice = createSlice({
  name: "orderStatuses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateOrderStatus.pending, (state) => {
      state.isLoading = true;
    }).addCase(CreateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.orderStatus = action.payload;
      if (state.isSuccess) {
        toast.success("The creation of the order status was successful!");
      }
    }).addCase(CreateOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The creation of the order status was not successful!");
      }
    }).addCase(GetOrderStatuses.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetOrderStatuses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.orderStatuses = action.payload;
    }).addCase(GetOrderStatuses.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateStatusOrderStatus.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateStatusOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updated = action.payload;
      if (state.isSuccess) {
        toast.success("The update of the order status was successful!");
      }
    }).addCase(UpdateStatusOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The update of the order status was not successful!");
      }
    }).addCase(GetOrderStatus.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.orderStatus = action.payload;
    }).addCase(GetOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(UpdateOrderStatus.pending, (state) => {
      state.isLoading = true;
    }).addCase(UpdateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updated = action.payload;
      if (state.isSuccess) {
        toast.success("The update of the order status was successful!");
      }
    }).addCase(UpdateOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError) {
        toast.error("The update of the order status was not successful!");
      }
    }).addCase(GetOrderStatusesActive.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetOrderStatusesActive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.orderStatuses = action.payload;
    }).addCase(GetOrderStatusesActive.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default orderStatusSlice.reducer;