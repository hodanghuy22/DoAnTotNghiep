import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import capacityService from "./capacityService";


export const GetCapacities = createAsyncThunk("capacity/get-capacities", async(thunkAPI) =>{
    try{
        return await capacityService.getCapacities();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetCapacity = createAsyncThunk("capacity/get-capacity", async(id, thunkAPI) =>{
    try{
        return await capacityService.getCapacity(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateStatusCapacity = createAsyncThunk("capacity/delete-capacity", async(id,thunkAPI) =>{
    try{
        return await capacityService.updateStatusCapacity(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateCapacity = createAsyncThunk("capacity/create-capacity", async(data,thunkAPI) =>{
    try{
        return await capacityService.createCapacity(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateCapacity = createAsyncThunk("capacity/update-capacity", async(data,thunkAPI) =>{
    try{
        return await capacityService.updateCapacity(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})


export const resetState = createAction('Reset_all')

const initialState = {
    capacities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const capacitySlice = createSlice({
    name: "capacity",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetCapacities.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetCapacities.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.capacities = action.payload;
        })
        .addCase(GetCapacities.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(UpdateStatusCapacity.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateStatusCapacity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(state.isSuccess){
                toast.success("Delete Capacity is Successfully!!!");
            }
        })
        .addCase(UpdateStatusCapacity.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(CreateCapacity.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(CreateCapacity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCapacity = action.payload;
            if(state.isSuccess){
                toast.success("Add Capacity is Successfully!!!");
            }
        })
        .addCase(CreateCapacity.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(GetCapacity.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetCapacity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.ACapacity = action.payload;
        })
        .addCase(GetCapacity.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(UpdateCapacity.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateCapacity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCapacity = action.payload;
            if(state.isSuccess){
                toast.success("Update Capacity is Successfully!!!");
            }
        })
        .addCase(UpdateCapacity.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(resetState, () => initialState);
    }
})

export default capacitySlice.reducer;