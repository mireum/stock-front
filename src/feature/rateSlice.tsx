import { createSlice } from "@reduxjs/toolkit";

interface CtrtState {
  ctrt: string[] | null;
};


const rateSlice = createSlice({
  name: 'rate',
  initialState: { ctrt: null } as CtrtState,
  reducers: {
    setCtrt: (state, action) => {
      state.ctrt = action.payload;
    },
  }
});

export const { setCtrt } = rateSlice.actions;

export const selectCtrt = (state:any) => state.ctrt;

export default rateSlice.reducer;

