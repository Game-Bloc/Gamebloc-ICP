import { Principal } from "@dfinity/principal"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface notificationState {
  body: string
  date: string
  id: number
  read: boolean
  //   user: Principal
  username: string
}

const initialState: notificationState[] = []

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    allNotification: (state, { payload }: PayloadAction<notificationState>) => {
      const existingIndex = state.findIndex((list) => list.id === payload.id)
      if (existingIndex === -1) {
        state.push(payload)
      } else {
        state[existingIndex] = payload
      }
    },
  },
})

export const { allNotification } = notificationSlice.actions
export default notificationSlice.reducer
