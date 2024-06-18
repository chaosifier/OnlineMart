import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "none"
};

const userSlice = createSlice({

    // An unique name of a slice 
    name: 'user',

    // Initial state value of the reducer 
    initialState,

    // Reducer methods 
    reducers: {
        login: (state, { payload }) => {
            state.name = payload;
        }
    },
});

// Action creators for each reducer method 
export const { login } = userSlice.actions;

export default userSlice.reducer;
