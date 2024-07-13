import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";
import { toast } from "react-toastify";

export const GetWishList = createAsyncThunk("Wishlist/get", async (userId, thunkAPI) => {
  try {
    return await wishlistService.getWishlist(userId);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})
export const CreateWishList = createAsyncThunk("wishlist/post-wishlist", async (data, thunkAPI) => {
  try {
    console.log(data);
    return await wishlistService.createWishlist(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})
export const resetState = createAction('Reset_all')

const initialState = {
  wishlist: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const wishlistSlice = createSlice({
  name: "wistlist",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(GetWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.slideshow = null;
        state.message = action.payload.response.data.error;
      })
      .addCase(CreateWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        if (state.isSuccess) {
          toast.success("Thêm vào danh sách yêu thích thành công")
        }
      })
      .addCase(CreateWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.slideshow = null;
        state.message = action.payload.response.data.error;
      })
      .addCase(resetState, () => initialState);
  }
})

export default wishlistSlice.reducer;