import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CountState {
  count: number;
}

const initialState: CountState = {
  count: 0,
};

export const countSlice = createSlice({
  name: "tournamentCount",
  initialState,
  reducers: {
    updateCount: (state, { payload }: PayloadAction<CountState>) => {
      state.count = payload.count;
    },
  },
});

export const { updateCount } = countSlice.actions;
export default countSlice.reducer;
