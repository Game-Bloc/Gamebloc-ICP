import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface IcpBalanceState {
  balance: any
}

const initialState: IcpBalanceState = {
  balance: 1,
}

export const icpBalanceSlice = createSlice({
  name: "IcpBalance",
  initialState,
  reducers: {
    updateBalance: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.balance.push(payload)
    },
  },
})

export const { updateBalance } = icpBalanceSlice.actions
export default icpBalanceSlice.reducer
