import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface authState {
  auth: boolean
}

const initialState: authState = {
  auth: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, { payload }: PayloadAction<authState>) => {
      state.auth = payload.auth
    },
  },
})

export const { updateAuthState } = authSlice.actions
export default authSlice.reducer
