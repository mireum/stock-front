import { configureStore } from '@reduxjs/toolkit';
import rateSlice from '../feature/rateSlice';

export const store = configureStore({
    reducer: {
        price: rateSlice,
    }
})