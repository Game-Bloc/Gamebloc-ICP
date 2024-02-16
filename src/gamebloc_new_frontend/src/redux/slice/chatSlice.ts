import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface chatState {
  body: string
  f_id: string
  sender: string
  id: bigint
  time: string
  username: string
}

const initialState: chatState[] = []

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    pushToChat: (state, { payload }: PayloadAction<chatState>) => {
      const existingIndex = state.findIndex((item) => item.id === payload.id)
      if (existingIndex === -1) {
        state.push(payload)
      } else {
        state[existingIndex] = payload
      }
    },
    updateChat: (state, { payload }: PayloadAction<chatState>) => {
      const chatindex = state.findIndex((t) => t.id === payload.id)

      if (chatindex !== -1) {
        state[chatindex] = payload
      }
    },
    clearChat: () => {
      return initialState
    },
  },
})

export const { pushToChat, updateChat, clearChat } = chatSlice.actions
export default chatSlice.reducer
