import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface LeaderboardState {
  principal: string | null
  points: number | null
  name: string | null
}

const initialState: LeaderboardState[] = []

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    updateLeaderboard: (
      state,
      { payload }: PayloadAction<LeaderboardState>,
    ) => {
      // Find the index of the player with the same 'principal'
      const existingPlayerIndex = state.findIndex(
        (player) => player.principal === payload.principal,
      )

      if (existingPlayerIndex !== -1) {
        state[existingPlayerIndex] = payload
      } else {
        state.push(payload)
      }
    },
    clearBoard: () => {
      return initialState
    },
  },
})

export const { updateLeaderboard, clearBoard } = leaderboardSlice.actions
export default leaderboardSlice.reducer
