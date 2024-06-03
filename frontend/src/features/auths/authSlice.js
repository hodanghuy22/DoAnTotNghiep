import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authService from "./authService";

export const LoginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const RegisterUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    return await authService.register(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const GetAUser = createAsyncThunk("auth/get-a", async (id, thunkAPI) => {
  try {
    return await authService.getAUser(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const UpdateUser = createAsyncThunk("auth/update", async (data, thunkAPI) => {
  try {
    return await authService.updateUser(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const ChangeUserPassword = createAsyncThunk("auth/change-pass", async (data, thunkAPI) => {
  try {
    return await authService.changePassword(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const ForgotUserPassword = createAsyncThunk("auth/forgot-pass", async (data, thunkAPI) => {
  try {
    return await authService.forgotPassword(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const ResetUserPassword = createAsyncThunk("auth/reset-pass", async (data, thunkAPI) => {
  try {
    return await authService.resetPassword(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const Logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('customer');
  localStorage.removeItem('token');
});

const getCustomerfromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem("customer")) : null;

const initialState = {
  user: getCustomerfromLocalStorage,
  wishlist: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess) {
          toast.success("Login is Successfully!");
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Login is not Successfully!");
        }
      })
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.user = null;
        state.wishlist = [];
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success("You have been successfully logged out!");
      })
      .addCase(Logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(RegisterUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          if(state.isSuccess){
            toast.success("Register is successfully");
          }
      })
      .addCase(RegisterUser.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if(state.isError){
              toast.error("Something went wrong!");
          }
      })
      .addCase(UpdateUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.user = action.payload;
          if(state.isSuccess){
            toast.success("Updated is successfully");
          }
      })
      .addCase(UpdateUser.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if(state.isError){
              toast.error("Something went wrong!");
          }
      })
      .addCase(GetAUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(GetAUser.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.user = action.payload;
      })
      .addCase(GetAUser.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
      })
      .addCase(ChangeUserPassword.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(ChangeUserPassword.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.user = action.payload;
          if(state.isSuccess){
            toast.success("Change Password is successfully");
          }
      })
      .addCase(ChangeUserPassword.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if(state.isError){
              toast.error("Something went wrong!");
          }
      })
      .addCase(ForgotUserPassword.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(ForgotUserPassword.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          if(state.isSuccess){
            toast.success("Email was sent!");
          }
      })
      .addCase(ForgotUserPassword.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if(state.isError){
              toast.error("Something went wrong!");
          }
      })
      .addCase(ResetUserPassword.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(ResetUserPassword.fulfilled, (state, action)=>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          if(state.isSuccess){
            toast.success("Reset password is successfully!");
          }
      })
      .addCase(ResetUserPassword.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if(state.isError){
              toast.error("Something went wrong!");
          }
      })
  }
})

export default authSlice.reducer;