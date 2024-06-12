import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import slideshowService from "./slideshowService";
export const GetSlidehow = createAsyncThunk("slideshow/get", async (thunkAPI) => {
  try {
    return await slideshowService.getSlideshow();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const resetState = createAction('Reset_all')

const initialState = {
  slideshow: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const slideshowSlice = createSlice({
  name: "coupons",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSlidehow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSlidehow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.slideshow = action.payload;
      })
      .addCase(GetSlidehow.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.slideshow = null;
        state.message = action.payload.response.data.error;
      })
      .addCase(resetState, () => initialState);
  }
})

export default slideshowSlice.reducer;