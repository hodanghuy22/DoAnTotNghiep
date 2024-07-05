import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import brandService from "./brandService";


export const GetBrands = createAsyncThunk("brand/get-brands", async (thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetBrandsShow = createAsyncThunk("brand/get-brands-show", async (thunkAPI) => {
    try {
        return await brandService.getBrandsShow();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetABrand = createAsyncThunk("brand/get-brand", async (id, thunkAPI) => {
    try {
        return await brandService.getABrand(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetBrandByCategory = createAsyncThunk("brand/get-brand-byCategory", async (id, thunkAPI) => {
    try {
        return await brandService.getBrandByCategory(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateBrand = createAsyncThunk("brand/create-brand", async (brandData, thunkAPI) => {
    try {
        return await brandService.createBrand(brandData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateBrand = createAsyncThunk("brand/update-brand", async (brandData, thunkAPI) => {
    try {
        return await brandService.updateBrand(brandData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateStatusBrand = createAsyncThunk("brand/update-status-brand", async (data, thunkAPI) => {
    try {
        return await brandService.updateStatusBrand(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    brands: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const brandSlice = createSlice({
    name: "brand",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetBrands.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(GetBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
            })
            .addCase(GetBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(CreateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.newBrand = action.payload;
                if (state.isSuccess) {
                    toast.success("The creation of the brand was successful!");
                }
            })
            .addCase(CreateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError) {
                    toast.error("The creation of the brand was not successful!");
                }
            }).addCase(UpdateStatusBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateStatusBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                if (state.isSuccess) {
                    toast.success("The update of the brand was successful!");
                }
            })
            .addCase(UpdateStatusBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError) {
                    toast.error("The update of the brand was not successful!");
                }
            }).addCase(GetABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetABrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.ABrand = action.payload;
            })
            .addCase(GetABrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError) {
                    toast.error(action.error.message);
                }
            }).addCase(GetBrandByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetBrandByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.BrandByCategory = action.payload;
            })
            .addCase(GetBrandByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError) {
                    toast.error(action.error.message);
                }
            }).addCase(UpdateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updateBrand = action.payload;
                if (state.isSuccess) {
                    toast.success("The update of the brand was successful!");
                }
            })
            .addCase(UpdateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError) {
                    toast.error("The update of the brand was not successful!");
                }
            }).addCase(GetBrandsShow.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetBrandsShow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
            })
            .addCase(GetBrandsShow.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            }).addCase(resetState, () => initialState);
    }
})

export default brandSlice.reducer;