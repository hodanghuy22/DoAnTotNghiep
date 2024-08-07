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
    localStorage.removeItem('admin');
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

export const CountUser = createAsyncThunk("auth/countUser", async(data, thunkAPI) =>{
    try{
        return await authService.countUser(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
});

export const StatisticUserOfYear = createAsyncThunk("auth/statistic", async(data, thunkAPI) =>{
    try{
        return await authService.statisticUserOfYear(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
});

export const GetTopUser = createAsyncThunk("auth/get-top-user", async(data, thunkAPI) =>{
    try{
        return await authService.getTopUser(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
});

const getCustomerfromLocalStorage = localStorage.getItem('admin')? JSON.parse(localStorage.getItem("admin")):null;

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
                toast.info("Login is Successfully!");
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
            toast.success("You have been successfully logged out!");
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
        .addCase(CountUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(CountUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.countUser = action.payload;
        })
        .addCase(CountUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(StatisticUserOfYear.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(StatisticUserOfYear.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.statisticUserOfYear = action.payload;
        })
        .addCase(StatisticUserOfYear.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(GetTopUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetTopUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.topUser = action.payload;
        })
        .addCase(GetTopUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default authSlice.reducer;