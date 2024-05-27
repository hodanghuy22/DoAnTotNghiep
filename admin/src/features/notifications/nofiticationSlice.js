import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import notificationService from "./notificationService";

export const GetNotifications = createAsyncThunk('notifications-getAll', async (id, thunkAPI) => {
  try {
    return await notificationService.getNotifications(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const GetNotification = createAsyncThunk('notifications-get', async (id, thunkAPI) => {
  try {
    return await notificationService.getNotification(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const CreateNotification = createAsyncThunk('notifications-create', async (data, thunkAPI) => {
  try {
    return await notificationService.createNotification(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const UpdateNotification = createAsyncThunk('notifications-create', async (data, thunkAPI) => {
  try {
    return await notificationService.updateNotification(data);
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

export const nofiticationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetNotifications.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(GetNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.notifications = action.payload;
    })
    .addCase(GetNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(GetNotification.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(GetNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.notification = action.payload;
    })
    .addCase(GetNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(CreateNotification.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(CreateNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.notification = action.payload;
      if(state.isSuccess){
        toast.success("Create is successfully!")
      }
    })
    .addCase(CreateNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError){
        toast.error("Create is not successfully!")
      }
    })
    .addCase(UpdateNotification.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(UpdateNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.notification = action.payload;
      if(state.isSuccess){
        toast.success("Update is successfully!")
      }
    })
    .addCase(UpdateNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isError){
        toast.error("Update is not successfully!")
      }
    })
    .addCase(resetState, () => initialState);
  }
})

export default nofiticationSlice.reducer;