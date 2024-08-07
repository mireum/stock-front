import { createSlice } from "@reduxjs/toolkit";

interface CtrtState {
  price: string[] | null;
};


const rateSlice = createSlice({
  name: 'rate',
  initialState: { price: null } as CtrtState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  }
});

export const { setPrice } = rateSlice.actions;

export const selectPrice = (state:any) => state.price;

export default rateSlice.reducer;

