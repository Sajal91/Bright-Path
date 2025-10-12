import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    success: true,
    message: ""
};

const flashMessageSlice = createSlice({
    name: 'flashMessage',
    initialState,
    reducers: {
        setFlashMessage: (state, action) => {
            state.success = action.payload.success;
            state.message = action.payload.message;
        },
    },
});

export const { setFlashMessage } = flashMessageSlice.actions;
export default flashMessageSlice.reducer;