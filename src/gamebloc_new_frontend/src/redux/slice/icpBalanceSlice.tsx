import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IcpBalanceState {
  balance: any
  currentICPrice: number
}

const initialState: IcpBalanceState = {
  balance: 0.0,
  currentICPrice: 0.0,
}

export const icpBalanceSlice = createSlice({
  name: "IcpBalance",
  initialState,
  reducers: {
    updateBalance: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.balance = payload.balance
    },
    updateICP: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.currentICPrice = payload.currentICPrice
    },
  },
})

export const { updateBalance, updateICP } = icpBalanceSlice.actions
export default icpBalanceSlice.reducer
