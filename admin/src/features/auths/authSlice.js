import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authService from "./authService";



export const LoginAdmin = createAsyncThunk("auth/login", async(data, thunkAPI) =>{
    try{
        return await authService.login(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
});

export const Logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('token');
});

export const RegisterAdmin = createAsyncThunk("auth/register", async(data, thunkAPI) =>{
    try{
        return await authService.registerAdmin(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
});

export const GetAllUsers = createAsyncThunk("auth/getAllUsers", async(thunkAPI) =>{
    try{
        return await authService.getAllUsers();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
});


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
        builder.addCase(LoginAdmin.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(LoginAdmin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess){
                toast.info("Login is Successfully!!!");
            }
        })
        .addCase(LoginAdmin.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(RegisterAdmin.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(RegisterAdmin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess){
                toast.success("Successful registration!");
            }
        })
        .addCase(RegisterAdmin.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Something went wrong!");
            }
        })
        .addCase(Logout.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(Logout.fulfilled, (state, action)=>{
            state.user = null;
            state.wishlist = []; 
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            toast.success("Logged out successfully");
        })
        .addCase(Logout.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(GetAllUsers.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetAllUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.listUser = action.payload;
        })
        .addCase(GetAllUsers.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default authSlice.reducer;