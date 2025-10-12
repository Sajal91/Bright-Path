import { configureStore } from '@reduxjs/toolkit';
import flashMessageSlice from './slices/flashMessageSlice';
import isAuthorisedSlice from './slices/isAuthorisedSlice';

export const store = configureStore({
    reducer: {
        flashMessage: flashMessageSlice,
        isUserAuthorised: isAuthorisedSlice
    },
});