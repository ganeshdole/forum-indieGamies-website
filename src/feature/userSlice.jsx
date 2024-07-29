import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
};

export const categoriesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userId = action.payload;
        },
        removeUser: (state) => {
            state.userId = null;
        }
    }
});

export const { addUser, removeUser } = categoriesSlice.actions;

export default categoriesSlice.reducer;