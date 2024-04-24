import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authService from "./authService";



export const Login = createAsyncThunk("auth/login", async(thunkAPI) =>{
    try{
        return await authService.login();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

const getCustomerfromLocalStorage = localStorage.getItem('customer')? JSON.parse(localStorage.getItem("customer")):null;

const initialState = {
    user: getCustomerfromLocalStorage,
    wishlist: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(Login.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(Login.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess){
                toast.info("Login is Successfully!!!");
            }
        })
        .addCase(Login.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default authSlice.reducer;