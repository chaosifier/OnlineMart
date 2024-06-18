import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const loginUser = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const response = await axios.get(
                "http://localhost:3000/users"
                , data);
            return response.data[0];
        } catch (err) {
            console.error(err);
            thunkAPI.rejectWithValue(err.response.data);
        }
    });

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetail: {},
        isLoading: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userDetail = action.payload;
                state.isLoading = false;
                state.hasError = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

// Selectors
export const selectUserFullName = state => state.user.userDetail.fullName;
export const selectUserDetail = state => state.user.userDetail;
export default userSlice.reducer;