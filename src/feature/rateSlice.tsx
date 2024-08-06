import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CtrtItem {
  stockname: string | null,
  ctrt: number | null,
};

interface CtrtState {
  ctrt: CtrtItem[] | null;
};
// const initialState = {
//   prdy_ctrt: number | null;
// };

const rateSlice = createSlice({
  name: 'rate',
  initialState: { ctrt: null } as CtrtState,
  reducers: {
    setCtrt: (state, action: PayloadAction<CtrtState>) => {
      state.ctrt = action.payload.ctrt;
    },
  }
});

export const { setCtrt } = rateSlice.actions;

export const selectCtrt = (state:any) => state.ctrt;

export default rateSlice.reducer;
// export const store = configureStore({
//   reducer: {
//       ctrt: rateSlice.reducer,
//   }
// })
