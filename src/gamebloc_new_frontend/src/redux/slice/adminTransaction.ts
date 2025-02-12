import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface adminTransactionState {
  id: number
  action: string
  amount: number
  from: string
  to: string
  date: string
}

const initialState: adminTransactionState[] = []

export const adminTransactionSlice = createSlice({
  name: "adminTransaction",
  initialState,
  reducers: {
    addAdminTransactions: (
      state,
      { payload }: PayloadAction<adminTransactionState>,
    ) => {
      const existingIndex = state.findIndex((list) => list.id === payload.id)
      if (existingIndex === -1) {
        state.push(payload)
      } else {
        state[existingIndex] = payload
      }
    },
    clearTransaction: () => {
      return initialState
    },
  },
})

export const { addAdminTransactions, clearTransaction } =
  adminTransactionSlice.actions
export default adminTransactionSlice.reducer
