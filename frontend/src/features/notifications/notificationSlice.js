import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

export const GetAllNoti = createAsyncThunk('notifications-get-all', async (userId, thunkAPI) => {
  try {
    return await notificationService.getAllNoti(userId);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetTop5Noti = createAsyncThunk('notifications-get-top-5', async (userId, thunkAPI) => {
  try {
    return await notificationService.getTop5Noti(userId);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})


export const resetState = createAction('Reset_all')

const initialState = {
  notifications: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllNoti.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllNoti.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(GetAllNoti.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(GetTop5Noti.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTop5Noti.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(GetTop5Noti.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
})

export default notificationSlice.reducer;