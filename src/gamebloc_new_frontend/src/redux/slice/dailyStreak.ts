import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserPointState {
  point: number
}
export interface UserStreakState {
  streak: number
}

const initialState = {
  point: 0,
  streak: 0,
}

export const dailyStreakSlice = createSlice({
  name: "dailyStreak",
  initialState,
  reducers: {
    updatePoint: (
      state: UserPointState,
      { payload }: PayloadAction<UserPointState>,
    ) => {
      state.point = payload.point
    },
    updateStreak: (
      state: UserStreakState,
      { payload }: PayloadAction<UserStreakState>,
    ) => {
      state.streak = payload.streak
    },
  },
})

export const { updatePoint, updateStreak } = dailyStreakSlice.actions
export default dailyStreakSlice.reducer
