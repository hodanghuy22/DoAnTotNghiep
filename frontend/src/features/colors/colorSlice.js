import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import colorService from "./colorService";


export const GetColors = createAsyncThunk("color/get-colors", async(thunkAPI) =>{
    try{
        return await colorService.getColors();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetColorByProductId = createAsyncThunk("color/get-colorByProductId", async(id, thunkAPI) =>{
    try{
        return await colorService.getColorByProductId(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})
export const GetColorsShow = createAsyncThunk("color/get-colors-show", async(thunkAPI) =>{
    try{
        return await colorService.getColorsShow();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})


export const GetAColor = createAsyncThunk("color/get-color", async(id,thunkAPI) =>{
    try{
        return await colorService.getAColor(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateColor = createAsyncThunk("color/create-color", async(colorData,thunkAPI) =>{
    try{
        return await colorService.createColor(colorData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateColor = createAsyncThunk("color/update-color", async(colorData,thunkAPI) =>{
    try{
        return await colorService.updateColor(colorData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateStatusColor = createAsyncThunk("color/update-status-color", async(data,thunkAPI) =>{
    try{
        return await colorService.updateStatusColor(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    colors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const colorSlice = createSlice({
    name: "color",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetColors.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetColors.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
        })
        .addCase(GetColors.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
        }).addCase(GetColorByProductId.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetColorByProductId.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
        })
        .addCase(GetColorByProductId.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
        }).addCase(CreateColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(CreateColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.newColor = action.payload;
            if(state.isSuccess) {
                toast.success("The creation of color was successful!");
            }
        })
        .addCase(CreateColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError) {
                toast.error("The creation of the color was not successful!");
            }
        }).addCase(UpdateStatusColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateStatusColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(state.isSuccess) {
                toast.success("The color update was successful!");
            }
        })
        .addCase(UpdateStatusColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
            if(state.isError){
                toast.error("The color update was not successful!");
            }
        }).addCase(GetAColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetAColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.Acolor = action.payload;
        })
        .addCase(GetAColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
            if(state.isError){
                toast.error("Something went wrong!");
            }
        }).addCase(UpdateColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedColor = action.payload;
            if(state.isSuccess){
                toast.success("The color update was successful!");
            }
        })
        .addCase(UpdateColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
            if(state.isError){
                toast.error("The color update was not successful!");
            }
        }).addCase(GetColorsShow.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetColorsShow.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
        })
        .addCase(GetColorsShow.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
        }).addCase(resetState, () => initialState);
    }
})

export default colorSlice.reducer;