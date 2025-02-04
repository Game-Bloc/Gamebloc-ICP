import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserBetState {
  amount: number
  player_principal_id: string
  staker_account_id: string
  staker_principal_id: string
}

export interface UsersBetState {
  amount: number
  player_principal_id: string
  staker_account_id: string
  staker_principal_id: string
}

const initialState: UserBetState = {
  amount: 0,
  player_principal_id: "",
  staker_account_id: "",
  staker_principal_id: "",
}

export const wagerSlice = createSlice({
  name: "userWager",
  initialState,
  reducers: {
    updateBet: (state, { payload }: PayloadAction<UserBetState>) => {
      // console.log("Reducer received payload:", payload)
      return payload
    },
  },
})

export const { updateBet } = wagerSlice.actions
export default wagerSlice.reducer
