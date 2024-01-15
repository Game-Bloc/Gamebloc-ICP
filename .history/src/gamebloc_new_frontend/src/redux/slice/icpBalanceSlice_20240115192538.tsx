import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface IcpBalanceState {
  balance: any
}

const initialState: IcpBalanceState = {
  balance: 0,
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
  },
})

export const { updateBalance } = icpBalanceSlice.actions
export default icpBalanceSlice.reducer
