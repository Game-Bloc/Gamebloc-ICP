import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface LeaderboardState {
  losses: number | null
  name: string | null
  point: number | null
  wins: number | null
}

const initialState: LeaderboardState[] = []

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    updateLeaderboard: (state, { payload }) => {
      state.push(payload)
    },
    clearBoard: () => {
      return initialState
    },
  },
})

export const { updateLeaderboard, clearBoard } = leaderboardSlice.actions
export default leaderboardSlice.reducer
