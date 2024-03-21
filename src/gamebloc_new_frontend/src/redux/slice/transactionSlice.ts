import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface transactionState {
  id: number
  action: string
  amount: number
  from: string
  to: string
  date: string
}

const initialState: transactionState[] = []

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransactions: (state, { payload }: PayloadAction<transactionState>) => {
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

export const { addTransactions, clearTransaction } = transactionSlice.actions
export default transactionSlice.reducer
