import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
};

const isAuthorisedSlice = createSlice({
    name: 'isUserAuthorised',
    initialState,
    reducers: {
        setIsUserAuthorised: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setIsUserAuthorised } = isAuthorisedSlice.actions;
export default isAuthorisedSlice.reducer;