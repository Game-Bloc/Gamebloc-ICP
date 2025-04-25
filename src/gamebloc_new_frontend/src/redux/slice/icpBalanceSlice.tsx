import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IcpBalanceState {
  balance: any
  kitchenBalance: any
  currentICPrice: number
  ngnRate: number
  id: number
  referralCode: any
  address: any
}

const initialState: IcpBalanceState = {
  balance: 0.0,
  kitchenBalance: 0.0,
  currentICPrice: 0.0,
  ngnRate: 0.0,
  id: 0,
  referralCode: "",
  address: "",
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
    updateKitchenBalance: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.kitchenBalance = payload
    },
    updateICP: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.currentICPrice = payload.currentICPrice
    },
    updateNGN: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.ngnRate = payload.ngnRate
    },
    updateId: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.id = payload.id
    },
    updateReferralCode: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.referralCode = payload
      console.log("payload", payload)
    },
    updateWalletAddress: (
      state: IcpBalanceState,
      { payload }: PayloadAction<IcpBalanceState>,
    ) => {
      state.address = payload[0]
      console.log("payload", payload[0])
    },
  },
})

export const {
  updateBalance,
  updateICP,
  updateId,
  updateKitchenBalance,
  updateNGN,
  updateReferralCode,
  updateWalletAddress,
} = icpBalanceSlice.actions
export default icpBalanceSlice.reducer
