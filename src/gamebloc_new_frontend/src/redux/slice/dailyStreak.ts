import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserPointState {
  point: number
}
export interface UserStreakState {
  streak: number
}

export interface UserStreakTimeState {
  time: number
}

const initialState = {
  point: 0,
  streak: 0,
  time: 0,
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
    updateTime: (
      state: UserStreakTimeState,
      { payload }: PayloadAction<UserStreakTimeState>,
    ) => {
      state.time = payload.time
    },
  },
})

export const { updatePoint, updateStreak, updateTime } =
  dailyStreakSlice.actions
export default dailyStreakSlice.reducer
