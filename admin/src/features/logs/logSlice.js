import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import logService from "./logService";

export const GetLogs = createAsyncThunk('logs-getAll', async (thunkAPI) => {
  try {
    return await logService.getLogs();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  logs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetLogs.pending, (state) => {
      state.isLoading = true;
    }).addCase(GetLogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.logs = action.payload;
    }).addCase(GetLogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(resetState, () => initialState);
  }
})

export default logSlice.reducer;